import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAnalyzeStore = create((set, get) => ({
    reports: [],
    currentReport: null,
    isAnalyzing: false,
    isFetchingReports: false,
    error: null,

    analyzeUrl: async (url) => {
        set({ isAnalyzing: true, error: null });
        try {
            const res = await axiosInstance.post("/analyze", { url });
            set({ currentReport: res.data, isAnalyzing: false });
            toast.success("Analysis complete!");
            return res.data;
        } catch (error) {
            const message = error.response?.data?.message || "Analysis failed";
            set({ error: message, isAnalyzing: false });
            toast.error(message);
            throw error;
        }
    },

    fetchReports: async () => {
        set({ isFetchingReports: true, error: null });
        try {
            const res = await axiosInstance.get("/analyze");
            set({ reports: res.data, isFetchingReports: false });
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch reports";
            set({ error: message, isFetchingReports: false });
            toast.error(message);
        }
    },

    getReport: async (id) => {
        // First check if we have it in the list
        const existing = get().reports.find((r) => r._id === id);
        if (existing) {
            set({ currentReport: existing });
            return;
        }

        // If not, fetch it (requires backend endpoint /api/analyze/:id)
        set({ isFetchingReports: true });
        try {
            const res = await axiosInstance.get(`/analyze/${id}`);
            set({ currentReport: res.data, isFetchingReports: false });
        } catch (error) {
            set({ isFetchingReports: false });
            toast.error("Failed to load report");
        }
    },
    deleteReport: async (id) => {
        try {
            await axiosInstance.delete(`/analyze/${id}`);
            // Remove from local state
            set((state) => ({
                reports: state.reports.filter((r) => r._id !== id),
            }));
            toast.success("Report deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to delete report");
        }
    },
}));
