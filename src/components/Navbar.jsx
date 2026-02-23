import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Sparkles, Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { to: "/settings", icon: Settings, label: "Settings" },
        { to: "/support", icon: MessageSquare, label: "Support" },
    ];

    if (authUser) {
        navLinks.unshift({ to: "/", icon: LayoutDashboard, label: "Dashboard" });
        navLinks.push({ to: "/profile", icon: User, label: "Profile" });
    }

    return (
        <header className="fixed w-full top-0 z-50 bg-slate-950/90 [data-theme=light]:bg-white/90 border-b border-white/5 [data-theme=light]:border-slate-200 shadow-2xl backdrop-blur-md transition-colors">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    to="/developer"
                    className="flex items-center gap-2.5 hover:opacity-80 transition-all group"
                    title="Click to see developer"
                >
                    <div className="w-10 h-10 rounded-xl bg-slate-800 [data-theme=light]:bg-slate-100 border border-white/5 [data-theme=light]:border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                        <Sparkles className="w-5 h-5 text-violet-400" />
                    </div>
                    <h1 className="text-2xl font-black text-white [data-theme=light]:text-slate-900 tracking-tight">Site<span className="text-gradient">Check</span></h1>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`btn btn-ghost btn-sm gap-2 hover:bg-slate-800 [data-theme=light]:hover:bg-slate-100 transition-all ${location.pathname === link.to ? 'bg-slate-800 [data-theme=light]:bg-slate-100 text-violet-400' : 'text-slate-400 [data-theme=light]:text-slate-600 hover:text-white [data-theme=light]:hover:text-slate-900'
                                }`}
                        >
                            <link.icon className="w-4 h-4" />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                    {authUser && (
                        <button
                            onClick={logout}
                            className="btn btn-sm btn-ghost text-red-400 hover:bg-red-400/5 gap-2 ml-2 transition-all font-bold"
                        >
                            <LogOut className="size-4" />
                            <span className="hidden lg:inline">Logout</span>
                        </button>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 hover:bg-white/5 [data-theme=light]:hover:bg-slate-100 rounded-lg transition-colors text-slate-400 [data-theme=light]:text-slate-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <nav
                    className="md:hidden absolute top-16 left-0 w-full bg-slate-950 [data-theme=light]:bg-white border-b border-white/5 [data-theme=light]:border-slate-200 py-6 flex flex-col gap-2 px-4 shadow-3xl"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 [data-theme=light]:hover:bg-slate-100 transition-all ${location.pathname === link.to ? 'bg-slate-800 [data-theme=light]:bg-slate-100 text-violet-400' : 'text-slate-400 [data-theme=light]:text-slate-600'
                                }`}
                        >
                            <link.icon className="w-6 h-6" />
                            <span className="font-bold text-lg">{link.label}</span>
                        </Link>
                    ))}
                    {authUser && (
                        <button
                            onClick={() => {
                                logout();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-400/10 w-full text-left transition-all font-bold text-lg"
                        >
                            <LogOut className="size-6" />
                            <span>Logout</span>
                        </button>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Navbar;
