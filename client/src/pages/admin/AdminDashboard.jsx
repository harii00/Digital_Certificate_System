import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Award,
  CheckCircle,
  XCircle,
  TrendingUp,
  Plus,
  Search,
  Activity,
  ShieldCheck,
  ChevronRight,
  Database,
  Cpu,
  ArrowUpRight,
  Zap,
  Sparkles,
  Users,
  Trophy,
  User,
  LogOut
} from 'lucide-react';
import { Badge } from '../../components/UI';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    valid: 0,
    revoked: 0,
    pending: 0,
  });
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/certificates');
      const total = data.length;
      const valid = data.filter(c => c.status === 'Valid').length;
      const revoked = data.filter(c => c.status === 'Revoked').length;
      const pending = data.filter(c => c.status === 'Pending').length;

      setStats({ total, valid, revoked, pending });
      setRecentCertificates(data.slice(0, 8));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Network Registry', value: stats.total, icon: <Database />, color: 'text-slate-900', bg: 'bg-slate-50' },
    { label: 'Verified Integrity', value: stats.valid, icon: <CheckCircle />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Revoked Protocol', value: stats.revoked, icon: <XCircle />, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Audit Required', value: stats.pending, icon: <Activity />, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-24 px-6 overflow-hidden">

      {/* ─── Custom Fixed Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        {/* Left: Profile + Certificates */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-sm font-bold"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => navigate('/certificates')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-sm font-bold"
          >
            <Award className="w-4 h-4" />
            <span>Certificates</span>
          </button>
        </div>

        {/* Center: DigiCert brand */}
        <span
          className="absolute left-1/2 -translate-x-1/2 text-[1.6rem] font-black text-slate-900 leading-none select-none"
          style={{ fontFamily: '"Black Ops One", system-ui, sans-serif', letterSpacing: '0.02em', textTransform: 'uppercase' }}
        >
          DigiCert
        </span>

        {/* Right: Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 text-sm font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </header>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Control Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black tracking-[-0.04em] text-slate-900 mb-3 leading-tight"
            >
              Welcome back, <span className="text-indigo-600">{user?.name?.split(' ')[0] || 'Admin'}</span>
            </motion.h1>
            <p className="text-slate-500 font-semibold text-lg">Manage certificates, students, and rankings from your dashboard.</p>
          </div>
          <div className="flex items-center space-x-4 flex-wrap gap-y-4">
            <button
              onClick={() => navigate('/admin/students')}
              className="btn-saas-secondary px-8 h-fit group"
            >
              <Users className="w-4 h-4 mr-2" />
              <span>Students</span>
            </button>
            <button
              onClick={() => navigate('/admin/ranking')}
              className="btn-saas-secondary px-8 h-fit group"
            >
              <Trophy className="w-4 h-4 mr-2" />
              <span>Rankings</span>
            </button>
            <button
              onClick={() => navigate('/admin/dashboard/issue')}
              className="btn-saas-primary px-12 h-fit shadow-2xl shadow-primary-500/10 group"
            >
              <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-500" />
              <span>Issue New Credential</span>
            </button>
          </div>
        </div>

        {/* Quick Insights Grid (Elite Stripe Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card p-1 group cursor-default border-transparent hover:border-slate-100"
            >
              <div className="bg-white p-10 rounded-[1.8rem] relative overflow-hidden flex flex-col items-center text-center">
                {/* Depth Overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-[60px] opacity-20 -z-10 group-hover:opacity-40 transition-opacity`}></div>

                <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-10 shadow-sm border border-white/50 group-hover:rotate-12 transition-transform`}>
                  {stat.icon}
                </div>
                <p className="text-[14px] font-black uppercase tracking-widest text-slate-800 mb-3">{stat.label}</p>
                <p className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Registry & Activity Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="surface-card bg-white border-slate-100 overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-black tracking-tight uppercase text-slate-900">Recent Synchronization Events</h2>
                </div>
                <Link to="/certificates" className="text-[12px] font-black uppercase tracking-widest text-primary-500 hover:underline flex items-center group">
                  Master Ledger <ArrowUpRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence>
                      {loading ? (
                        [1, 2, 3, 4].map(i => (
                          <tr key={i} className="animate-pulse">
                            <td className="px-10 py-8"><div className="h-4 bg-slate-50 rounded-full w-48 mb-2"></div><div className="h-3 bg-slate-50 rounded-full w-24 opacity-50"></div></td>
                            <td className="px-10 py-8"><div className="h-6 bg-slate-50 rounded-lg w-20 ml-auto"></div></td>
                          </tr>
                        ))
                      ) : recentCertificates.map((cert) => (
                        <tr key={cert._id} className="hover:bg-slate-50/50 transition-colors group/row">
                          <td className="px-10 py-6">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 tracking-tight text-xl group-hover/row:text-indigo-600 transition-colors uppercase italic">{cert.studentName}</span>
                              <span className="text-[12px] text-slate-800 font-black uppercase tracking-widest group-hover/row:text-slate-900 transition-colors">{cert.courseName || cert.event}</span>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex flex-col items-end gap-3">
                              <Badge variant={cert.status === 'Valid' ? 'success' : 'error'}>
                                <span className="px-1">{cert.status}</span>
                              </Badge>
                              <span className="font-mono text-[12px] text-slate-800 font-bold letter-spacing-tight uppercase">{cert.certificateId}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            {/* Security Manifest (Elite Glow) */}
            <div className="surface-card p-12 bg-slate-900 text-white shadow-elite relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 blur-[100px] opacity-10 -mr-12 -mt-12 group-hover:opacity-20 transition-opacity"></div>

              <div className="flex items-center space-x-3 mb-10 relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/5 shadow-2xl">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] relative z-10">Global Integrity</h3>
              </div>

              <p className="text-white/40 font-medium mb-10 leading-relaxed relative z-10 tracking-tight italic">
                Protocol synchronized across all institutional clusters. Registry health is currently optimal.
              </p>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-white/50">
                  <span>Audit Synchronization</span>
                  <span>100% Secure</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="bg-emerald-500 h-full rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Node Events Activity */}
            <div className="surface-card p-10 bg-white border-slate-100">
              <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-8 px-2 flex items-center">
                <Cpu className="w-3 h-3 mr-3" />
                Synchronized Cluster Log
              </h3>
              <div className="space-y-6">
                {[
                  { msg: 'Master Node: Optimal', time: '1m ago', color: 'bg-emerald-500', icon: <Sparkles className="w-3 h-3" /> },
                  { msg: 'Bulk Export Success', time: '2h ago', color: 'bg-indigo-500', icon: <Database className="w-3 h-3" /> },
                  { msg: 'Revocation Audit', time: '5h ago', color: 'bg-amber-500', icon: <Activity className="w-3 h-3" /> }
                ].map((ev, i) => (
                  <div key={i} className="flex items-start justify-between p-5 bg-slate-50/50 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 transition-all group">
                    <div className="flex items-start space-x-4">
                      <div className={`mt-1 w-2 h-2 rounded-full ${ev.color} animate-pulse shadow-[0_0_10px_currentColor]`}></div>
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-900 tracking-tight uppercase">{ev.msg}</p>
                        <p className="text-[12px] font-bold text-slate-800 uppercase tracking-widest">{ev.time}</p>
                      </div>
                    </div>
                    <div className="text-slate-100 group-hover:text-slate-200 transition-colors">
                      {ev.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
