import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    ShieldCheck,
    ArrowRight,
    Globe,
    Lock,
    Zap,
    CheckCircle2,
    Shield,
    Sparkles,
    MousePointer2,
    ChevronDown,
    Award,
    RefreshCw
} from 'lucide-react';
import CertificateCard from '../components/CertificateCard';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Sovereign Integrity',
            desc: 'Each credential is securely anchored, ensuring permanent, tamper-proof validity.',
            icon: <ShieldCheck className="w-6 h-6" />,
        },
        {
            title: 'Verification Engine',
            desc: 'A seamless, world-class verification protocol for institutions and employers worldwide.',
            icon: <Zap className="w-6 h-6" />,
        },
        {
            title: 'Universal Portability',
            desc: 'Digital credentials designed for the modern global academic and professional ecosystem.',
            icon: <Globe className="w-6 h-6" />,
        },
        {
            title: 'Trusted Security',
            desc: 'Built with elite encryption standards to protect institutional and student identity.',
            icon: <Lock className="w-6 h-6" />,
        },
    ];


    return (
        <div className="relative min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Content Prop */}
                        <div className="max-w-xl z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center space-x-2 px-4 py-1.5 bg-indigo-50/50 border border-indigo-100 rounded-full mb-8 backdrop-blur-sm"
                            >
                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                                    Next-Gen Credentialing
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[3.8rem] md:text-[5.5rem] font-extrabold leading-[1] tracking-[-0.05em] text-slate-900 mb-8"
                            >
                                The future of <br />
                                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">verified trust.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-2xl text-slate-700 font-bold leading-relaxed mb-10 max-w-lg"
                            >
                                Elite-grade credentialing for world-class institutions. Store, issue, and verify academic achievements with absolute certainty.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col sm:flex-row items-center gap-4"
                            >
                                <button
                                    onClick={() => navigate('/certificates')}
                                    className="w-full sm:w-auto btn-saas-primary group"
                                >
                                    <span>Explore Registry</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="w-full sm:w-auto btn-saas-secondary"
                                >
                                    <span>Join Platform</span>
                                </button>
                            </motion.div>

                            {/* Institutional Trust Badges */}
                            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-8 opacity-40">
                                <div className="flex items-center space-x-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-700">AES-256 Secured</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RefreshCw className="w-5 h-5" />
                                    <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-700">Real-time Sync</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive UI Preview */}
                        <div className="relative group hidden lg:block">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100/30 blur-[120px] rounded-full -z-10 animate-pulse"></div>

                            <motion.div
                                initial={{ opacity: 0, rotateY: 15, x: 50 }}
                                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-10 perspective-1000"
                            >
                                <CertificateCard
                                    className="max-w-[500px] mx-auto animate-float-slow"
                                    certificate={{
                                        studentName: 'Julian Thorne',
                                        courseName: 'M.S. Advanced Security',
                                        issuer: 'Institute of Advanced Security',
                                        _id: '8821990x'
                                    }}
                                />

                                {/* Floating Trust Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-10 -right-10 surface-card px-6 py-5 shadow-2xl z-20"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Status</p>
                                            <p className="text-sm font-black text-slate-900">Verified Elite</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating Verification Glimpse */}
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-8 -left-12 surface-glass px-6 py-4 shadow-xl z-20"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-9 h-9 rounded-full border-[3px] border-white bg-slate-${i * 100 + 100} shadow-sm`}></div>
                                            ))}
                                        </div>
                                        <p className="text-[12px] font-bold text-slate-800 tracking-tight">+142 Recruiters Viewing</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

            </section>


            {/* Platform Benefits */}
            <section className="py-16 px-6 relative overflow-hidden">
                <div className="max-w-[1240px] mx-auto">
                    <div className="text-center mb-20 max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-6"
                        >
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Robust Infrastructure</span>
                        </motion.div>
                        <h2 className="text-[3.2rem] font-extrabold tracking-[-0.04em] mb-8 leading-[1.1]">Built for absolute certainty.</h2>
                        <p className="text-2xl text-slate-900 font-black max-w-lg mx-auto leading-relaxed">Infrastructure designed to meet the most demanding academic and professional standards worldwide.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="surface-card p-10 bg-white/50 hover:bg-white border-slate-100 hover:border-indigo-100 group transition-all duration-500"
                            >
                                <div className="p-5 bg-indigo-50 text-indigo-600 rounded-[1.5rem] w-fit mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                    {f.icon}
                                </div>
                                <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{f.title}</h3>
                                <p className="text-slate-800 font-bold leading-relaxed text-xl">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works - High Tech Visual */}
            <section className="py-32 px-6 mx-6 bg-slate-900 text-white relative overflow-hidden rounded-[4rem]">
                <div className="absolute top-0 right-0 w-[80%] h-full bg-indigo-500/10 blur-[180px] -z-10 translate-x-1/3"></div>

                <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-[3.5rem] font-extrabold tracking-[-0.04em] mb-16 leading-[1.1]">How the registry <br /> secures your integrity.</h2>
                        </motion.div>

                        <div className="space-y-16 relative">
                            <div className="absolute top-8 bottom-6 left-[31px] w-[2px] bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent"></div>

                            {[
                                { t: 'Establish Identity', d: 'Institutions create verifiable accounts on our secure node network.' },
                                { t: 'Digital Deployment', d: 'Credentials are verified and issued to recipient profiles.' },
                                { t: 'Public Ledger', d: 'Every record is instantly added to the immutable global registry.' },
                                { t: 'Infinite Ownership', d: 'Recipients own their achievements forever, verifiable by anyone, anywhere.' }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex space-x-12 relative group"
                                >
                                    <div className="w-16 h-16 bg-indigo-900/50 border border-indigo-500/30 rounded-full flex items-center justify-center flex-shrink-0 z-10 group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-500 font-black text-indigo-400 group-hover:text-white text-2xl">
                                        {i + 1}
                                    </div>
                                    <div className="pt-2">
                                        <h4 className="text-3xl font-black mb-4 tracking-tight group-hover:text-indigo-400 transition-colors uppercase italic">{s.t}</h4>
                                        <p className="text-slate-200 font-bold leading-relaxed max-w-lg text-xl">{s.d}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Abstract Visual */}
                    <div className="relative group flex justify-center lg:justify-end">
                        <div className="w-[500px] h-[500px] bg-indigo-500/5 rounded-[5rem] border border-indigo-500/10 flex items-center justify-center p-16 animate-pulse">
                            <div className="w-full aspect-square border-[2px] border-dashed border-indigo-500/20 rounded-full animate-spin-slow flex items-center justify-center p-10 relative">
                                <div className="absolute inset-0 bg-indigo-500/5 blur-[80px] rounded-full"></div>
                                <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-600/40 flex items-center justify-center z-10">
                                    <ShieldCheck className="w-16 h-16 text-white" />
                                </div>
                                <div className="absolute top-0 right-10 w-4 h-4 bg-indigo-400 rounded-full blur-[2px]"></div>
                                <div className="absolute bottom-20 left-0 w-3 h-3 bg-violet-400 rounded-full blur-[2px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer SaaS Style */}
            <footer className="py-20 px-6 mt-20 border-t border-slate-100 bg-slate-50/20">
                <div className="max-w-[1240px] mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between text-slate-400 space-y-12 md:space-y-0">
                        <div className="flex flex-col items-center md:items-start space-y-6">
                            <div className="flex items-center space-x-3.5">
                                <div className="p-2.5 bg-slate-900 text-white rounded-xl">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <span className="text-[14px] font-black tracking-[0.2em] text-slate-900 uppercase">DigitalCert</span>
                            </div>
                            <p className="text-[14px] font-bold max-w-xs text-center md:text-left leading-relaxed text-slate-700">
                                The gold standard for digital academic credentialing and verification.
                            </p>
                        </div>


                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
