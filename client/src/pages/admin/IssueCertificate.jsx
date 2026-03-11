import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Award,
  User,
  Mail,
  Calendar,
  FileText,
  Send,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  Cpu,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    event: '',
    issuedDate: new Date().toISOString().split('T')[0],
    status: 'Valid',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/certificates', formData);
      toast.success('Professional record issued and encrypted.');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Issuance protocol failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Context Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group mb-16 flex items-center space-x-3 px-6 py-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800 group-hover:text-slate-900">Abort Protocol</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Protocol Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <div className="surface-glass p-1 shadow-2xl relative group">
              {/* Elite Form Background */}
              <div className="bg-white rounded-[2.2rem] p-12 md:p-16 border border-slate-100 relative overflow-hidden">
                <div className="mb-16">
                  <div className="flex items-center space-x-5 mb-8">
                    <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl transform group-hover:rotate-6 transition-transform">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-[12px] font-black uppercase tracking-widest mb-1.5 border border-indigo-100/50">
                        <Sparkles className="w-3 h-3" />
                        <span>Issuance Authority</span>
                      </div>
                      <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Deploy Credential</h1>
                    </div>
                  </div>
                  <p className="text-slate-600 font-bold leading-relaxed italic max-w-md">Initialize the secure issuance of a verified academic achievement to the global registry.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-3 group">
                      <label className="text-[12px] font-black uppercase tracking-widest text-slate-600 ml-4 group-focus-within:text-indigo-600 transition-colors">Recipient Legal Identity</label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                          placeholder="e.g. Yash Omre"
                          className="input-saas pl-14"
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3 group">
                      <label className="text-[12px] font-black uppercase tracking-widest text-slate-600 ml-4 group-focus-within:text-indigo-600 transition-colors">Encrypted Delivery Endpoint</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                          type="email"
                          placeholder="student@mitsgwalior.in"
                          className="input-saas pl-14"
                          value={formData.studentEmail}
                          onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3 group">
                      <label className="text-[12px] font-black uppercase tracking-widest text-slate-600 ml-4 group-focus-within:text-indigo-600 transition-colors">Achievement Designation</label>
                      <div className="relative">
                        <FileText className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                          placeholder="e.g. Lead Developer - Global Hackathon 2026"
                          className="input-saas pl-14"
                          value={formData.event}
                          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3 group">
                        <label className="text-[12px] font-black uppercase tracking-widest text-slate-800 ml-4 group-focus-within:text-primary-500 transition-colors">Authorization Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
                          <input
                            type="date"
                            className="input-saas pl-14"
                            value={formData.issuedDate}
                            onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3 group">
                        <label className="text-[12px] font-black uppercase tracking-widest text-slate-800 ml-4 group-focus-within:text-primary-500 transition-colors">Initial Registry State</label>
                        <select
                          className="input-saas appearance-none cursor-pointer"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="Valid">Valid (Active Record)</option>
                          <option value="Pending">Pending (Audit Trail)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 relative group/btn">
                    <div className="absolute -inset-1 bg-primary-100/50 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    <button
                      type="submit"
                      className="w-full btn-saas-primary py-6 relative z-10"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="text-sm font-bold uppercase tracking-[0.2em]">Authorize & Deploy Record</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Authority Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-10"
          >
            <div className="surface-card p-10 bg-slate-50 border-slate-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 shadow-sm">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-900">Registry Protocol</h3>
              </div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl border border-emerald-100">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">SHA-256 Hashing</p>
                    <p className="text-[12px] text-slate-700 font-bold leading-relaxed italic">Records are immutable once deployed to the decentralized hub.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-primary-50 text-primary-500 rounded-xl border border-primary-100">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Identity Match</p>
                    <p className="text-[12px] text-slate-700 font-bold leading-relaxed italic">Automatically synchronizes with the recipient's personal vault endpoint.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-card p-10 bg-slate-900 text-white relative group overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[80px] opacity-20 -z-10 group-hover:opacity-40 transition-opacity"></div>
              <div className="flex items-center space-x-3 mb-8 relative z-10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-[12px] font-black uppercase tracking-widest text-white/60">Audit Manifest</h3>
              </div>
              <p className="text-sm font-bold leading-relaxed mb-8 relative z-10 tracking-tight">You are currently issuing as a <span className="text-primary-400">Verified Institution Authority</span>. Every deployment is logged for governance.</p>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between text-[12px] font-black uppercase tracking-widest text-white/50">
                <span>Governance Compliance</span>
                <span className="text-emerald-500">Passed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;
