import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface NotificationItem {
  id: string;
  type: "standard" | "ai";
  category: "info" | "success" | "warning" | "important";
  title: string;
  message: string;
  time: string;
  read: boolean;
  sender?: {
    name: string;
    avatar?: string;
  };
}

interface NotificationCenterProps {
  isOpen?: boolean;
  onClose?: () => void;
  notifications?: NotificationItem[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen = true,
  onClose = () => {},
  notifications = [
    {
      id: "1",
      type: "standard",
      category: "info",
      title: "New Chapter Member",
      message: "Sarah Johnson has joined the Engineering Chapter.",
      time: "10 minutes ago",
      read: false,
      sender: {
        name: "System",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
      },
    },
    {
      id: "2",
      type: "standard",
      category: "success",
      title: "Event Registration Complete",
      message: 'Your registration for "Annual Tech Conference" is confirmed.',
      time: "1 hour ago",
      read: true,
      sender: {
        name: "Events Team",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=events",
      },
    },
    {
      id: "3",
      type: "ai",
      category: "important",
      title: "Resource Allocation Suggestion",
      message:
        "Based on recent trends, consider allocating more budget to virtual events.",
      time: "3 hours ago",
      read: false,
    },
    {
      id: "4",
      type: "standard",
      category: "warning",
      title: "Task Deadline Approaching",
      message: 'The "Budget Report" task is due in 2 days.',
      time: "5 hours ago",
      read: false,
      sender: {
        name: "Task Manager",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tasks",
      },
    },
    {
      id: "5",
      type: "ai",
      category: "info",
      title: "Engagement Opportunity",
      message:
        "Members from the Design Chapter haven't been active for 2 weeks. Consider reaching out.",
      time: "1 day ago",
      read: true,
    },
    {
      id: "6",
      type: "standard",
      category: "info",
      title: "New Announcement",
      message:
        "Check out the latest organization-wide announcement about summer activities.",
      time: "2 days ago",
      read: true,
      sender: {
        name: "Communications",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=comms",
      },
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [markingAllAsRead, setMarkingAllAsRead] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;
  const aiNotifications = notifications.filter(
    (notification) => notification.type === "ai",
  );
  const standardNotifications = notifications.filter(
    (notification) => notification.type === "standard",
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "important":
        return <Star className="h-4 w-4 text-purple-500" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "success":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200";
      case "warning":
        return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
      case "important":
        return "bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-200";
      case "info":
      default:
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200";
    }
  };

  const handleMarkAllAsRead = () => {
    setMarkingAllAsRead(true);
    // Simulate API call
    setTimeout(() => {
      setMarkingAllAsRead(false);
      // This would update the notifications in a real app
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-16 z-50 w-full max-w-md overflow-hidden rounded-xl border border-fuchsia-200 bg-white shadow-xl sm:right-4"
    >
      <div className="flex items-center justify-between border-b border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 to-violet-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600">
            <Bell className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-fuchsia-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="border-b border-fuchsia-100 bg-white px-4 py-2">
          <TabsList className="grid w-full grid-cols-3 bg-fuchsia-50">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="standard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              Standard
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>AI Insights</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="focus-visible:outline-none">
          <ScrollArea className="h-[400px] px-4">
            <div className="space-y-3 py-3">
              <AnimatePresence>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NotificationCard
                        notification={notification}
                        getCategoryColor={getCategoryColor}
                        getCategoryIcon={getCategoryIcon}
                      />
                    </motion.div>
                  ))
                ) : (
                  <EmptyState message="No notifications" />
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="standard" className="focus-visible:outline-none">
          <ScrollArea className="h-[400px] px-4">
            <div className="space-y-3 py-3">
              <AnimatePresence>
                {standardNotifications.length > 0 ? (
                  standardNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NotificationCard
                        notification={notification}
                        getCategoryColor={getCategoryColor}
                        getCategoryIcon={getCategoryIcon}
                      />
                    </motion.div>
                  ))
                ) : (
                  <EmptyState message="No standard notifications" />
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="ai" className="focus-visible:outline-none">
          <ScrollArea className="h-[400px] px-4">
            <div className="space-y-3 py-3">
              <AnimatePresence>
                {aiNotifications.length > 0 ? (
                  aiNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NotificationCard
                        notification={notification}
                        getCategoryColor={getCategoryColor}
                        getCategoryIcon={getCategoryIcon}
                      />
                    </motion.div>
                  ))
                ) : (
                  <EmptyState message="No AI insights" />
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="border-t border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 to-violet-50 px-4 py-3">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="border-fuchsia-200 bg-white hover:bg-fuchsia-50"
            onClick={handleMarkAllAsRead}
            disabled={markingAllAsRead || unreadCount === 0}
          >
            {markingAllAsRead ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-fuchsia-600 border-t-transparent"></span>
                Processing...
              </>
            ) : (
              "Mark all as read"
            )}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
          >
            View all
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

interface NotificationCardProps {
  notification: NotificationItem;
  getCategoryColor: (category: string) => string;
  getCategoryIcon: (category: string) => React.ReactNode;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  getCategoryColor,
  getCategoryIcon,
}) => {
  const { category, title, message, time, read, sender, type } = notification;
  const [isHovered, setIsHovered] = useState(false);

  return (
    // this is krishna
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative cursor-pointer overflow-hidden rounded-lg border p-3 shadow-sm transition-all ${read ? "bg-white" : getCategoryColor(category)}`}
    >
      {!read && (
        <motion.div
          className="absolute right-3 top-3 h-2 w-2 rounded-full bg-fuchsia-600"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {type === "ai" ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          ) : sender?.avatar ? (
            <Avatar className="h-10 w-10 border-2 border-fuchsia-100">
              <AvatarImage src={sender.avatar} alt={sender.name} />
              <AvatarFallback className="bg-gradient-to-r from-fuchsia-200 to-violet-200">
                {sender.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-100 to-violet-100">
              {getCategoryIcon(category)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center">
            <h3 className="mr-2 font-medium text-gray-900">{title}</h3>
            {type === "ai" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-fuchsia-100 to-violet-100 text-fuchsia-800"
                    >
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI-generated insight</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-sm text-gray-600">{message}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">{time}</span>
            {sender && (
              <span className="text-xs text-gray-500">From: {sender.name}</span>
            )}
          </div>
        </div>
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]"
        >
          <Button
            size="sm"
            className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
          >
            View Details
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({
  message = "No notifications",
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-10"
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-100 to-violet-100">
      <Bell className="h-8 w-8 text-fuchsia-400" />
    </div>
    <p className="text-center text-gray-500">{message}</p>
    <Button variant="outline" size="sm" className="mt-4 border-fuchsia-200">
      Refresh
    </Button>
  </motion.div>
);

export default NotificationCenter;
