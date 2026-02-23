import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnalyzeStore } from "../store/useAnalyzeStore";
import { Search, Globe, Loader2, Sparkles, Shield, Rocket, MessageSquare } from "lucide-react";

const NewAnalysisPage = () => {
    const [url, setUrl] = useState("");
    const { analyzeWebsite, isAnalyzing } = useAnalyzeStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        try {
            const report = await analyzeWebsite(url);
            navigate(`/report/${report._id}`);
        } catch {
            // Error handled by store/toast
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="panel-card p-10 md:p-16 text-center shadow-3xl bg-slate-900 [data-theme=light]:bg-white">
                    <div className="inline-flex size-24 items-center justify-center rounded-[2.5rem] bg-slate-800 [data-theme=light]:bg-slate-100 mb-10 border border-white/5 [data-theme=light]:border-slate-200">
                        <Globe className="size-12 text-violet-400" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white [data-theme=light]:text-slate-900">
                        Analyze <span className="text-gradient">Website</span>
                    </h1>
                    <p className="text-slate-400 [data-theme=light]:text-slate-500 text-lg mb-12 font-light max-w-md mx-auto">
                        Enter a URL to unlock deep insights into performance, SEO, and security.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="size-6 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                            </div>
                            <input
                                type="url"
                                className="input w-full h-20 pl-16 text-xl border-white/10 [data-theme=light]:border-slate-200 focus:border-violet-500/40 bg-slate-800 [data-theme=light]:bg-slate-50 text-white [data-theme=light]:text-slate-900 placeholder:text-slate-500"
                                placeholder="https://yourwebsite.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isAnalyzing}
                            className="btn btn-primary w-full h-16 text-xl gap-3 shadow-2xl shadow-violet-500/10"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="size-6 animate-spin" />
                                    <span>Scanning Assets...</span>
                                </>
                            ) : (
                                <>
                                    <span>Start Free Analysis</span>
                                    <Rocket className="size-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-12 border-t border-white/5 [data-theme=light]:border-slate-200 grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { icon: Shield, text: "Privacy Focused" },
                            { icon: Sparkles, text: "AI Powered" },
                            { icon: Rocket, text: "Lightning Fast" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <item.icon className="size-5 text-slate-500" />
                                <span className="text-xs text-slate-400 [data-theme=light]:text-slate-500 font-medium uppercase tracking-wider">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAnalysisPage;
