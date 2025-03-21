import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  Archive,
  Trash2,
  Filter,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "../layout/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationProps {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "event" | "task" | "ai" | "message";
  archived: boolean;
}

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationProps[]>([
    {
      id: "1",
      title: "New member joined",
      description: "John Smith joined the Engineering chapter",
      time: "2 minutes ago",
      read: false,
      type: "info",
      archived: false,
    },
    {
      id: "2",
      title: "Event reminder",
      description: "Tech Talk starts in 1 hour",
      time: "1 hour ago",
      read: false,
      type: "event",
      archived: false,
    },
    {
      id: "3",
      title: "Task completed",
      description: "Website redesign task marked as complete",
      time: "3 hours ago",
      read: true,
      type: "task",
      archived: false,
    },
    {
      id: "4",
      title: "AI Insight",
      description: "Engagement in the Design chapter has decreased by 15%",
      time: "5 hours ago",
      read: false,
      type: "ai",
      archived: false,
    },
    {
      id: "5",
      title: "New message",
      description: "You have a new message from Sarah about the upcoming event",
      time: "1 day ago",
      read: true,
      type: "message",
      archived: false,
    },
    {
      id: "6",
      title: "Budget approved",
      description: "Your budget request for the workshop has been approved",
      time: "2 days ago",
      read: true,
      type: "info",
      archived: true,
    },
    {
      id: "7",
      title: "New event created",
      description: "Design Workshop has been added to the calendar",
      time: "3 days ago",
      read: true,
      type: "event",
      archived: false,
    },
    {
      id: "8",
      title: "AI Recommendation",
      description:
        "Consider scheduling more social events based on member feedback",
      time: "4 days ago",
      read: true,
      type: "ai",
      archived: false,
    },
    {
      id: "9",
      title: "Task assigned",
      description: "You've been assigned to help with the upcoming hackathon",
      time: "5 days ago",
      read: true,
      type: "task",
      archived: true,
    },
    {
      id: "10",
      title: "Chapter update",
      description: "The Engineering chapter has updated their meeting schedule",
      time: "1 week ago",
      read: true,
      type: "info",
      archived: false,
    },
  ]);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200";
      case "event":
        return "bg-gradient-to-r from-fuchsia-100 to-violet-100 border-fuchsia-200";
      case "task":
        return "bg-gradient-to-r from-green-100 to-emerald-100 border-green-200";
      case "ai":
        return "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200";
      case "message":
        return "bg-gradient-to-r from-indigo-100 to-purple-100 border-indigo-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 border-gray-200";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Bell className="h-4 w-4 text-blue-600" />;
      case "event":
        return <Bell className="h-4 w-4 text-fuchsia-600" />;
      case "task":
        return <Bell className="h-4 w-4 text-green-600" />;
      case "ai":
        return <Sparkles className="h-4 w-4 text-amber-600" />;
      case "message":
        return <Bell className="h-4 w-4 text-indigo-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredNotifications = notifications
    .filter((notification) => {
      // Filter by tab
      if (activeTab === "unread")
        return !notification.read && !notification.archived;
      if (activeTab === "archived") return notification.archived;
      if (activeTab === "all") return !notification.archived;
      return true;
    })
    .filter((notification) => {
      // Filter by search query
      if (searchQuery) {
        return (
          notification.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter((notification) => {
      // Filter by notification type
      if (typeFilter) {
        return notification.type === typeFilter;
      }
      return true;
    });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const archiveNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, archived: true }
          : notification,
      ),
    );
  };

  const unarchiveNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, archived: false }
          : notification,
      ),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const unreadCount = notifications.filter(
    (n) => !n.read && !n.archived,
  ).length;

  return (
    // this is krishna
    <DashboardLayout pageTitle="Notifications">
      <div className="bg-white rounded-xl shadow-sm border border-fuchsia-100 p-6">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fuchsia-400" />
            <Input
              type="search"
              placeholder="Search notifications..."
              className="w-full bg-fuchsia-50/50 border-fuchsia-200 pl-10 rounded-full focus-visible:ring-fuchsia-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {typeFilter
                    ? typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)
                    : "All Types"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-fuchsia-100">
                <DropdownMenuItem
                  onClick={() => setTypeFilter(null)}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTypeFilter("info")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Info
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTypeFilter("event")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Event
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTypeFilter("task")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTypeFilter("ai")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  AI
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTypeFilter("message")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Message
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              className="border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50"
              onClick={markAllAsRead}
              disabled={!notifications.some((n) => !n.read)}
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              Unread{" "}
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-fuchsia-600 hover:bg-fuchsia-700">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <NotificationList
              notifications={filteredNotifications}
              markAsRead={markAsRead}
              archiveNotification={archiveNotification}
              deleteNotification={deleteNotification}
              getNotificationColor={getNotificationColor}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <NotificationList
              notifications={filteredNotifications}
              markAsRead={markAsRead}
              archiveNotification={archiveNotification}
              deleteNotification={deleteNotification}
              getNotificationColor={getNotificationColor}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>

          <TabsContent value="archived" className="mt-0">
            <NotificationList
              notifications={filteredNotifications}
              markAsRead={markAsRead}
              archiveNotification={unarchiveNotification}
              deleteNotification={deleteNotification}
              getNotificationColor={getNotificationColor}
              getNotificationIcon={getNotificationIcon}
              isArchived
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface NotificationListProps {
  notifications: NotificationProps[];
  markAsRead: (id: string) => void;
  archiveNotification: (id: string) => void;
  deleteNotification: (id: string) => void;
  getNotificationColor: (type: string) => string;
  getNotificationIcon: (type: string) => React.ReactNode;
  isArchived?: boolean;
}

const NotificationList = ({
  notifications,
  markAsRead,
  archiveNotification,
  deleteNotification,
  getNotificationColor,
  getNotificationIcon,
  isArchived = false,
}: NotificationListProps) => {
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Card
                className={`border p-4 ${getNotificationColor(notification.type)} ${notification.read ? "opacity-80" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-800">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <Badge className="bg-fuchsia-600 hover:bg-fuchsia-700 text-[10px] px-1.5 py-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-fuchsia-200 text-fuchsia-700"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-fuchsia-200 text-fuchsia-700"
                      onClick={() => archiveNotification(notification.id)}
                      title={isArchived ? "Unarchive" : "Archive"}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-red-100 text-red-500"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {isArchived
                ? "No archived notifications"
                : activeTab === "unread"
                  ? "No unread notifications"
                  : "No notifications found"}
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsPage;
