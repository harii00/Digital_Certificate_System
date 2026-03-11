import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Award,
  Download,
  ExternalLink,
  Calendar,
  Zap,
  Shield,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../../components/UI';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { certificateAPI } from '../../services/api';

const StudentDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCertificates();
  }, []);

  const fetchMyCertificates = async () => {
    try {
      const data = await certificateAPI.getStudentCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
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

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Upper Context */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full mb-6"
            >
              <Sparkles className="w-3 h-3 text-primary-500" />
              <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800">Personal Vault</span>
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-black tracking-[-0.05em] text-slate-900 mb-6 leading-tight">
              Hello, {user?.name.split(' ')[0]} <br />
              <span className="text-slate-500">Your Registry is Secure.</span>
            </h1>
          </div>


        </div>

        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
          {/* Main Action Area */}
          <div className="space-y-12">
            {/* Portfolio Insight */}
            <div className="surface-glass p-1 shadow-2xl overflow-hidden relative group">
              <div className="bg-slate-900 rounded-[2.2rem] p-12 text-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500 blur-[150px] opacity-10 -mr-20 -mt-20 group-hover:opacity-20 transition-opacity"></div>

                <div className="flex items-center space-x-4 mb-10">
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/5 border-b-white/10 shadow-xl">
                    <Shield className="w-6 h-6 text-primary-400" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Recent Issuances</h2>
                </div>

                <div className="flex items-baseline space-x-6 mb-12">
                  <span className="text-[10rem] font-black tracking-tighter leading-none">{certificates.length}</span>
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-[0.2em] text-white/70">Registry Status</p>
                    <p className="text-lg font-bold text-emerald-400 uppercase tracking-widest flex items-center">
                      Active Profile <ArrowRight className="w-5 h-5 ml-2" />
                    </p>
                  </div>
                </div>

                <p className="text-white/40 font-medium max-w-sm mb-12 leading-relaxed tracking-tight">
                  Your identities are securely anchored to the global registry. Instantly deploy them to recruiters.
                </p>
              </div>
            </div>

            {/* Registry Activity Log */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {loading ? (
                    [1, 2].map(i => <div key={i} className="surface-card h-64 animate-pulse bg-slate-50 border-slate-100"></div>)
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
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2 truncate group-hover:text-indigo-600 transition-colors uppercase italic">{cert.courseName || cert.event}</h3>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3.5 h-3.5 text-slate-300" />
                              <span className="text-[14px] font-black uppercase tracking-widest text-slate-800">Deployed {new Date(cert.issuedDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
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
    </div>
  );
};

export default StudentDashboard;
