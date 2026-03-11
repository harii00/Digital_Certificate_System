import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

const generateCertificateId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'DCS-';
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// @desc    Issue a new certificate
// @route   POST /api/certificates
// @access  Private/Admin
export const issueCertificate = async (req, res) => {
  try {
    const { studentEmail, studentName, event, issuedDate, status } = req.body;

    if (!studentEmail || !studentName || !event) {
      return res.status(400).json({ message: 'Email, Name, and Event are required' });
    }

    const student = await User.findOne({ email: studentEmail, role: 'student' });

    if (!student) {
      return res.status(404).json({ message: 'Student not found with this email' });
    }

    let certificateId;
    let exists = true;
    while (exists) {
      certificateId = generateCertificateId();
      const found = await Certificate.findOne({ certificateId });
      if (!found) exists = false;
    }

    // Generate Verification URL
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify/${certificateId}`;

    // Generate QR Code Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);

    const certificate = await Certificate.create({
      certificateId,
      studentId: student._id,
      studentName,
      studentEmail,
      event,
      issuedDate: issuedDate || Date.now(),
      status: status || 'Valid',
      qrCode: qrCodeDataUrl,
      verificationUrl,
      issuedBy: req.user._id,
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all certificates (with advanced filtering)
// @route   GET /api/certificates
// @access  Public (or Private/Admin depending on config, but search is public)
export const getAllCertificates = async (req, res) => {
  try {
    const { search, status, event, startDate, endDate } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { certificateId: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
        { event: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (event) {
      query.event = { $regex: event, $options: 'i' };
    }

    if (startDate || endDate) {
      query.issuedDate = {};
      if (startDate) query.issuedDate.$gte = new Date(startDate);
      if (endDate) query.issuedDate.$lte = new Date(endDate);
    }

    const certificates = await Certificate.find(query)
      .populate('studentId', 'name email')
      .populate('issuedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single certificate by ID
// @route   GET /api/certificates/:id
// @access  Private
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('studentId', 'name email')
      .populate('issuedBy', 'name email');

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Role-based filtering: Students can only see their own
    if (req.user.role === 'student' && certificate.studentId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this certificate' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get certificate by Certificate ID (for verification)
// @route   GET /api/certificates/verify/:certId
// @access  Public
export const getCertificateByCertId = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.certId })
      .populate('studentId', 'name email')
      .populate('issuedBy', 'name email');

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current student's certificates
// @route   GET /api/certificates/my-certificates
// @access  Private/Student
export const getStudentCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ studentId: req.user._id })
      .populate('issuedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update certificate status (Revoke/Validate)
// @route   PATCH /api/certificates/:id/status
// @access  Private/Admin
export const updateCertificateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Valid', 'Revoked', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    certificate.status = status;
    await certificate.save();

    res.json({ message: `Certificate status updated to ${status}`, certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    await certificate.deleteOne();
    res.json({ message: 'Certificate removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download Certificate PDF
// @route   GET /api/certificates/:id/download
// @access  Private
export const downloadPDF = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Role-based filtering: Students can only download their own
    if (req.user.role === 'student' && certificate.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to download this certificate' });
    }

    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${certificate.certificateId}.pdf`
    );
    doc.pipe(res);

    // Background Color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');

    // Border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .lineWidth(2)
      .stroke('#4f46e5'); // Indigo color

    doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
      .lineWidth(1)
      .stroke('#8b5cf6'); // Violet color

    // Content
    doc.fillColor('#1f2937'); // Gray-900

    doc.fontSize(40)
      .font('Helvetica-Bold')
      .text('CERTIFICATE', 0, 80, { align: 'center' });

    doc.fontSize(20)
      .font('Helvetica')
      .text('OF COMPLETION', 0, 130, { align: 'center' });

    doc.moveDown(2);

    doc.fontSize(16)
      .text('This is to certify that', { align: 'center' });

    doc.moveDown(1);

    doc.fontSize(32)
      .font('Helvetica-Bold')
      .fillColor('#4f46e5')
      .text(certificate.studentName, { align: 'center' });

    doc.moveDown(1);

    doc.fillColor('#1f2937')
      .fontSize(16)
      .font('Helvetica')
      .text('has successfully participated in', { align: 'center' });

    doc.moveDown(0.5);

    doc.fontSize(24)
      .font('Helvetica-Bold')
      .text(certificate.event, { align: 'center' });

    doc.moveDown(1.5);

    doc.moveDown(1);
    doc.fontSize(16)
      .font('Helvetica-Bold')
      .fillColor('#4f46e5')
      .text(`CERTIFICATE ID: ${certificate.certificateId}`, 100, 440);

    // Add QR Code
    if (certificate.qrCode) {
      const qrImage = certificate.qrCode.split(',')[1];
      const qrBuffer = Buffer.from(qrImage, 'base64');
      doc.image(qrBuffer, doc.page.width - 180, 380, { width: 100 });
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get top 100 students by certificate count
// @route   GET /api/certificates/ranking
// @access  Public
export const getRanking = async (req, res) => {
  try {
    const ranking = await Certificate.aggregate([
      {
        $group: {
          _id: '$studentId',
          studentName: { $first: '$studentName' },
          totalCertificates: { $sum: 1 },
        },
      },
      { $sort: { totalCertificates: -1 } },
      { $limit: 100 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'studentInfo',
        },
      },
      {
        $project: {
          studentId: '$_id',
          studentName: 1,
          totalCertificates: 1,
          department: { $arrayElemAt: ['$studentInfo.department', 0] },
        },
      },
    ]);

    const rankedStudents = ranking.map((student, index) => ({
      rank: index + 1,
      studentName: student.studentName,
      studentId: student.studentId,
      totalCertificates: student.totalCertificates,
      department: student.department || '',
    }));

    res.json(rankedStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
