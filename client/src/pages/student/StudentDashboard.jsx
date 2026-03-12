import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Download,
  ExternalLink,
  Calendar,
  User,
  LogOut,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '../../components/UI';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { certificateAPI } from '../../services/api';

const StudentDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rank, setRank] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [certData, rankData] = await Promise.all([
        certificateAPI.getStudentCertificates(),
        certificateAPI.getRanking(),
      ]);
      setCertificates(certData);
      // Find current student's rank from the ranking list
      if (user && rankData) {
        const myRank = rankData.find(r => r.studentId?.toString() === user._id?.toString());
        setRank(myRank?.rank ?? null);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (cert) => {
    try {
      await certificateAPI.download(cert._id, cert.certificateId);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen pb-24 px-6 overflow-hidden">

      {/* ─── Custom Top Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        {/* Profile Icon – left */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          onClick={() => navigate('/profile')}
          className="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
          title="Profile"
        >
          <User className="w-5 h-5" />
        </motion.button>

        {/* DigitalCert – center */}
        <Link to="/student/dashboard">
          <motion.span
            className="text-[15px] font-black uppercase tracking-[0.2em] text-slate-900 cursor-pointer select-none"
            whileHover={{ scale: 1.06, color: '#6366f1' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            DigitalCert
          </motion.span>
        </Link>

        {/* Logout – right */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors duration-300 text-[12px] font-bold uppercase tracking-widest"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </header>

      {/* ─── Page Body ─── */}
      <div className="max-w-5xl mx-auto relative z-10 pt-28">

        {/* ─── Greeting Section ─── */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-black tracking-[-0.05em] text-slate-900 mb-4 leading-tight"
          >
            Hello,{' '}
            <span className="text-indigo-500">{user?.name?.split(' ')[0]}</span>
            <br />
            <span className="text-slate-400 text-5xl md:text-6xl">Your Registry is Secure.</span>
          </motion.h1>
        </div>

        {/* ─── Stats Row: Certificates + Rank ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="grid grid-cols-2 gap-6 mb-14 max-w-lg"
        >
          {/* Total Certificates */}
          <div className="surface-card p-7 bg-white border-slate-100 flex flex-col gap-2">
            <div className="flex items-center space-x-2 mb-1">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Certificates</span>
            </div>
            <span className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
              {loading ? '–' : certificates.length}
            </span>
            <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest">Earned</span>
          </div>

          {/* Rank */}
          <div className="surface-card p-7 bg-white border-slate-100 flex flex-col gap-2">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Overall Rank</span>
            </div>
            <span className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
              {loading ? '–' : rank ? `#${rank}` : '—'}
            </span>
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
              {rank ? 'Global Standing' : 'No Rank Yet'}
            </span>
          </div>
        </motion.div>

        {/* ─── Main Area ─── */}
        <div className="space-y-12">

          {/* Certificate Cards */}
          <div className="space-y-8">
            <div className="flex items-center px-2 space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">Recent Issuances</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {loading ? (
                  [1, 2].map(i => (
                    <div key={i} className="surface-card h-64 animate-pulse bg-slate-50 border-slate-100" />
                  ))
                ) : certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <motion.div
                      key={cert._id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="surface-card p-1 group hover-lift border-transparent hover:border-slate-100"
                    >
                      <div className="bg-white p-10 rounded-[1.8rem] flex flex-col h-full">
                        <div className="flex justify-between items-start mb-12">
                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:rotate-6">
                            <Award className="w-6 h-6" />
                          </div>
                          <Badge variant="success">Validated</Badge>
                        </div>

                        <div className="mb-12">
                          <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2 truncate group-hover:text-indigo-600 transition-colors uppercase italic">
                            {cert.courseName || cert.event}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                            <span className="text-[14px] font-black uppercase tracking-widest text-slate-800">
                              Deployed {new Date(cert.issuedDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 mt-auto">
                          <Link
                            to={`/certificates/${cert._id}`}
                            className="flex-1 py-4 bg-slate-50 hover:bg-slate-900 text-slate-500 hover:text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Auditor</span>
                          </Link>
                          <button
                            onClick={() => handleDownload(cert)}
                            className="p-4 bg-slate-50 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-2xl transition-all"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-24 surface-card flex flex-col items-center justify-center text-center bg-slate-50/50 border-dashed border-slate-200">
                    <div className="p-8 bg-white shadow-sm border border-slate-100 rounded-full text-slate-200 mb-8">
                      <Award className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">Vault Empty</h3>
                    <p className="text-slate-400 font-medium max-w-xs">No credentials have been deployed to your identity yet.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
