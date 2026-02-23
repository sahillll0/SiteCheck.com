import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    messages: [
        { role: "assistant", content: "Hi! I'm your SiteCheck Assistant. Need help understanding your reports or optimizing your site?" }
    ],
    isAsking: false,

    askQuestion: async (message) => {
        const { messages } = get();

        // Add user message to UI immediately
        const newUserMessage = { role: "user", content: message };
        set({ messages: [...messages, newUserMessage], isAsking: true });

        try {
            const res = await axiosInstance.post("/chatbot/ask", {
                message,
                chatHistory: messages.slice(-10) // Send last 10 messages for context
            });

            const assistantReply = { role: "assistant", content: res.data.reply };
            set({ messages: [...get().messages, assistantReply] });
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to get AI response";
            toast.error(errorMsg);
        } finally {
            set({ isAsking: false });
        }
    },

    clearChat: () => {
        set({
            messages: [{ role: "assistant", content: "Hi! I'm your SiteCheck Assistant. Need help understanding your reports or optimizing your site?" }]
        });
    }
}));
