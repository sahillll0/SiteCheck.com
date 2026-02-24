import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAnalyzeStore } from "../store/useAnalyzeStore";
import {
    ArrowLeft, CheckCircle, AlertTriangle, FileText, Smartphone, Shield, Share2, Search, Layout, Type, Zap, Loader2, Rocket, Code, Box, Globe, Image, Download
} from "lucide-react";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ScoreDisplay from "../components/ScoreDisplay";

const MetricItem = ({ label, value, icon: IconComponent, color }) => {
    const Icon = IconComponent;
    return (
        <div className="flex items-center justify-between p-5 bg-slate-900 [data-theme=light]:bg-slate-50 rounded-2xl border border-white/5 [data-theme=light]:border-slate-200 hover:border-violet-500/20 transition-all shadow-sm">
            <div className="flex items-center gap-4 text-left">
                <div className={`size-12 rounded-xl flex items-center justify-center bg-slate-800 [data-theme=light]:bg-white`}>
                    <Icon className={`size-6 ${color.replace("bg-", "text-").replace("-500", "-400")}`} />
                </div>
                <span className="text-sm font-bold text-muted uppercase tracking-wide">{label}</span>
            </div>
            <span className="text-lg font-black text-main">{value || "N/A"}</span>
        </div>
    );
};

const Section = ({ title, icon: IconComponent, children }) => {
    const IconComp = IconComponent;
    return (
        <div className="panel-card overflow-hidden mb-8 p-0 bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 [data-theme=light]:border-slate-200 bg-slate-950/30 [data-theme=light]:bg-slate-50 flex items-center gap-4">
                <div className="size-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <IconComp className="size-5 text-violet-400" />
                </div>
                <h3 className="font-black text-xl tracking-tight text-main">{title}</h3>
            </div>
            <div className="p-8">
                {children}
            </div>
        </div>
    );
};

const ReportDetailPage = () => {
    const { id } = useParams();
    const { getReport, currentReport, isFetchingReports } = useAnalyzeStore();
    const [activeTab, setActiveTab] = useState("overview");
    const [isExportingPDF, setIsExportingPDF] = useState(false);
    const reportRef = useRef(null);

    useEffect(() => {
        if (id) {
            getReport(id);
        }
    }, [id, getReport]);

    if (isFetchingReports || !currentReport) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
                <Loader2 className="size-12 animate-spin text-violet-500" />
            </div>
        );
    }

    const { url, domain, score, metrics, issues, suggestions, analyzedAt } = currentReport;

    const tabs = [
        { id: "overview", label: "Overview", icon: Layout },
        { id: "seo", label: "SEO", icon: Search },
        { id: "performance", label: "Performance", icon: Zap },
        { id: "social", label: "Social", icon: Share2 },
        { id: "security", label: "Security", icon: Shield },
    ];

    const handleExportPDF = async () => {
        console.log("PDF Export initiated...");
        if (!reportRef.current) {
            console.error("Report reference is null");
            toast.error("Report content not found");
            return;
        }

        setIsExportingPDF(true);
        const toastId = toast.loading("Preparing your PDF report...");

        try {
            console.log("Capturing canvas with html2canvas...");
            // Wait for any pending renders
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#0f172a",
                logging: true, // Enable logging for debugging
                allowTaint: true,
                onclone: (clonedDoc) => {
                    // Hide elements that shouldn't be in PDF
                    clonedDoc.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');
                }
            });

            if (!canvas) {
                throw new Error("Canvas generation failed");
            }
            console.log("Canvas generated successfully");

            const imgData = canvas.toDataURL("image/png");
            console.log("Image data generated");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
            const fileName = `sitecheck-report-${domain || "analysis"}.pdf`;
            console.log(`Saving PDF as ${fileName}`);
            pdf.save(fileName);

            toast.success("PDF Report downloaded!", { id: toastId });
        } catch (error) {
            console.error("PDF Export error details:", error);
            toast.error(`Export failed: ${error.message || "Unknown error"}`, { id: toastId });
        } finally {
            setIsExportingPDF(false);
        }
    };

    return (
        <div ref={reportRef} className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5 [data-theme=light]:border-slate-200">
                    <div className="space-y-4">
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 [data-theme=light]:text-slate-500 hover:text-violet-400 transition-colors text-sm font-medium group no-print">
                            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Reports
                        </Link>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-main">
                                {domain || url}
                            </h1>
                            <div className="flex items-center gap-4 text-slate-400 [data-theme=light]:text-slate-500 font-light text-sm">
                                <span className="flex items-center gap-1.5">
                                    <Globe className="size-4" />
                                    {new URL(url).hostname}
                                </span>
                                <span>•</span>
                                <span>{new Date(analyzedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 no-print">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn text-amber-50 [data-theme=light]:text-slate-700 bg-white/5 [data-theme=light]:bg-slate-100 hover:bg-white/10 [data-theme=light]:hover:bg-slate-200 border-white/10 [data-theme=light]:border-slate-200 gap-2 h-12 px-6"
                        >
                            <Globe className="size-4" />
                            Live Site
                        </a>
                        <button
                            onClick={handleExportPDF}
                            disabled={isExportingPDF}
                            className="btn btn-primary h-12 px-8 gap-3 shadow-xl shadow-violet-500/20"
                        >
                            {isExportingPDF ? (
                                <Loader2 className="size-5 animate-spin" />
                            ) : (
                                <Download className="size-5" />
                            )}
                            <span className="font-bold uppercase tracking-wide text-xs">Download PDF</span>
                        </button>
                    </div>
                </div>

                {/* Quick Navigation */}
                <div className="flex flex-wrap gap-4 mb-12 overflow-x-auto pb-2 scrollbar-none no-print">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all border font-bold ${activeTab === tab.id
                                    ? "bg-violet-600 border-violet-500 text-white shadow-xl shadow-violet-500/10"
                                    : "bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200 text-muted hover:text-white [data-theme=light]:hover:text-slate-900 hover:bg-slate-800 [data-theme=light]:hover:bg-slate-50"
                                }`}
                        >
                            <tab.icon className="size-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div key={activeTab}>
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-4 space-y-6">
                                <div className="panel-card p-6 bg-slate-900 [data-theme=light]:bg-white border-white/10 [data-theme=light]:border-slate-200 shadow-3xl">
                                    <ScoreDisplay score={score} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="panel-card p-8 text-center bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200">
                                        <p className="text-muted text-xs font-bold uppercase tracking-widest mb-2">Critical Issues</p>
                                        <p className="text-4xl font-black text-red-500 leading-none">{issues.length}</p>
                                    </div>
                                    <div className="panel-card p-8 text-center bg-slate-900 [data-theme=light]:bg-white border-white/5 [data-theme=light]:border-slate-200">
                                        <p className="text-muted text-xs font-bold uppercase tracking-widest mb-2">Overall Perf</p>
                                        <p className={`text-4xl font-black leading-none ${score >= 90 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                                            {score >= 80 ? 'A+' : score >= 60 ? 'B' : 'F'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-8 space-y-8">
                                <Section title="Critical Findings" icon={AlertTriangle}>
                                    {issues.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="size-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                                <CheckCircle className="size-8 text-emerald-400" />
                                            </div>
                                            <h4 className="text-xl font-bold mb-1 text-main">No critical issues!</h4>
                                            <p className="text-muted font-light">Your site's core foundation is solid.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {issues.slice(0, 4).map((issue, idx) => (
                                                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                                                    <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
                                                    <p className="text-sm text-main leading-relaxed font-light">{issue}</p>
                                                </div>
                                            ))}
                                            {issues.length > 4 && (
                                                <button onClick={() => setActiveTab("seo")} className="w-full py-4 text-sm font-bold text-slate-500 hover:text-violet-400 transition-colors no-print">
                                                    View all {issues.length} issues →
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </Section>

                                <Section title="Optimization Roadmap" icon={Rocket}>
                                    <div className="space-y-4">
                                        {suggestions.slice(0, 4).map((suggestion, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10">
                                                <div className="size-6 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-sm text-main leading-relaxed font-light">{suggestion}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            </div>
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === "seo" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Section title="Identity & Discovery" icon={Search}>
                                <div className="space-y-3">
                                    <MetricItem label="Title Precision" value={`${metrics.titleLength || 0} characters`} icon={Type} color="bg-blue-500" />
                                    <MetricItem label="Description Quality" value={`${metrics.metaDescriptionLength || 0} characters`} icon={FileText} color="bg-indigo-500" />
                                    <MetricItem label="Canonical Status" value={metrics.canonical ? "Properly Set" : "Missing"} icon={Box} color={metrics.canonical ? "bg-emerald-500" : "bg-red-500"} />
                                    <MetricItem label="Indexing Control" value={metrics.robots || "Default"} icon={Box} color="bg-amber-500" />
                                </div>
                            </Section>
                            <Section title="Content Architecture" icon={Type}>
                                <div className="space-y-3">
                                    <MetricItem label="Top Level Headings (H1)" value={metrics.h1Count || 0} icon={Type} color="bg-violet-500" />
                                    <MetricItem label="Main Sections (H2)" value={metrics.h2Count || 0} icon={Type} color="bg-violet-500" />
                                    <MetricItem label="Subsections (H3)" value={metrics.h3Count || 0} icon={Type} color="bg-violet-500" />
                                </div>
                            </Section>
                        </div>
                    )}

                    {/* Performance Tab */}
                    {activeTab === "performance" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Section title="Asset Efficiency" icon={Box}>
                                <div className="space-y-3">
                                    <MetricItem label="Total Page Weight" value={metrics.pageSize} icon={FileText} color="bg-blue-500" />
                                    <MetricItem label="Resource Density" value={metrics.resourceCount} icon={Box} color="bg-amber-500" />
                                    <MetricItem label="Semantic Ratio" value={`${metrics.textRatio || 0}%`} icon={Code} color="bg-emerald-500" />
                                </div>
                            </Section>
                            <Section title="Inventory" icon={Code}>
                                <div className="space-y-3">
                                    <MetricItem label="Image Assets" value={metrics.imageCount} icon={Image} color="bg-pink-500" />
                                    <MetricItem label="Script Modules" value={metrics.scriptCount} icon={Code} color="bg-amber-500" />
                                    <MetricItem label="Stylesheets" value={metrics.styleCount || 0} icon={Layout} color="bg-cyan-500" />
                                </div>
                            </Section>
                        </div>
                    )}

                    {/* Social Tab */}
                    {activeTab === "social" && (
                        <div className="max-w-4xl mx-auto">
                            <Section title="Share Preview (Open Graph)" icon={Share2}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-4">
                                        <MetricItem label="Meta Title" value={metrics.ogTitle ? "Active" : "Incomplete"} icon={Type} color={metrics.ogTitle ? "bg-emerald-500" : "bg-red-500"} />
                                        <MetricItem label="Meta Description" value={metrics.ogDescription ? "Active" : "Incomplete"} icon={FileText} color={metrics.ogDescription ? "bg-emerald-500" : "bg-red-500"} />
                                        <MetricItem label="Cover Illustration" value={metrics.ogImage ? "Detected" : "Missing"} icon={Image} color={metrics.ogImage ? "bg-emerald-500" : "bg-red-500"} />
                                        <MetricItem label="Twitter Integration" value={metrics.twitterCard || "None"} icon={Share2} color={metrics.twitterCard ? "bg-blue-400" : "bg-red-500"} />
                                    </div>

                                    <div className="glass-card p-0 overflow-hidden shadow-2xl border-white/10 group">
                                        <div className="relative h-56 bg-white/5 [data-theme=light]:bg-slate-100 flex items-center justify-center overflow-hidden">
                                            {metrics.ogImage ? (
                                                <img src={metrics.ogImage} alt="Social Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            ) : (
                                                <Globe className="size-16 text-slate-800 [data-theme=light]:text-slate-300" />
                                            )}
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 [data-theme=light]:bg-white/80 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white/80 [data-theme=light]:text-slate-900/80">
                                                Live Preview
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white/5 [data-theme=light]:bg-white">
                                            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">{domain}</p>
                                            <h4 className="font-black text-lg mb-2 leading-tight text-main/90">{metrics.ogTitle || "Identity Undefined"}</h4>
                                            <p className="text-sm text-muted line-clamp-2 font-light">{metrics.ogDescription || "Enhance your web identity by adding a custom meta description for social platforms."}</p>
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Section title="Trust & Encryption" icon={Shield}>
                                <div className="space-y-3">
                                    <MetricItem label="SSL Protocols" value={metrics.https ? "Verified" : "Unsecured"} icon={Shield} color={metrics.https ? "bg-emerald-500" : "bg-red-500"} />
                                </div>
                            </Section>
                            <Section title="Mobile Adaptation" icon={Smartphone}>
                                <div className="space-y-3">
                                    <MetricItem label="Viewport Scalability" value={metrics.viewport ? "Responsive" : "Fixed"} icon={Smartphone} color={metrics.viewport ? "bg-emerald-500" : "bg-red-500"} />
                                </div>
                            </Section>
                        </div>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print { display: none !important; }
                }
            `}} />
        </div>
    );
};

export default ReportDetailPage;
