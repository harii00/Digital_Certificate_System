import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { certificateAPI } from '../services/api';

const CertificateDetail = () => {
    const { id, certId } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertificate();
    }, [id, certId]);

    const fetchCertificate = async () => {
        try {
            const data = await (certId
                ? certificateAPI.verify(certId)
                : certificateAPI.getById(id));
            setCertificate(data);
        } catch (error) {
            toast.error('Certificate not found');
            navigate('/certificates');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            await certificateAPI.download(certificate._id, certificate.certificateId);
        } catch (error) {
            toast.error('Download failed. Session may have expired.');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="noise-overlay"></div>
            <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!certificate) return null;

    return (
        <div className="min-h-screen relative pt-10 pb-24 px-6">
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Back Navigation */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="group mb-12 flex items-center space-x-2 px-5 py-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-sm font-bold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                </motion.button>

                {/* Landscape Certificate Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="surface-glass p-1 md:p-2 border-white/60 shadow-[0_48px_96px_-16px_rgba(0,0,0,0.12)]">
                        {/* Landscape certificate — wider than tall */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 relative overflow-hidden"
                            style={{ minHeight: '480px' }}>

                            {/* Left accent bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-indigo-500 to-violet-500"></div>

                            <div className="flex h-full px-16 py-14 gap-16 items-center">

                                {/* Left: Issuer + Badge */}
                                <div className="flex flex-col items-center justify-center min-w-[200px] space-y-6 border-r border-slate-100 pr-16">
                                    <div className="p-5 bg-slate-900 text-white rounded-[1.5rem] shadow-xl">
                                        <ShieldCheck className="w-10 h-10" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Issued By</p>
                                        <p className="text-sm font-extrabold text-slate-900 leading-tight text-center">
                                            {certificate.issuer || 'DigiCert Authority'}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                                    </div>
                                </div>

                                {/* Center: Main content */}
                                <div className="flex-1 text-center space-y-6">
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-2">
                                            Certificate of Achievement
                                        </p>
                                        <p className="text-slate-500 font-semibold italic text-base mb-6">
                                            This is to certify that
                                        </p>
                                        <h1 className="text-5xl md:text-6xl font-black tracking-[-0.04em] text-slate-900 leading-tight">
                                            {certificate.studentName}
                                        </h1>
                                    </div>

                                    <div className="border-y border-slate-100 py-6 mx-auto max-w-xl">
                                        <p className="text-slate-500 italic text-sm mb-2">
                                            has successfully completed
                                        </p>
                                        <p className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                            {certificate.courseName || certificate.event}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center gap-12 text-sm">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Date Issued</p>
                                            <p className="font-extrabold text-slate-800">
                                                {new Date(certificate.issuedDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Certificate ID</p>
                                            <p className="font-mono font-bold text-slate-700 text-sm uppercase">
                                                {certificate.certificateId || certificate._id}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: QR Code */}
                                {certificate.qrCode && (
                                    <div className="flex flex-col items-center justify-center min-w-[120px] border-l border-slate-100 pl-12 space-y-3">
                                        <img
                                            src={certificate.qrCode}
                                            alt="Scan to verify"
                                            className="w-24 h-24 opacity-80"
                                        />
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">
                                            Scan to verify
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Download Button */}
                <div className="flex justify-center mt-10">
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleDownload}
                        className="flex items-center space-x-3 px-10 py-5 bg-slate-900 hover:bg-indigo-600 text-white font-black uppercase tracking-widest text-sm rounded-[1.5rem] shadow-xl transition-all duration-300 active:scale-95"
                    >
                        <Download className="w-5 h-5" />
                        <span>Download Certificate</span>
                    </motion.button>
                </div>

            </div>
        </div>
    );
};

export default CertificateDetail;
