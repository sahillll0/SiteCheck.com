import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Trash2, Bot, User, Loader2 } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const { messages, askQuestion, isAsking, clearChat } = useChatStore();
    const { authUser } = useAuthStore();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isAsking) return;

        const message = input;
        setInput("");
        await askQuestion(message);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[90vw] md:w-[400px] h-[500px] flex flex-col bg-slate-900 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 [data-theme=light]:border-slate-100 flex items-center justify-between bg-slate-950/50 [data-theme=light]:bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                                <Sparkles className="size-5 text-violet-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-main">SiteCheck Assistant</h3>
                                    <span className="px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-400 text-[10px] font-bold border border-violet-500/20">BETA</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-muted uppercase font-black tracking-widest">Active Now</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={clearChat}
                                className="p-2 hover:bg-white/5 [data-theme=light]:hover:bg-slate-200 rounded-xl text-muted transition-colors"
                                title="Clear Chat"
                            >
                                <Trash2 className="size-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/5 [data-theme=light]:hover:bg-slate-200 rounded-xl text-muted transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative">
                        {!authUser ? (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center bg-slate-950/40 [data-theme=light]:bg-white/40 backdrop-blur-md">
                                <div className="size-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-6">
                                    <Bot className="size-8 text-violet-400" />
                                </div>
                                <h4 className="text-xl font-bold mb-2">Login Required</h4>
                                <p className="text-muted text-sm mb-6">Please login to start chatting with your SiteCheck Assistant.</p>
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="btn btn-primary h-12 px-8 shadow-xl shadow-violet-500/20"
                                >
                                    Login Now
                                </Link>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === "user"
                                            ? "bg-violet-600 text-white"
                                            : "bg-slate-800 [data-theme=light]:bg-slate-100 text-violet-400"
                                            }`}>
                                            {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                                        </div>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-violet-500 text-white rounded-tr-none"
                                            : "bg-slate-800/50 [data-theme=light]:bg-slate-100/50 text-main rounded-tl-none border border-white/5"
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isAsking && (
                                    <div className="flex gap-3">
                                        <div className="size-8 rounded-lg bg-slate-800 [data-theme=light]:bg-slate-100 text-violet-400 flex items-center justify-center shrink-0">
                                            <Bot className="size-4" />
                                        </div>
                                        <div className="bg-slate-800/50 [data-theme=light]:bg-slate-100/50 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                            <Loader2 className="size-4 animate-spin text-muted" />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className={`p-4 border-t border-white/5 [data-theme=light]:border-slate-100 bg-slate-950/20 [data-theme=light]:bg-slate-50/20 ${!authUser ? "opacity-30 pointer-events-none" : ""}`}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={authUser ? "Ask about your site..." : "Login to chat"}
                                className="w-full bg-slate-800 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 focus:border-violet-500/50 rounded-2xl py-3 pl-4 pr-12 text-sm text-main transition-all outline-none"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isAsking || !authUser}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isAsking || !authUser}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 text-white rounded-xl transition-all shadow-lg shadow-violet-500/20"
                            >
                                <Send className="size-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Floating Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`size-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${isOpen
                    ? "bg-slate-800 [data-theme=light]:bg-white text-main border border-white/10"
                    : "bg-violet-600 text-white hover:scale-110 active:scale-95 shadow-violet-500/20"
                    }`}
            >
                {isOpen ? <X className="size-6" /> : <MessageSquare className="size-6" />}
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 size-4 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                )}
            </button>
        </div>
    );
};

export default ChatAssistant;
