import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Send, Mail, Sparkles, Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const SupportPage = () => {
    const { authUser } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: authUser?.fullName || "",
        email: authUser?.email || "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axiosInstance.post("/support/message", formData);
            toast.success("Support message sent!");
            setSubmitted(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
                <div className="inline-flex size-24 items-center justify-center rounded-full bg-emerald-500/10 mb-8 border border-emerald-500/10">
                    <Check className="size-12 text-emerald-400" />
                </div>
                <h1 className="text-5xl font-black mb-6 tracking-tight text-main">
                    Thank <span className="text-gradient">You!</span>
                </h1>
                <p className="text-muted text-xl font-light leading-relaxed mb-10">
                    Your message has been received. Our team will review your request and get back to you at <strong>{formData.email}</strong> as soon as possible.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary h-14 px-10 rounded-2xl shadow-xl shadow-violet-500/20"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="text-center mb-16">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-violet-500/10 [data-theme=light]:bg-violet-500/5 mb-6 border border-violet-500/10">
                    <MessageSquare className="size-8 text-violet-400" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-main">
                    How can we <span className="text-gradient">help?</span>
                </h1>
                <p className="text-muted text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Have a question or suggestion? Our team is here to help you optimize your web presence.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    {[
                        { icon: Mail, title: "Email Us", desc: "support@sitecheck.ai", label: "Drop us a line" },
                        { icon: Sparkles, title: "AI Assistant", desc: "Available 24/7", label: "Instant answers" },
                    ].map((item, i) => (
                        <div key={i} className="panel-card p-8 group text-left bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl">
                            <div className="size-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 border border-violet-500/10 group-hover:border-violet-500/30 transition-colors">
                                <item.icon className="size-6 text-violet-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-main">{item.title}</h3>
                            <p className="text-main mb-1 font-medium">{item.desc}</p>
                            <p className="text-muted text-sm font-light">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-2 panel-card p-8 md:p-10 bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-medium ml-1 text-main">Your Name</label>
                                <input
                                    type="text"
                                    className="input w-full h-12"
                                    placeholder="Sahil"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-medium ml-1 text-main">Email Address</label>
                                <input
                                    type="email"
                                    className="input w-full h-12"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-sm font-medium ml-1 text-main">Subject</label>
                            <input
                                type="text"
                                className="input w-full h-12"
                                placeholder="Analysis Question"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-sm font-medium ml-1 text-main">Message</label>
                            <textarea
                                className="textarea w-full h-40 pt-4"
                                placeholder="How can we assist you today?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full h-14 gap-3 text-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="size-6 animate-spin" />
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send className="size-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
