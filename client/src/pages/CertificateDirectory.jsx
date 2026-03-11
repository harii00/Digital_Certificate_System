import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    Search,
    ShieldCheck,
    Activity,
    Database,
    SearchX,
    Cpu,
    Sparkles,
    ChevronDown,
    Calendar,
    Award,
    Eye,
    ArrowRight,
    Fingerprint,
    Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/UI';

const CertificateDirectory = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/certificates');
                setCertificates(data);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const filteredCertificates = certificates.filter((cert) => {
        const matchesSearch =
            cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.certificateId?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = activeFilter === 'All' || cert.status === activeFilter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden bg-[#f8fafc]">
            {/* Subtle background mesh */}
            <div className="mesh-container opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-100 to-transparent pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Soft & Attractive Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mb-16"
                >
                    <div className="absolute inset-0 bg-slate-200 blur-[120px] opacity-30"></div>
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[2.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.1)] border border-white/5">

                        {/* Muted textured overlays */}
                        <div className="absolute inset-0 noise-overlay opacity-[0.03]"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[80px] rounded-full animate-float-slow"></div>

                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-12 relative z-10">
                            <div className="max-w-2xl">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center space-x-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full text-[12px] font-black uppercase tracking-[0.3em] mb-10 border border-white/10"
                                >
                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                    <span className="text-slate-300">Synchronized Ledger Node</span>
                                </motion.div>
                                <h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">
                                    Registry <br />
                                    Portal.
                                </h1>
                                <p className="text-slate-400 font-bold text-xl max-w-lg leading-relaxed tracking-tight">
                                    A professional high-fidelity audit of academic credentials issued across the synchronized MITS network.
                                </p>
                            </div>

                            {/* Subtle Search Interface */}
                            <div className="flex-1 max-w-2xl w-full">
                                <div className="bg-white rounded-[2rem] p-2 flex flex-col md:flex-row items-center shadow-[0_24px_48px_rgba(0,0,0,0.06)] relative group border border-slate-100">
                                    <div className="flex-1 flex items-center px-6 w-full">
                                        <Search className="w-6 h-6 text-slate-300 group-focus-within:text-slate-900 transition-all duration-300 shrink-0" />
                                        <input
                                            placeholder="Search by ID, Name, or Course..."
                                            className="w-full py-5 bg-transparent border-none outline-none text-slate-800 font-bold placeholder:text-slate-300 ml-5 text-lg tracking-tight"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button className="w-full md:w-auto px-10 py-5 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-[13px] rounded-[1.6rem] transition-all active:scale-95 flex items-center justify-center gap-3">
                                        <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                                        Audit Registry
                                    </button>
                                </div>
                                <div className="mt-6 px-8 flex items-center space-x-8">
                                    <div className="flex items-center text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer group">
                                        <span>Show Advanced Filters</span>
                                        <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                                    <div className="flex items-center text-[11px] font-black uppercase tracking-widest text-slate-500">
                                        <Activity className="w-4 h-4 mr-2 text-emerald-500" />
                                        <span>Connection: Optimized</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Muted Ledger Table */}
                <div className="surface-glass p-1 border-white/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] overflow-hidden rounded-[2.5rem]">
                    <div className="bg-white rounded-[2.4rem] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="px-10 py-10 text-[14px] font-black uppercase tracking-[0.2em] text-slate-600">Node ID</th>
                                        <th className="px-10 py-10 text-[14px] font-black uppercase tracking-[0.2em] text-slate-600">Recipient Identity</th>
                                        <th className="px-10 py-10 text-[14px] font-black uppercase tracking-[0.2em] text-slate-600">Credential</th>
                                        <th className="px-10 py-10 text-[14px] font-black uppercase tracking-[0.2em] text-slate-600">Issuance</th>
                                        <th className="px-10 py-10 text-[14px] font-black uppercase tracking-[0.2em] text-slate-600">Status</th>
                                        <th className="px-10 py-10 text-[14px] font-black uppercase tracking-[0.2em] text-slate-600 text-right">Audit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <AnimatePresence mode="popLayout">
                                        {loading ? (
                                            [1, 2, 3, 4, 5, 6].map(i => (
                                                <tr key={i} className="animate-pulse">
                                                    {[1, 2, 3, 4, 5, 6].map(j => (
                                                        <td key={j} className="px-10 py-10">
                                                            <div className="h-4 bg-slate-50 rounded-full w-24"></div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))
                                        ) : filteredCertificates.length > 0 ? (
                                            filteredCertificates.map((cert, idx) => (
                                                <motion.tr
                                                    key={cert._id}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.03 }}
                                                    className="group hover:bg-slate-50/80 transition-all cursor-pointer relative"
                                                    onClick={() => window.location.href = `/certificates/${cert._id}`}
                                                >
                                                    <td className="px-10 py-10">
                                                        <div className="flex items-center space-x-4">
                                                            <div className={`p-3 rounded-xl border transition-all duration-300
                                                                ${idx % 3 === 0 ? 'bg-indigo-50/50 text-indigo-600 border-indigo-100' :
                                                                    idx % 3 === 1 ? 'bg-slate-50/50 text-slate-600 border-slate-100' :
                                                                        'bg-blue-50/50 text-blue-600 border-blue-100'} 
                                                                group-hover:bg-white group-hover:shadow-sm`}>
                                                                <Fingerprint className="w-4 h-4" />
                                                            </div>
                                                            <span className="font-mono text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase">
                                                                {cert.certificateId || cert._id.slice(-8).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-10">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-[11px] border border-slate-200">
                                                                {cert.studentName.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-slate-900 font-bold uppercase tracking-tight text-[15px] leading-tight">
                                                                    {cert.studentName}
                                                                </span>
                                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Verified Identity</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-10">
                                                        <span className="text-[14px] font-bold text-slate-700 uppercase tracking-tight">
                                                            {cert.courseName || cert.event}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-10">
                                                        <div className="flex items-center space-x-3 text-slate-400 font-bold uppercase tracking-[0.1em] text-[11px]">
                                                            <Calendar className="w-3.5 h-3.5 opacity-40" />
                                                            <span>{new Date(cert.issuedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-10">
                                                        <div className={`inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest
                                                            ${cert.status === 'Valid' ? 'bg-emerald-50/50 text-emerald-700 border-emerald-100' : 'bg-amber-50/50 text-amber-700 border-amber-100'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${cert.status === 'Valid' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                            <span>{cert.status === 'Valid' ? 'Verified' : cert.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-10 text-right">
                                                        <Link
                                                            to={`/certificates/${cert._id}`}
                                                            className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-900 font-black uppercase tracking-widest text-[10px] transition-all"
                                                        >
                                                            <span>Audit</span>
                                                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                                        </Link>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="py-24 text-center">
                                                    <div className="flex flex-col items-center justify-center opacity-40">
                                                        <SearchX className="w-12 h-12 mb-4" />
                                                        <p className="text-sm font-black uppercase tracking-[0.2em]">Record Not Found</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Soft Footer */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 px-10">
                    <div className="flex items-center space-x-6">
                        <div className="flex -space-x-2.5">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-100 bg-slate-200"></div>
                            ))}
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                            <span className="text-slate-600">Secure Network</span> • 10k+ IDs Verified
                        </p>
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span>Status: Operational</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CertificateDirectory;
