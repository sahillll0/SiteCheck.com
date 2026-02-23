import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { Lock, Eye, EyeOff, Check, Moon, Sun, Sparkles, Shield, Palette, Loader2 } from "lucide-react";
import { useState } from "react";

const THEMES = ["light", "dark"];

const SettingsPage = () => {
    const { theme, setTheme } = useThemeStore();
    const { changePassword, isUpdatingPassword } = useAuthStore();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword(formData);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-16">
                <div className="inline-flex size-20 items-center justify-center rounded-4xl bg-slate-800 [data-theme=light]:bg-slate-100 mb-8 border border-white/10 [data-theme=light]:border-slate-200 shadow-2xl">
                    <Palette className="size-10 text-violet-400" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-main">
                    Your <span className="text-gradient">Space</span>
                </h1>
                <p className="text-muted text-lg max-w-xl mx-auto font-light leading-relaxed">
                    Customise your SiteCheck experience and manage your security preferences.
                </p>
            </div>

            <div className="space-y-8">
                {/* Theme Selection */}
                <div className="panel-card p-10 bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 rounded-xl bg-slate-800 [data-theme=light]:bg-slate-100 flex items-center justify-center shadow-lg">
                            <Sparkles className="size-6 text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-main">Visual Style</h2>
                            <p className="text-muted text-sm font-light">Choose the interface theme that suits you best</p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {THEMES.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTheme(t)}
                                className={`
                                    relative p-4 rounded-2xl border-2 transition-all duration-300 text-left group
                                    ${theme === t
                                        ? "border-violet-500 bg-violet-600/10 shadow-xl shadow-violet-500/5 ring-1 ring-violet-500/20"
                                        : "border-white/5 [data-theme=light]:border-slate-200 bg-slate-800 [data-theme=light]:bg-slate-50 hover:border-white/20 [data-theme=light]:hover:border-slate-300"
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`size-12 rounded-xl flex items-center justify-center ${theme === t ? "bg-violet-600 text-white shadow-lg" : "bg-slate-700 [data-theme=light]:bg-white text-slate-400 [data-theme=light]:text-slate-500 shadow-inner"}`}>
                                        {t === "light" ? <Sun className="size-6" /> : <Moon className="size-6" />}
                                    </div>
                                    {theme === t && <div className="size-5 bg-violet-500 rounded-full flex items-center justify-center"><Check className="size-3 text-white" /></div>}
                                </div>
                                <p className="font-bold text-lg capitalize text-main">{t} Appearance</p>
                                <p className="text-xs text-muted font-light mt-1">
                                    {t === 'light' ? 'Bright and clean interface' : 'Soft on the eyes in low light'}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Security Section */}
                <div className="panel-card p-10 bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl rounded-4xl">
                    <div className="flex items-center gap-4 mb-10 text-left">
                        <div className="size-12 rounded-xl bg-slate-800 [data-theme=light]:bg-slate-100 flex items-center justify-center shadow-lg">
                            <Shield className="size-6 text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white [data-theme=light]:text-slate-900 leading-tight">Security</h2>
                            <p className="text-slate-400 [data-theme=light]:text-slate-500 text-sm font-light mt-1 uppercase tracking-widest">Identity Shield</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3 text-left">
                            <label className="text-xs font-bold text-slate-400 [data-theme=light]:text-slate-500 uppercase tracking-[0.2em] ml-1">Current Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
                                <input
                                    type={showPassword.old ? "text" : "password"}
                                    name="oldPassword"
                                    className="input w-full h-16 pl-14 text-lg"
                                    placeholder="••••••••"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                                    onClick={() => togglePasswordVisibility("old")}
                                >
                                    {showPassword.old ? <EyeOff className="size-5 text-slate-500" /> : <Eye className="size-5 text-slate-500" />}
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3 text-left">
                                <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] ml-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
                                    <input
                                        type={showPassword.new ? "text" : "password"}
                                        name="newPassword"
                                        className="input w-full h-16 pl-14 text-lg"
                                        placeholder="Min. 8 chars"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                                        onClick={() => togglePasswordVisibility("new")}
                                    >
                                        {showPassword.new ? <EyeOff className="size-5 text-slate-500" /> : <Eye className="size-5 text-slate-500" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3 text-left">
                                <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
                                    <input
                                        type={showPassword.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        className="input w-full h-16 pl-14 text-lg"
                                        placeholder="Repeat new key"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                                        onClick={() => togglePasswordVisibility("confirm")}
                                    >
                                        {showPassword.confirm ? <EyeOff className="size-5 text-slate-500" /> : <Eye className="size-5 text-slate-500" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full md:w-auto px-8 h-14 text-lg gap-2"
                            disabled={isUpdatingPassword}
                        >
                            {isUpdatingPassword ? (
                                <Loader2 className="size-6 animate-spin" />
                            ) : (
                                <>
                                    <span>Sync Settings</span>
                                    <Check className="size-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
