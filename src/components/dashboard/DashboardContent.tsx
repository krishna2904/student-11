import React, { useState } from "react";
import WidgetGrid from "./WidgetGrid";
import StatsWidget from "./widgets/StatsWidget";
import ChapterOverviewWidget from "./widgets/ChapterOverviewWidget";
import EventsWidget from "./widgets/EventsWidget";
import TasksWidget from "./widgets/TasksWidget";
import AIInsightsWidget from "./widgets/AIInsightsWidget";

interface DashboardContentProps {
  userRole?: "admin" | "member" | "organizer";
  selectedChapterId?: string;
}

const DashboardContent = ({
  userRole = "member",
  selectedChapterId = "ch1",
}: DashboardContentProps) => {
  const [activeChapterId, setActiveChapterId] = useState(selectedChapterId);

  // Handle chapter selection
  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
  };

  // Handle view all chapters
  const handleViewAllChapters = () => {
    console.log("View all chapters");
    // Navigation logic would go here
  };

  // Handle event registration
  const handleEventRegister = (eventId: string) => {
    console.log(`Register for event: ${eventId}`);
    // Registration logic would go here
  };

  // Handle view all events
  const handleViewAllEvents = () => {
    console.log("View all events");
    // Navigation logic would go here
  };

  // Render different layouts based on user role
  const renderRoleBasedContent = () => {
    switch (userRole) {
      case "admin":
        return renderAdminDashboard();
      case "organizer":
        return renderOrganizerDashboard();
      case "member":
      default:
        return renderMemberDashboard();
    }
  };

  // Admin dashboard layout
  const renderAdminDashboard = () => (
    <WidgetGrid columns={3} gap="lg" userRole="admin">
      <div className="col-span-3">
        <StatsWidget />
      </div>
      <div className="col-span-2 row-span-2">
        <ChapterOverviewWidget
          selectedChapterId={activeChapterId}
          onSelectChapter={handleSelectChapter}
          onViewAllChapters={handleViewAllChapters}
        />
      </div>
      <div className="row-span-2">
        <TasksWidget title="Admin Tasks" />
      </div>
      <div className="col-span-2">
        <AIInsightsWidget />
      </div>
      <div className="col-span-1">
        <EventsWidget
          title="Organization Events"
          onRegister={handleEventRegister}
          onViewAll={handleViewAllEvents}
        />
      </div>
    </WidgetGrid>
  );

  // Member dashboard layout
  const renderMemberDashboard = () => (
    <WidgetGrid columns={3} gap="md" userRole="member">
      <div className="col-span-3">
        <StatsWidget />
      </div>
      <div className="col-span-1 row-span-2">
        <EventsWidget
          onRegister={handleEventRegister}
          onViewAll={handleViewAllEvents}
        />
      </div>
      <div className="col-span-1 row-span-2">
        <TasksWidget />
      </div>
      <div className="col-span-1 row-span-2">
        <ChapterOverviewWidget
          selectedChapterId={activeChapterId}
          onSelectChapter={handleSelectChapter}
          onViewAllChapters={handleViewAllChapters}
        />
      </div>
      <div className="col-span-3">
        <AIInsightsWidget />
      </div>
    </WidgetGrid>
  );

  // Event organizer dashboard layout
  const renderOrganizerDashboard = () => (
    <WidgetGrid columns={3} gap="md" userRole="organizer">
      <div className="col-span-3">
        <StatsWidget />
      </div>
      <div className="col-span-2">
        <EventsWidget
          title="Managed Events"
          description="Events you are organizing"
          showRegisterButton={false}
          onViewAll={handleViewAllEvents}
        />
      </div>
      <div className="col-span-1 row-span-2">
        <TasksWidget title="Event Tasks" />
      </div>
      <div className="col-span-2">
        <AIInsightsWidget
          title="Event Insights"
          description="AI recommendations for your events"
        />
      </div>
    </WidgetGrid>
  );

  return (
    // this is krishna
    <div className="w-full h-full p-4 bg-gray-50 dark:bg-gray-900 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {userRole === "admin"
            ? "Admin Dashboard"
            : userRole === "organizer"
              ? "Event Organizer Dashboard"
              : "Member Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {userRole === "admin"
            ? "Manage your organization and chapters"
            : userRole === "organizer"
              ? "Organize and manage events"
              : "View your chapter activity and upcoming events"}
        </p>
      </div>

      {renderRoleBasedContent()}
    </div>
  );
};

export default DashboardContent;
