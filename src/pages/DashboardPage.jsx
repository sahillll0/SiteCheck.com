
import { useEffect } from "react";
import { useAnalyzeStore } from "../store/useAnalyzeStore";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2, ExternalLink, Calendar, AlertTriangle, FileText, Layout, TrendingUp } from "lucide-react";

const DashboardPage = () => {
    const { fetchReports, reports, isFetchingReports, deleteReport } = useAnalyzeStore();

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this report?")) {
            await deleteReport(id);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getScoreColor = (score) => {
        if (score >= 90) return "text-emerald-400";
        if (score >= 50) return "text-amber-400";
        return "text-red-400";
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="text-left">
                    <h1 className="text-4xl font-black tracking-tight mb-2 text-main">
                        Your <span className="text-gradient">Dashboard</span>
                    </h1>
                    <p className="text-muted font-light">Monitor your performance across the web.</p>
                </div>
                <Link
                    to="/analyze"
                    className="btn btn-primary h-14 px-8 shadow-xl shadow-violet-500/20 group w-full md:w-auto"
                >
                    <PlusCircle className="size-5 group-hover:rotate-90 transition-transform" />
                    <span>New Analysis</span>
                </Link>
            </div>

            {/* Quick Stats */}
            {!isFetchingReports && reports?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
                    {[
                        { label: "Total Reports", value: reports.length, icon: Layout, color: "text-blue-400" },
                        { label: "Avg. Score", value: Math.round(reports.reduce((acc, r) => acc + r.score, 0) / reports.length), icon: TrendingUp, color: "text-violet-400" },
                        { label: "Success Rate", value: "92%", icon: ExternalLink, color: "text-emerald-400" },
                        { label: "Critical Issues", value: reports.reduce((acc, r) => acc + (r.issues?.length || 0), 0), icon: AlertTriangle, color: "text-red-400" }
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="panel-card p-6 flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-slate-800 [data-theme=light]:bg-slate-100 flex items-center justify-center border border-white/5 [data-theme=light]:border-slate-200">
                                    <Icon className={`size-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-muted text-sm font-light">{stat.label}</p>
                                    <p className="text-2xl font-bold text-main">{stat.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {isFetchingReports ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <div className="size-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                    <p className="text-slate-400 animate-pulse">Fetching your data...</p>
                </div>
            ) : !reports || reports.length === 0 ? (
                <div className="panel-card py-24 text-center border-dashed border-white/10 [data-theme=light]:border-slate-200 bg-slate-900 [data-theme=light]:bg-white">
                    <div className="size-20 rounded-3xl bg-slate-800 [data-theme=light]:bg-slate-100 flex items-center justify-center mx-auto mb-8">
                        <FileText className="size-10 text-slate-600" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-main">No Analysis Yet</h3>
                    <p className="text-muted mb-12 max-w-md mx-auto font-light text-lg">
                        Simple, fast reports for your website performance. Start your first analysis today.
                    </p>
                    <Link to="/analyze" className="btn btn-primary h-16 px-12 text-lg">
                        Start Free Analysis
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reports.map((report) => (
                        <div key={report._id} className="group">
                            <Link to={`/report/${report._id}`} className="block h-full">
                                <div className="panel-card h-full p-8 relative overflow-hidden flex flex-col hover:border-violet-500/30 bg-slate-900 [data-theme=light]:bg-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex-1 min-w-0 pr-4 text-left">
                                            <h3 className="text-xl font-bold truncate group-hover:text-violet-400 transition-colors text-main">
                                                {report.domain || report.url}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-400 [data-theme=light]:text-slate-500 text-sm mt-1">
                                                <Calendar className="size-3" />
                                                {formatDate(report.createdAt)}
                                            </div>
                                        </div>
                                        <div className={`size-14 rounded-2xl flex items-center justify-center text-xl font-black border bg-slate-800 [data-theme=light]:bg-slate-100 ${getScoreColor(report.score)} border-white/5 [data-theme=light]:border-slate-200 group-hover:border-white/10 transition-colors`}>
                                            {report.score}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 mt-auto">
                                        <div className="flex items-center gap-2 text-main">
                                            <FileText className="size-4 text-violet-400" />
                                            <span className="text-sm font-light">{report.metrics?.pageSize || "Unknown"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-main">
                                            <AlertTriangle className="size-4 text-amber-500" />
                                            <span className="text-sm font-light">{report.issues?.length || 0} Issues</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => handleDelete(e, report._id)}
                                        className="absolute bottom-6 right-6 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-10 md:opacity-0 group-hover:opacity-100"
                                        title="Delete Report"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>

                                    {/* Accent bar */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                                        <div
                                            className={`h-full transition-all duration-1000 ${report.score >= 90 ? 'bg-emerald-500' : report.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                            style={{ width: `${report.score}%` }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
