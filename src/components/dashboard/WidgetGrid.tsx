import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WidgetGridProps {
  children?: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  userRole?: "admin" | "member" | "organizer";
}

const WidgetGrid = ({
  children,
  className,
  columns = 3,
  gap = "md",
  userRole = "member",
}: WidgetGridProps) => {
  // Define gap sizes
  const gapSizes = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  // Define column layouts
  const columnLayouts = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // Generate placeholder widgets if no children provided
  const placeholderWidgets = () => {
    const widgetTypes = [
      { title: "Statistics", height: "h-44" },
      { title: "Chapter Overview", height: "h-72" },
      { title: "Upcoming Events", height: "h-96" },
      { title: "Tasks", height: "h-96" },
      { title: "AI Insights", height: "h-64" },
    ];

    return widgetTypes.map((widget, index) => (
      <div
        key={index}
        className={cn(
          "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col",
          widget.height,
          index === 1 || index === 4 ? "md:col-span-2" : "",
        )}
      >
        <h3 className="text-lg font-medium mb-2">{widget.title}</h3>
        <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            Widget content will appear here
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div
      className={cn(
        "grid w-full",
        columnLayouts[columns],
        gapSizes[gap],
        "bg-gradient-to-br from-white via-fuchsia-50/10 to-violet-50/10 p-4 rounded-lg shadow-sm",
        className,
      )}
    >
      {children || placeholderWidgets()}
    </div>
  );
};

export default WidgetGrid;
