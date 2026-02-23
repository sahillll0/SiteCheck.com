import { Search, Loader2, Sparkles } from "lucide-react";

const UrlInputForm = ({ url, setUrl, onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6 w-full max-w-xl mx-auto">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="size-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input
                    type="url"
                    id="url"
                    className="input w-full h-14 pl-12 text-lg border-white/10 focus:border-violet-500/50 bg-white/5 placeholder:text-slate-600"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full h-14 text-lg gap-2 shadow-lg shadow-violet-500/20"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>Analyzing Site...</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="size-5" />
                        <span>Run SEO Audit</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default UrlInputForm;
