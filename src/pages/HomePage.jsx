import { Link } from "react-router-dom";
import { BarChart3, CheckCircle, Globe, Zap, ArrowRight, Layout, Sparkles, Shield, Rocket } from "lucide-react";

const HomePage = () => {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 px-4">
                <div className="container mx-auto text-center max-w-5xl">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
                            <Sparkles className="size-4 animate-pulse" />
                            <span>AI-Powered Web Insights</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight text-white [data-theme=light]:text-slate-900">
                            Elevate Your <br />
                            <span className="text-gradient">Web Presence</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-300 [data-theme=light]:text-slate-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                            Deep analysis for your website. Performance, SEO, and Accessibility results delivered instantly with actionable AI suggestions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link to="/signup" className="btn btn-primary btn-lg px-12 group h-16 text-lg w-full sm:w-auto">
                                Start Free Analysis
                                <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="btn btn-ghost btn-lg panel group border-white/5 h-16 text-lg w-full sm:w-auto transition-colors">
                                View Demo Report
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Stats */}
            <section className="py-20 px-4">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        { icon: Globe, title: "Global Reach", desc: "Optimize for users everywhere with comprehensive SEO audits.", color: "text-blue-400" },
                        { icon: Zap, title: "Speed First", desc: "Core Web Vitals and performance metrics that actually matter.", color: "text-amber-400" },
                        { icon: Shield, title: "Built Trust", desc: "Ensure accessibility and best practices for every visitor.", color: "text-emerald-400" }
                    ].map((feature, i) => (
                        <div key={i} className="panel-card group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 [data-theme=light]:bg-slate-100 flex items-center justify-center mb-6 border border-white/5 [data-theme=light]:border-slate-200 group-hover:border-white/20 transition-colors">
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-slate-300 [data-theme=light]:text-slate-600 leading-relaxed font-light">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Callout */}
            <section className="py-24 px-4 overflow-hidden">
                <div className="container mx-auto">
                    <div className="panel-card relative overflow-hidden p-8 md:p-16 border-white/5 bg-violet-500/5!">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-left">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    Stop Guessing. <br />
                                    <span className="text-violet-400">Start Knowing.</span>
                                </h2>
                                <p className="text-lg text-slate-400 [data-theme=light]:text-slate-500 mb-8 leading-relaxed font-light">
                                    Our AI doesn't just give you numbers. It provides detailed blueprints for improvement. Understand exactly why your site is lagging and how to fix it in minutes.
                                </p>
                                <div className="space-y-4 text-left">
                                    {[
                                        "Automated SEO optimization suggestions",
                                        "Detailed performance bottleneck analysis",
                                        "Accessibility compliance checklists",
                                        "Competitive benchmarking"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="size-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                                <CheckCircle className="size-4 text-emerald-400" />
                                            </div>
                                            <span className="text-slate-200 [data-theme=light]:text-slate-700 font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative hidden md:block">
                                <div className="aspect-square panel rounded-3xl border-white/10 flex items-center justify-center p-12 overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-tr from-violet-500/10 to-transparent animate-pulse" />
                                    <BarChart3 className="w-48 h-48 text-violet-400/40 -rotate-12 relative z-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-32 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to transform your site?</h2>
                    <p className="text-xl text-slate-400 [data-theme=light]:text-slate-500 mb-12 font-light">
                        Get your first report in less than 30 seconds. No setup required.
                    </p>
                    <Link to="/signup" className="btn btn-primary btn-lg px-16 group h-16 text-lg w-full sm:w-auto">
                        Analyze Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
