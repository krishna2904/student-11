import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import MessageCenter from "./MessageCenter";
import AnnouncementBoard from "./AnnouncementBoard";
import CollaborationSpace from "./CollaborationSpace";
import { MessageSquare, Megaphone, Users } from "lucide-react";

interface CommunicationHubProps {
  activeTab?: string;
  userRole?: "admin" | "member" | "organizer";
}

const CommunicationHub: React.FC<CommunicationHubProps> = ({
  activeTab = "messages",
  userRole = "admin",
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  return (
    // this is krishna
    <div className="w-full h-full bg-gradient-to-br from-white via-fuchsia-50/20 to-violet-50/20 p-4 rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Communication Hub</h1>
        <p className="text-muted-foreground">
          Connect with members, view announcements, and collaborate with your
          team
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/50 border border-fuchsia-100">
            <TabsTrigger
              value="messages"
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              <Megaphone className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="collaboration"
              className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              Collaboration
            </TabsTrigger>
          </TabsList>

          {currentTab === "messages" && (
            <Button variant="outline" size="sm">
              New Message
            </Button>
          )}
          {currentTab === "announcements" && userRole === "admin" && (
            <Button variant="outline" size="sm">
              New Announcement
            </Button>
          )}
          {currentTab === "collaboration" && (
            <Button variant="outline" size="sm">
              New Space
            </Button>
          )}
        </div>

        <div className="mt-2 h-[calc(100vh-220px)]">
          <TabsContent value="messages" className="h-full">
            <MessageCenter />
          </TabsContent>

          <TabsContent value="announcements" className="h-full">
            <AnnouncementBoard userRole={userRole} />
          </TabsContent>

          <TabsContent value="collaboration" className="h-full">
            <CollaborationSpace />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CommunicationHub;
