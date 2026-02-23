import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Sparkles, Mail, Shield, Globe, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-white/5 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2.5 mb-6 group">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                <Sparkles className="w-5 h-5 text-violet-400" />
                            </div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Site<span className="text-gradient">Check</span></h1>
                        </Link>
                        <p className="text-slate-400 text-sm font-light leading-relaxed">
                            Premium website analysis and performance tracking. Simple, unique, and powerful.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/analyze" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">New Analysis</Link></li>
                            <li><Link to="/dashboard" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">Dashboard</Link></li>
                            <li><Link to="/developer" className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-semibold">Developer</Link></li>
                            <li><Link to="/settings" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">Style Guide</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
                        <ul className="space-y-4">
                            <li><Link to="/support" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">Help Center</Link></li>
                            <li><Link to="/support" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">Contact Us</Link></li>
                            <li><Link to="/support" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">System Status</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Connect</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="https://github.com/sahillll0/" target="_blank" rel="noopener noreferrer" className="size-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all shadow-lg hover:-translate-y-1">
                                <Github className="size-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/sahil-tippe-b20766284/" target="_blank" rel="noopener noreferrer" className="size-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all shadow-lg hover:-translate-y-1">
                                <Linkedin className="size-5" />
                            </a>
                            <a href="https://www.instagram.com/sahillllll_00/" target="_blank" rel="noopener noreferrer" className="size-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all shadow-lg hover:-translate-y-1">
                                <Instagram className="size-5" />
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest font-bold">
                                <Mail className="size-3" />
                                <span>hello@sitecheck.ai</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-xs font-medium">
                        &copy; {new Date().getFullYear()} SiteCheck AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-full">
                            <Shield className="size-3 text-violet-400" />
                            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Enterprise Secured</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Globe className="size-4" />
                            <span className="text-xs">EN-IND</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
