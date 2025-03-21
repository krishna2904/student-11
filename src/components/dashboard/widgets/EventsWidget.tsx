import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  capacity: number;
  status: "upcoming" | "ongoing" | "past" | "cancelled";
}

interface EventsWidgetProps {
  events?: EventProps[];
  title?: string;
  description?: string;
  showRegisterButton?: boolean;
  onRegister?: (eventId: string) => void;
  onViewAll?: () => void;
}

const EventCard = ({
  event,
  showRegisterButton = true,
  onRegister,
}: {
  event: EventProps;
  showRegisterButton?: boolean;
  onRegister?: (eventId: string) => void;
}) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    past: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Card
      className="mb-3 border-l-4"
      style={{
        borderLeftColor:
          event.status === "upcoming"
            ? "#3b82f6"
            : event.status === "ongoing"
              ? "#10b981"
              : event.status === "cancelled"
                ? "#ef4444"
                : "#9ca3af",
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{event.title}</CardTitle>
          <Badge className={statusColors[event.status]}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>
              {event.attendees} / {event.capacity} attendees
            </span>
          </div>
        </div>
      </CardContent>
      {showRegisterButton && event.status === "upcoming" && (
        <CardFooter className="pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onRegister && onRegister(event.id)}
          >
            Register
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const EventsWidget = ({
  events = [
    {
      id: "1",
      title: "Annual Leadership Conference",
      date: "May 15, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "Main Campus, Building A",
      attendees: 45,
      capacity: 100,
      status: "upcoming" as const,
    },
    {
      id: "2",
      title: "Community Service Day",
      date: "May 22, 2023",
      time: "10:00 AM - 2:00 PM",
      location: "City Park",
      attendees: 28,
      capacity: 50,
      status: "upcoming" as const,
    },
    {
      id: "3",
      title: "New Member Orientation",
      date: "May 10, 2023",
      time: "3:00 PM - 4:30 PM",
      location: "Virtual (Zoom)",
      attendees: 15,
      capacity: 30,
      status: "ongoing" as const,
    },
    {
      id: "4",
      title: "Alumni Networking Mixer",
      date: "May 5, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Student Union",
      attendees: 35,
      capacity: 40,
      status: "past" as const,
    },
    {
      id: "5",
      title: "Workshop: Public Speaking",
      date: "May 8, 2023",
      time: "4:00 PM - 6:00 PM",
      location: "Building B, Room 203",
      attendees: 0,
      capacity: 25,
      status: "cancelled" as const,
    },
  ],
  title = "Upcoming Events",
  description = "Events for your chapter and organization",
  showRegisterButton = true,
  onRegister = () => {},
  onViewAll = () => {},
}: EventsWidgetProps) => {
  return (
    // this is krishna
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showRegisterButton={showRegisterButton}
              onRegister={onRegister}
            />
          ))}
          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[200px] text-center text-gray-500">
              <Calendar className="h-12 w-12 mb-2 opacity-20" />
              <p>No upcoming events</p>
              <p className="text-sm">Check back later for new events</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventsWidget;
