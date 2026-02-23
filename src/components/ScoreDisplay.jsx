const ScoreDisplay = ({ score }) => {
    const getColor = (s) => {
        if (s >= 90) return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
        if (s >= 50) return "text-amber-400 border-amber-500/20 bg-amber-500/5";
        return "text-red-400 border-red-500/20 bg-red-500/5";
    };

    const colorClass = getColor(score);

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className={`relative size-56 rounded-[3rem] border-2 flex flex-col items-center justify-center ${colorClass} bg-slate-800 shadow-3xl transition-all duration-500`}>
                <span className="text-8xl font-black tracking-tighter leading-none mb-2">
                    {score}
                </span>
                <span className="text-xs uppercase font-black tracking-[0.3em] opacity-40">
                    Performance
                </span>
            </div>

            <div className="mt-10 text-center">
                <h3 className="text-2xl font-black text-white/90 tracking-tight">
                    Website <span className="text-gradient">Health Score</span>
                </h3>
            </div>
        </div>
    );
};

export default ScoreDisplay;
