import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import NewAnalysisPage from "./pages/NewAnalysisPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import SupportPage from "./pages/SupportPage";
import DeveloperPage from "./pages/DeveloperPage";
import ChatAssistant from "./components/ChatAssistant";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme} className="min-h-screen bg-mesh relative overflow-hidden flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <main className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={authUser ? <DashboardPage /> : <HomePage />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

            {/* Analyzer Routes */}
            <Route path="/analyze" element={authUser ? <NewAnalysisPage /> : <Navigate to="/login" />} />
            <Route path="/report/:id" element={authUser ? <ReportDetailPage /> : <Navigate to="/login" />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/developer" element={<DeveloperPage />} />
          </Routes>
        </main>

        <Footer />
        <ChatAssistant />
      </div>

      <Toaster />
    </div>
  );
};

export default App;