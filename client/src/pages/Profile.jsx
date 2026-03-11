import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/UI';
import { User, Mail, Shield, ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Profile = ({ role }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-24 pb-12 bg-background px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Card className="p-0 overflow-hidden">
                        <div className="h-32 bg-gradient-academic"></div>
                        <div className="px-8 pb-8 flex flex-col items-center">
                            <div className="relative -mt-16 mb-6">
                                <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-lg">
                                    <div className="w-full h-full rounded-2xl bg-primary-light flex items-center justify-center text-primary text-4xl font-bold">
                                        {user?.name?.charAt(0)}
                                    </div>
                                </div>
                                <button className="absolute bottom-1 right-1 p-2 bg-white rounded-xl shadow-soft text-gray-400 hover:text-primary transition-all">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                            <div className="flex items-center mt-2 space-x-2">
                                <Badge variant="info">{role.toUpperCase()}</Badge>
                                <span className="text-gray-400 text-sm italic">Joined Feb 2026</span>
                            </div>

                            <div className="w-full grid grid-cols-1 gap-4 mt-10">
                                <div className="flex items-center p-4 bg-background rounded-xl border border-gray-100">
                                    <Mail className="w-5 h-5 text-gray-400 mr-4" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</p>
                                        <p className="text-gray-900 font-medium">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-background rounded-xl border border-gray-100">
                                    <User className="w-5 h-5 text-gray-400 mr-4" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Full Name</p>
                                        <p className="text-gray-900 font-medium">{user?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-background rounded-xl border border-gray-100">
                                    <Shield className="w-5 h-5 text-gray-400 mr-4" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">User Role</p>
                                        <p className="text-gray-900 font-medium capitalize">{user?.role}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-10 pt-8 border-t border-gray-100 flex justify-end space-x-3">
                                <Button variant="outline">Edit Profile</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

const Badge = ({ children, variant }) => {
    const variants = {
        info: 'bg-blue-100 text-blue-700',
    };
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${variants[variant]}`}>{children}</span>
}

export default Profile;
