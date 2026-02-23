
const MetricsCard = ({ title, value, icon: IconComponent, color }) => {
    const IconComp = IconComponent;
    return (
        <div className="panel-card p-6 flex items-center gap-5 group hover:border-violet-500/40 transition-all text-left bg-slate-900 shadow-xl">
            <div className={`size-14 rounded-2xl flex items-center justify-center bg-slate-800 border border-white/5 group-hover:border-white/10 transition-colors`}>
                <IconComp className={`size-7 ${color.replace("bg-", "text-").replace("-500", "-400")}`} />
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-black text-white tracking-tight">{value}</p>
            </div>
        </div>
    );
};

export default MetricsCard;
