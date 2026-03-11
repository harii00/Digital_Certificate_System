import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Shield,
    Mail,
    Lock,
    User,
    ArrowRight,
    Briefcase,
    GraduationCap,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            toast.success('Identity established. Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Protocol failure during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
            <div className="noise-overlay"></div>
            <div className="mesh-container"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-[540px] relative z-20"
            >
                <div className="surface-glass p-10 md:p-14 border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]">
                    <div className="text-center mb-12">
                        <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
                            <div className="p-3 bg-slate-900 text-white rounded-2xl group-hover:-rotate-6 transition-transform">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">DigitalCert</span>
                        </Link>

                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Identity Onboarding</span>
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900 mb-2 leading-none">Establish Registry</h1>
                        <p className="text-slate-900 font-black text-xl">Deploy your digital academic identity</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Role Selection */}
                        <div className="p-1.5 bg-slate-100 rounded-[1.2rem] flex items-center">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'student' })}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${formData.role === 'student' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                                    }`}
                            >
                                <GraduationCap className="w-4 h-4" />
                                <span>Student</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'admin' })}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${formData.role === 'admin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                                    }`}
                            >
                                <Briefcase className="w-4 h-4" />
                                <span>Institutional</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2 group">
                                <label className="text-[14px] font-black uppercase tracking-widest text-slate-800 ml-5 group-focus-within:text-indigo-600 transition-colors">Legal Name</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        placeholder="Elite Recipient"
                                        className="input-saas pl-14"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <label className="text-[14px] font-black uppercase tracking-widest text-slate-800 ml-5 group-focus-within:text-indigo-600 transition-colors">Identity Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="elite@edu.in"
                                        className="input-saas pl-14"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label className="text-[14px] font-black uppercase tracking-widest text-slate-800 ml-5 group-focus-within:text-indigo-600 transition-colors">Access Logic (Passphrase)</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input-saas pl-14 font-mono pb-4"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-saas-primary group py-5 shadow-xl hover:shadow-indigo-500/10"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="text-sm font-bold uppercase tracking-widest">Establish Identity</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <div className="flex items-center justify-center space-x-2 opacity-50">
                            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="text-[12px] font-black uppercase tracking-widest text-slate-800">Secure Personal Onboarding</span>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-10 text-xs font-medium text-slate-400 uppercase tracking-widest">
                    Already recognized? <Link to="/login" className="text-slate-900 font-extrabold hover:text-indigo-600 transition-colors">Access Identity</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
