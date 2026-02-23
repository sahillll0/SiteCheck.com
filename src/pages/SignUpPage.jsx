import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success === true) signup(formData);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md panel-card p-10 bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="inline-flex size-20 items-center justify-center rounded-3xl bg-slate-800 [data-theme=light]:bg-slate-100 border border-white/5 [data-theme=light]:border-slate-200 mb-6 group shadow-2xl">
                        <Sparkles className="size-10 text-violet-400 group-hover:rotate-12 transition-transform" />
                    </div>
                    <h1 className="text-4xl font-black mb-3 text-white [data-theme=light]:text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-400 [data-theme=light]:text-slate-500 font-light">Join SiteCheck to optimize your web presence</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-left">
                        <label className="text-xs uppercase font-black tracking-widest text-slate-500 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                            <input
                                type="text"
                                className="input w-full pl-12 h-14 bg-slate-900 [data-theme=light]:bg-slate-50 border-white/5 [data-theme=light]:border-slate-200 focus:border-violet-500/50 transition-all font-light text-white [data-theme=light]:text-slate-900"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-xs uppercase font-black tracking-widest text-slate-500 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                            <input
                                type="email"
                                className="input w-full pl-12 h-14 bg-slate-900 [data-theme=light]:bg-slate-50 border-white/5 [data-theme=light]:border-slate-200 focus:border-violet-500/50 transition-all font-light text-white [data-theme=light]:text-slate-900"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-xs uppercase font-black tracking-widest text-slate-500 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input w-full pl-12 pr-12 h-14 bg-slate-900 [data-theme=light]:bg-slate-50 border-white/5 [data-theme=light]:border-slate-200 focus:border-violet-500/50 transition-all font-light text-white [data-theme=light]:text-slate-900"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-800 [data-theme=light]:hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full h-14 text-lg font-bold shadow-lg shadow-violet-500/20" disabled={isSigningUp}>
                        {isSigningUp ? <Loader2 className="size-6 animate-spin" /> : "Create New Account"}
                    </button>
                </form>

                <div className="mt-10 pt-10 border-t border-white/5 [data-theme=light]:border-slate-200 text-center">
                    <p className="text-slate-400 font-light">
                        Already have an account?{" "}
                        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-bold ml-1 transition-colors">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
