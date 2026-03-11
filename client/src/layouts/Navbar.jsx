import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Menu, X, LogOut, User as UserIcon, Home, Compass, Cpu, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Certificates', path: '/certificates', icon: <Compass className="w-4 h-4" />, adminOnly: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-700 pointer-events-none pt-6`}>
      <nav className={`nav-pill transition-all duration-700 pointer-events-auto ${scrolled ? 'scale-[0.9] -translate-y-2' : 'scale-100'}`}>
        <div className="flex items-center space-x-12 px-2">
          {/* Logo Area */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="p-2 bg-slate-900 text-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] transform group-hover:rotate-6 transition-transform duration-500">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <span className="text-[16px] font-black tracking-tight text-slate-900 uppercase">
              DigitalCert
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.filter(link => !link.adminOnly || (user && user.role === 'admin')).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isActive(link.path)
                  ? 'text-slate-900'
                  : 'text-slate-700 hover:text-slate-900'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-slate-900 rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.7 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Area */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard')}
                  className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all rounded-xl"
                >
                  <UserIcon className="w-5 h-5" />
                </button>
                <div className="w-[1px] h-4 bg-slate-100 mx-2"></div>
                <button
                  onClick={logout}
                  className="p-2.5 text-slate-400 hover:text-red-500 transition-all rounded-xl hover:bg-red-50"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="px-5 py-2 text-[12px] font-bold text-slate-700 hover:text-slate-900 uppercase tracking-widest transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-6 py-3 bg-slate-900 text-white text-[10.5px] font-extrabold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95">
                  Join DigitalCert
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <div className="w-[1px] h-4 bg-slate-100 mr-4"></div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden absolute top-24 left-6 right-6 surface-glass p-8 shadow-2xl z-[60]"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-2xl transition-all font-bold tracking-tight text-xl ${isActive(link.path) ? 'text-slate-900' : 'text-slate-400'
                    }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className={`w-5 h-5 transition-transform ${isActive(link.path) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} />
                </Link>
              ))}
              <div className="pt-8 grid grid-cols-2 gap-4 border-t border-slate-50">
                {user ? (
                  <button
                    className="col-span-2 w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm tracking-widest uppercase"
                    onClick={() => { setIsOpen(false); navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'); }}
                  >
                    Go To Dashboard
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-4 text-center rounded-2xl border border-slate-100 font-bold text-sm text-slate-400 uppercase tracking-widest">Login</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="w-full py-4 text-center rounded-2xl bg-slate-900 text-white font-bold text-sm uppercase tracking-widest">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
