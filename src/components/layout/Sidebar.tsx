import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckSquare,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  userRole?: "admin" | "member" | "organizer";
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
  userRole = "admin",
}: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/",
      },
      {
        id: "events",
        label: "Events",
        icon: <Calendar size={20} />,
        path: "/events",
      },
      {
        id: "messages",
        label: "Messages",
        icon: <MessageSquare size={20} />,
        path: "/messages",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: <Bell size={20} />,
        path: "/notifications",
      },
    ];

    const adminItems = [
      {
        id: "chapters",
        label: "Chapters",
        icon: <Layers size={20} />,
        path: "/chapters",
      },
      {
        id: "members",
        label: "Members",
        icon: <Users size={20} />,
        path: "/members",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart3 size={20} />,
        path: "/analytics",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings size={20} />,
        path: "/settings",
      },
    ];

    const organizerItems = [
      {
        id: "tasks",
        label: "Tasks",
        icon: <CheckSquare size={20} />,
        path: "/tasks",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart3 size={20} />,
        path: "/analytics",
      },
    ];

    const memberItems = [
      {
        id: "tasks",
        label: "Tasks",
        icon: <CheckSquare size={20} />,
        path: "/tasks",
      },
    ];

    switch (userRole) {
      case "admin":
        return [...commonItems, ...adminItems];
      case "organizer":
        return [...commonItems, ...organizerItems];
      case "member":
        return [...commonItems, ...memberItems];
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    // this is krishna
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-violet-100 via-fuchsia-50 to-purple-100 border-r border-purple-300 transition-all duration-300 ease-in-out shadow-lg",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-purple-300">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-bold text-xl bg-gradient-to-r from-fuchsia-500 to-violet-700 bg-clip-text text-transparent"
          >
            StudentOrg
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={cn(
            "ml-auto rounded-full hover:bg-fuchsia-200",
            collapsed ? "mx-auto" : "",
          )}
        >
          {collapsed ? (
            <ChevronRight size={18} className="text-fuchsia-700" />
          ) : (
            <ChevronLeft size={18} className="text-fuchsia-700" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <TooltipProvider
              key={item.id}
              delayDuration={collapsed ? 100 : 1000}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      activeItem === item.id
                        ? "bg-gradient-to-r from-fuchsia-500 to-violet-700 text-white shadow-md"
                        : "text-gray-700 hover:bg-fuchsia-200 hover:text-fuchsia-900",
                      collapsed && "justify-center px-0",
                    )}
                    onClick={() => handleItemClick(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-shrink-0"
                    >
                      {React.cloneElement(item.icon, {
                        className: cn(
                          "h-5 w-5",
                          collapsed && "h-6 w-6",
                          activeItem === item.id
                            ? "text-white"
                            : "text-fuchsia-700",
                        ),
                      })}
                    </motion.div>
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && activeItem === item.id && (
                      <motion.div
                        className="absolute -left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white"
                        layoutId="activeIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    {!collapsed &&
                      hoveredItem === item.id &&
                      !(activeItem === item.id) && (
                        <motion.div
                          className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-pink-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent
                    side="right"
                    className="border-fuchsia-300 bg-white"
                  >
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>

      {/* User profile section */}
      <div className="mt-auto p-4 border-t border-purple-300">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-fuchsia-300 ring-2 ring-violet-200">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=studentorg"
              alt="User avatar"
            />
            <AvatarFallback className="bg-gradient-to-r from-fuchsia-300 to-violet-300">
              US
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground capitalize">
                {userRole}
              </span>
            </div>
          )}
        </div>

        {!collapsed && <Separator className="my-4" />}

        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={cn(
            "text-red-500 hover:text-red-600 hover:bg-red-100 w-full justify-start",
            collapsed ? "px-0" : "",
          )}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <LogOut size={18} className="mr-2" />
          </motion.div>
          {!collapsed && <span>Log out</span>}
        </Button>

        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 rounded-xl bg-gradient-to-br from-fuchsia-200 via-violet-100 to-fuchsia-100 p-4 shadow-inner relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-400 opacity-30 blur-xl" />
            <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 opacity-30 blur-xl" />

            <div className="mb-2 text-sm font-medium text-fuchsia-800">
              Need help?
            </div>
            <p className="text-xs text-gray-600">
              Check our documentation or contact support
            </p>
            <Button
              size="sm"
              className="mt-3 w-full bg-gradient-to-r from-fuchsia-500 to-violet-700 text-white hover:from-fuchsia-600 hover:to-violet-800 shadow-md"
            >
              <Sparkles className="mr-2 h-3 w-3" /> Get Support
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
