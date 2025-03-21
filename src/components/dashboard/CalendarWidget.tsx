import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "workshop" | "meeting" | "social" | "deadline";
}

const CalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate calendar events (mock data)
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Leadership Workshop",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      type: "workshop",
    },
    {
      id: "2",
      title: "Chapter Meeting",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      type: "meeting",
    },
    {
      id: "3",
      title: "Networking Mixer",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      type: "social",
    },
    {
      id: "4",
      title: "Budget Submission",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      type: "deadline",
    },
    {
      id: "5",
      title: "Tech Talk",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      type: "workshop",
    },
  ];

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }

    return days;
  };

  // Format date to display month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "meeting":
        return "bg-gradient-to-r from-amber-500 to-orange-500";
      case "social":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "deadline":
        return "bg-gradient-to-r from-red-500 to-rose-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const calendarDays = generateCalendarDays();
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <Card className="overflow-hidden border-fuchsia-100 shadow-md">
      <CardHeader className="border-b border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 to-violet-50 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-fuchsia-600" />
            <span>Calendar</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-fuchsia-100"
              onClick={prevMonth}
            >
              <ChevronLeft className="h-4 w-4 text-fuchsia-700" />
            </Button>
            <span className="text-sm font-medium">
              {formatMonthYear(currentDate)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-fuchsia-100"
              onClick={nextMonth}
            >
              <ChevronRight className="h-4 w-4 text-fuchsia-700" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="h-10 p-1" />;
            }

            const dateEvents = getEventsForDate(date);
            const hasEvents = dateEvents.length > 0;

            return (
              // this is krishna
              <motion.div
                key={date.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "h-10 p-1 relative rounded-md cursor-pointer transition-colors",
                  isToday(date) && "bg-fuchsia-100",
                  isSelected(date) && "bg-fuchsia-200",
                  !isToday(date) &&
                    !isSelected(date) &&
                    hasEvents &&
                    "bg-violet-50",
                )}
                onClick={() => setSelectedDate(date)}
              >
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-md text-sm",
                    isToday(date) && "font-bold text-fuchsia-700",
                    isSelected(date) && "font-bold text-fuchsia-800",
                  )}
                >
                  {date.getDate()}
                </div>
                {hasEvents && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {dateEvents.length <= 2
                      ? dateEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`h-1 w-1 rounded-full ${getEventTypeColor(event.type)}`}
                          />
                        ))
                      : [
                          <div
                            key="dot-1"
                            className={`h-1 w-1 rounded-full ${getEventTypeColor(dateEvents[0].type)}`}
                          />,
                          <div
                            key="dot-2"
                            className="h-1 w-1 rounded-full bg-gray-400"
                          />,
                          <div
                            key="dot-3"
                            className="h-1 w-1 rounded-full bg-gray-400"
                          />,
                        ]}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Selected date events */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date to view events"}
            </h3>
            <Button
              size="sm"
              className="h-8 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:from-fuchsia-700 hover:to-violet-700"
            >
              <Plus className="mr-1 h-3 w-3" /> Add Event
            </Button>
          </div>

          <div className="mt-2 space-y-2">
            {selectedDateEvents.length > 0
              ? selectedDateEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between rounded-md border border-gray-200 p-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${getEventTypeColor(event.type)}`}
                      />
                      <span className="text-sm font-medium">{event.title}</span>
                    </div>
                    <Badge
                      className={`${getEventTypeColor(event.type)} text-white`}
                      variant="outline"
                    >
                      {event.type}
                    </Badge>
                  </motion.div>
                ))
              : selectedDate && (
                  <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                    <p className="text-sm text-gray-500">
                      No events for this date
                    </p>
                  </div>
                )}

            {!selectedDate && (
              <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-500">
                  Select a date to view events
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
