import React, { useState } from "react";
import {
  Bell,
  Search,
  Settings,
  User,
  ChevronDown,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card } from "../ui/card";

interface HeaderProps {
  title?: string;
  userRole?: "Admin" | "Member" | "Event Organizer";
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const Header = ({
  title = "Dashboard",
  userRole = "Admin",
  userName = "Jane Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  notificationCount = 3,
}: HeaderProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "New member joined",
      description: "John Smith joined the Engineering chapter",
      time: "2 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: 2,
      title: "Event reminder",
      description: "Tech Talk starts in 1 hour",
      time: "1 hour ago",
      read: false,
      type: "event",
    },
    {
      id: 3,
      title: "Task completed",
      description: "Website redesign task marked as complete",
      time: "3 hours ago",
      read: true,
      type: "task",
    },
    {
      id: 4,
      title: "AI Insight",
      description: "Engagement in the Design chapter has decreased by 15%",
      time: "5 hours ago",
      read: false,
      type: "ai",
    },
  ];

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
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 border-gray-200";
    }
  };

  return (
    // this is krishna
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-fuchsia-200 bg-white px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-2 lg:gap-4">
        <h1 className="text-xl font-semibold md:text-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <motion.div
          className="relative w-full max-w-sm"
          animate={{
            scale: searchFocused ? 1.02 : 1,
            boxShadow: searchFocused
              ? "0 4px 12px rgba(212, 58, 237, 0.1)"
              : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-fuchsia-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-fuchsia-50/50 border-fuchsia-200 pl-8 md:w-[300px] lg:w-[400px] rounded-full focus-visible:ring-fuchsia-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-fuchsia-100"
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-fuchsia-700" />
                {notificationCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-[10px] font-bold text-white"
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </Button>
            </motion.div>
            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-80 z-50"
                >
                  <Card className="p-4 border-fuchsia-100 shadow-lg overflow-hidden">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 flex items-center gap-1">
                        <Bell className="h-4 w-4 text-fuchsia-600" />
                        Notifications
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs hover:bg-fuchsia-50 hover:text-fuchsia-700"
                      >
                        Mark all as read
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`rounded-md p-3 border ${getNotificationColor(notification.type)} ${notification.read ? "opacity-70" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium text-gray-800 flex items-center gap-1">
                              {notification.type === "ai" && (
                                <Sparkles className="h-3 w-3 text-amber-500" />
                              )}
                              {notification.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.description}
                          </p>
                          {!notification.read && (
                            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-fuchsia-500" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <Button
                      variant="default"
                      className="mt-3 w-full text-sm bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
                    >
                      View all notifications
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-1 px-2 rounded-full hover:bg-fuchsia-100"
                >
                  <Avatar className="h-8 w-8 border-2 border-fuchsia-200">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-gradient-to-r from-fuchsia-200 to-violet-200">
                      {userName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start text-left md:flex">
                    <span className="text-sm font-medium text-gray-800">
                      {userName}
                    </span>
                    <span className="text-xs text-gray-500">{userRole}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border-fuchsia-100"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-fuchsia-50">
                <User className="mr-2 h-4 w-4 text-fuchsia-600" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-fuchsia-50">
                <Settings className="mr-2 h-4 w-4 text-fuchsia-600" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
