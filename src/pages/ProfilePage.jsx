import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Sparkles, Calendar, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-16">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-slate-800 [data-theme=light]:bg-slate-100 mb-6 border border-white/10 [data-theme=light]:border-slate-200 shadow-lg">
                    <User className="size-8 text-violet-400" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-main">
                    Your <span className="text-gradient">Profile</span>
                </h1>
                <p className="text-muted text-lg max-w-xl mx-auto font-light leading-relaxed">
                    Overview of your account and personal preferences.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-6">
                    <div className="panel-card p-10 text-center bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl">
                        <div className="relative inline-block mb-6">
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="Profile"
                                className="size-32 rounded-3xl object-cover border-4 border-white/5 [data-theme=light]:border-slate-100 shadow-2xl"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                    absolute -bottom-2 -right-2 
                                    bg-violet-500 hover:scale-110
                                    p-3 rounded-2xl cursor-pointer 
                                    transition-all duration-200 shadow-xl
                                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                `}
                            >
                                <Camera className="size-5 text-white" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <h2 className="text-2xl font-black mb-1 leading-tight text-main">{authUser?.fullName}</h2>
                        <p className="text-muted font-light mb-8">{authUser?.email}</p>

                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/10 rounded-full w-fit mx-auto">
                            <ShieldCheck className="size-4 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Verified Account</span>
                        </div>
                    </div>

                    <div className="panel-card p-6 flex items-center gap-4 bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200">
                        <div className="size-12 rounded-xl bg-slate-800 [data-theme=light]:bg-slate-100 flex items-center justify-center shadow-inner">
                            <Calendar className="size-5 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Since</p>
                            <p className="font-bold text-main text-lg">{new Date(authUser.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                    <div className="panel-card p-10 bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="size-12 rounded-xl bg-slate-800 [data-theme=light]:bg-slate-100 flex items-center justify-center shadow-lg">
                                <Sparkles className="size-6 text-violet-400" />
                            </div>
                            <h2 className="text-3xl font-black leading-tight text-main">Identity Details</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3 text-left">
                                <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
                                <div className="p-5 bg-slate-800/50 [data-theme=light]:bg-slate-50 border border-white/5 [data-theme=light]:border-slate-200 rounded-2xl text-xl font-bold text-main">
                                    {authUser?.fullName}
                                </div>
                            </div>

                            <div className="space-y-3 text-left">
                                <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
                                <div className="p-5 bg-slate-800/50 [data-theme=light]:bg-slate-50 border border-white/5 [data-theme=light]:border-slate-200 rounded-2xl text-xl font-bold text-main">
                                    {authUser?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 [data-theme=light]:border-slate-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted font-light">Account Status</span>
                                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                                    <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
