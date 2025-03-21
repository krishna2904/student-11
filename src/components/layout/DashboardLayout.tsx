import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardContent from "../dashboard/DashboardContent";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  userRole?: "admin" | "member" | "organizer";
  pageTitle?: string;
}

const DashboardLayout = ({
  children,
  userRole = "admin",
  pageTitle = "Dashboard",
}: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState("ch1");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle chapter selection
  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId);
  };

  return (
    // this is krishna
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-white via-fuchsia-50/30 to-violet-50/30">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        userRole={userRole}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header
          title={pageTitle}
          userRole={
            userRole === "admin"
              ? "Admin"
              : userRole === "organizer"
                ? "Event Organizer"
                : "Member"
          }
          userName={
            userRole === "admin"
              ? "Admin User"
              : userRole === "organizer"
                ? "Event Manager"
                : "Student Member"
          }
          userAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole}`}
        />

        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.main
            className="flex-1 overflow-auto p-6 bg-gradient-to-br from-white via-fuchsia-50/20 to-violet-50/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={selectedChapterId}
          >
            {children || (
              <DashboardContent
                userRole={userRole}
                selectedChapterId={selectedChapterId}
                onChapterSelect={handleChapterSelect}
              />
            )}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardLayout;
