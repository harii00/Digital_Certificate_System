import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Download,
    ShieldCheck,
    ArrowLeft,
    Check,
    Globe,
    Share,
    ExternalLink,
    Zap,
    Lock,
    ChevronRight,
    Cpu,
    MousePointer2,
    Printer
} from 'lucide-react';
import toast from 'react-hot-toast';

import { certificateAPI } from '../services/api';

const CertificateDetail = () => {
    const { id, certId } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

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

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success('Registry Link Copied.');
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="noise-overlay"></div>
            <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!certificate) return null;

    return (
        <div className="min-h-screen relative pt-44 pb-24 px-6">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Back Navigation */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="group mb-16 flex items-center space-x-3 px-6 py-3 bg-white/80 hover:bg-slate-900 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-800 group-hover:text-white transition-colors">Registry Archives</span>
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Main Certificate View */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-8"
                    >
                        <div className="surface-glass p-1 md:p-2 border-white/60 shadow-[0_48px_96px_-16px_rgba(0,0,0,0.12)]">
                            <div className="bg-white rounded-[2.8rem] p-12 md:p-24 border border-slate-100 relative overflow-hidden">
                                {/* Authenticity Badge */}
                                <div className="flex justify-between items-start mb-24">
                                    <div className="p-6 bg-slate-900 text-white rounded-[1.8rem] shadow-xl group-hover:-rotate-6 transition-transform">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full mb-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[12px] font-black uppercase tracking-widest italic">Authenticity Verified</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-black uppercase tracking-widest text-slate-600">Identity Token</span>
                                            <span className="text-[14px] font-mono font-bold text-slate-900">0x0ED...F92A</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Core Information */}
                                <div className="text-center space-y-20 mb-24 px-4">
                                    <div className="space-y-4">
                                        <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-indigo-500">Academic Achievement</h4>
                                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-[-0.05em] text-slate-900 leading-tight">Mastery Certification</h1>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-slate-800 font-black uppercase tracking-[0.2em] italic text-base">This is to officially recognize</p>
                                        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 py-2 tracking-tighter">
                                            {certificate.studentName}
                                        </h2>
                                    </div>

                                    <div className="max-w-xl mx-auto border-y border-slate-50 py-12">
                                        <p className="text-slate-700 font-bold leading-relaxed italic text-lg mb-4">
                                            For demonstrating exceptional proficiency and successfully fulfilling all designated requirements for:
                                        </p>
                                        <p className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                            {certificate.courseName || certificate.event}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer Metadata */}
                                <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-50 pt-16 mt-16 gap-12 px-4">
                                    <div className="grid grid-cols-2 gap-16">
                                        <div>
                                            <p className="text-[12px] font-black uppercase tracking-widest text-slate-600 mb-2">Deployed On</p>
                                            <p className="font-extrabold text-slate-800 text-base">{new Date(certificate.issuedDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-black uppercase tracking-widest text-slate-600 mb-2">Record Entry</p>
                                            <p className="font-mono font-bold text-slate-400 text-xs tracking-tighter uppercase truncate w-32">{certificate.certificateId || certificate._id}</p>
                                        </div>
                                    </div>

                                    {certificate.qrCode && (
                                        <div className="relative group/qr p-3 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:scale-105 active:scale-95 cursor-zoom-in">
                                            <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 group-hover/qr:opacity-100 transition-opacity rounded-full"></div>
                                            <img src={certificate.qrCode} alt="Verify Access" className="w-20 h-20 relative z-10 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Actions & Context */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="lg:col-span-4 space-y-10"
                    >
                        {/* Elite Action Panel */}
                        <div className="surface-glass p-8 bg-slate-900 text-white shadow-2xl relative overflow-hidden group border-white/10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

                            <div className="flex items-center space-x-3 mb-10 relative z-10">
                                <div className="p-3 bg-white/10 rounded-2xl">
                                    <Zap className="w-4 h-4 text-indigo-400" />
                                </div>
                                <h3 className="font-black tracking-tight text-[12px] uppercase tracking-[0.2em]">Quick Deployment</h3>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <button
                                    onClick={handleDownload}
                                    className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white text-white hover:text-slate-900 rounded-2xl transition-all duration-500 group/btn font-bold text-xs"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Download className="w-4.5 h-4.5" />
                                        <span className="uppercase tracking-[0.2em]">Download PDF</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 opacity-50 group-hover/btn:translate-x-1.5 transition-transform" />
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-500 group/btn font-bold text-xs"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Printer className="w-4.5 h-4.5 text-indigo-400" />
                                        <span className="uppercase tracking-[0.2em]">Print Artifact</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 opacity-50 group-hover/btn:translate-x-1.5 transition-transform" />
                                </button>
                                <button
                                    onClick={copyUrl}
                                    className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-500 group/btn font-bold text-xs"
                                >
                                    <div className="flex items-center space-x-4">
                                        {copied ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <ExternalLink className="w-4.5 h-4.5 text-indigo-400" />}
                                        <span className="uppercase tracking-[0.2em]">{copied ? 'Link Synchronized' : 'Copy Registry URL'}</span>
                                    </div>
                                    <MousePointer2 className="w-4 h-4 opacity-50 group-hover/btn:translate-x-1.5 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Professional Context */}
                        <div className="surface-card p-10 bg-slate-50/50 border-slate-100">
                            <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-700 mb-10">Registry Protocol v2.4</h4>
                            <div className="space-y-10">
                                <div className="flex items-start space-x-6">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-black text-slate-900 uppercase tracking-tight mb-1">Global Integrity</p>
                                        <p className="text-[12px] text-slate-700 font-bold leading-relaxed">Verified by decentralized network nodes across 12 digital clusters.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-black text-slate-900 uppercase tracking-tight mb-1">Secure Anchorage</p>
                                        <p className="text-[12px] text-slate-700 font-bold leading-relaxed">Immutable timestamping ensures original record was never altered.</p>
                                    </div>
                                </div>
                                <div className="pt-10 border-t border-slate-200/50">
                                    <button className="w-full py-5 bg-slate-900 text-white rounded-[1.2rem] text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-indigo-500/10">
                                        <Share className="w-3.5 h-3.5" />
                                        <span>Showcase Credential</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDetail;
