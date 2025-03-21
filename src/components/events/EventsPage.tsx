import React, { useState } from "react";
import { Calendar, Plus, Filter, List, Grid, Search } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import DashboardLayout from "../layout/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: "workshop" | "social" | "meeting" | "conference" | "other";
  attendees: number;
  capacity: number;
  organizer: string;
  organizerAvatar: string;
  chapter: string;
}

const EventsPage = () => {
  const [view, setView] = useState<"list" | "grid" | "calendar">("list");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);

  // Mock events data
  const events: EventProps[] = [
    {
      id: "1",
      title: "Web Development Workshop",
      description:
        "Learn the basics of web development with HTML, CSS, and JavaScript.",
      date: new Date(2023, 5, 15),
      time: "3:00 PM - 5:00 PM",
      location: "Engineering Building, Room 302",
      type: "workshop",
      attendees: 25,
      capacity: 30,
      organizer: "Alex Johnson",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      chapter: "Engineering",
    },
    {
      id: "2",
      title: "End of Year Social",
      description:
        "Join us for food, games, and networking to celebrate the end of the academic year.",
      date: new Date(2023, 5, 20),
      time: "6:00 PM - 9:00 PM",
      location: "Student Union, Main Hall",
      type: "social",
      attendees: 45,
      capacity: 100,
      organizer: "Sarah Miller",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      chapter: "Social Committee",
    },
    {
      id: "3",
      title: "Leadership Meeting",
      description:
        "Monthly meeting for chapter leaders to discuss upcoming events and initiatives.",
      date: new Date(2023, 5, 10),
      time: "4:00 PM - 5:30 PM",
      location: "Virtual (Zoom)",
      type: "meeting",
      attendees: 12,
      capacity: 15,
      organizer: "Michael Chen",
      organizerAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      chapter: "Leadership Council",
    },
    {
      id: "4",
      title: "Tech Conference",
      description:
        "Annual technology conference featuring industry speakers and networking opportunities.",
      date: new Date(2023, 6, 5),
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center",
      type: "conference",
      attendees: 120,
      capacity: 200,
      organizer: "David Park",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      chapter: "Technology",
    },
    {
      id: "5",
      title: "Resume Workshop",
      description:
        "Get tips on creating an effective resume and preparing for job interviews.",
      date: new Date(2023, 5, 25),
      time: "2:00 PM - 4:00 PM",
      location: "Career Center, Room 101",
      type: "workshop",
      attendees: 18,
      capacity: 25,
      organizer: "Emily Rodriguez",
      organizerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      chapter: "Career Development",
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200 text-blue-800";
      case "social":
        return "bg-gradient-to-r from-fuchsia-100 to-violet-100 border-fuchsia-200 text-fuchsia-800";
      case "meeting":
        return "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-amber-800";
      case "conference":
        return "bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200 text-emerald-800";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 border-gray-200 text-gray-800";
    }
  };

  const filteredEvents = events
    .filter((event) => {
      // Filter by search query
      if (searchQuery) {
        return (
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter((event) => {
      // Filter by event type
      if (eventTypeFilter) {
        return event.type === eventTypeFilter;
      }
      return true;
    });

  const EventCard = ({ event }: { event: EventProps }) => (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="h-full border-fuchsia-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className={`${getEventTypeColor(event.type)}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
            <span className="text-sm text-gray-500">
              {format(event.date, "MMM d, yyyy")}
            </span>
          </div>
          <CardTitle className="text-lg font-semibold mt-2 text-gray-800">
            {event.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {event.time} • {event.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2">
            {event.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border border-fuchsia-200">
                <AvatarImage
                  src={event.organizerAvatar}
                  alt={event.organizer}
                />
                <AvatarFallback className="bg-gradient-to-r from-fuchsia-200 to-violet-200 text-xs">
                  {event.organizer.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-500">{event.organizer}</span>
            </div>
            <span className="text-xs text-gray-500">{event.chapter}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="w-full flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {event.attendees}/{event.capacity} attendees
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
            >
              Register
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const EventListItem = ({ event }: { event: EventProps }) => (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className="border-fuchsia-100 shadow-sm hover:shadow-md transition-shadow duration-200 mb-3">
        <div className="flex p-4">
          <div className="w-16 flex-shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-50 to-violet-50 rounded-md border border-fuchsia-100 mr-4">
            <div className="text-lg font-bold text-fuchsia-700">
              {format(event.date, "d")}
            </div>
            <div className="text-xs text-gray-600">
              {format(event.date, "MMM")}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {event.time} • {event.location}
                </p>
              </div>
              <Badge className={`${getEventTypeColor(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
              {event.description}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border border-fuchsia-200">
                  <AvatarImage
                    src={event.organizerAvatar}
                    alt={event.organizer}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-fuchsia-200 to-violet-200 text-xs">
                    {event.organizer.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">{event.organizer}</span>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    // this is krishna
    <DashboardLayout pageTitle="Events">
      <div className="bg-white rounded-xl shadow-sm border border-fuchsia-100 p-6">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fuchsia-400" />
            <Input
              type="search"
              placeholder="Search events..."
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
                  {eventTypeFilter
                    ? eventTypeFilter.charAt(0).toUpperCase() +
                      eventTypeFilter.slice(1)
                    : "All Types"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-fuchsia-100">
                <DropdownMenuItem
                  onClick={() => setEventTypeFilter(null)}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEventTypeFilter("workshop")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Workshop
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEventTypeFilter("social")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Social
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEventTypeFilter("meeting")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Meeting
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEventTypeFilter("conference")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Conference
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEventTypeFilter("other")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Other
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex border border-fuchsia-200 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`px-3 ${view === "list" ? "bg-fuchsia-100 text-fuchsia-700" : "text-gray-500 hover:text-fuchsia-700 hover:bg-fuchsia-50"}`}
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-3 ${view === "grid" ? "bg-fuchsia-100 text-fuchsia-700" : "text-gray-500 hover:text-fuchsia-700 hover:bg-fuchsia-50"}`}
                onClick={() => setView("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-3 ${view === "calendar" ? "bg-fuchsia-100 text-fuchsia-700" : "text-gray-500 hover:text-fuchsia-700 hover:bg-fuchsia-50"}`}
                onClick={() => setView("calendar")}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* View content */}
        <div className="mt-6">
          {view === "calendar" ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <Card className="border-fuchsia-100">
                  <CardContent className="pt-6">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border border-fuchsia-100"
                    />
                  </CardContent>
                </Card>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Events on{" "}
                    {date ? format(date, "MMMM d, yyyy") : "selected date"}
                  </h3>
                  <div className="space-y-2">
                    {filteredEvents
                      .filter(
                        (event) =>
                          date &&
                          event.date.toDateString() === date.toDateString(),
                      )
                      .map((event) => (
                        <Card key={event.id} className="border-fuchsia-100 p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {event.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {event.time}
                              </p>
                            </div>
                            <Badge
                              className={`${getEventTypeColor(event.type)} text-xs`}
                            >
                              {event.type.charAt(0).toUpperCase() +
                                event.type.slice(1)}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    {date &&
                      filteredEvents.filter(
                        (event) =>
                          event.date.toDateString() === date.toDateString(),
                      ).length === 0 && (
                        <p className="text-sm text-gray-500 italic">
                          No events on this date
                        </p>
                      )}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <Card className="border-fuchsia-100 h-full">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>
                      All scheduled events for the next 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredEvents
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((event) => (
                          <div
                            key={event.id}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-fuchsia-50 transition-colors"
                          >
                            <div className="w-14 h-14 flex-shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-50 to-violet-50 rounded-md border border-fuchsia-100">
                              <div className="text-lg font-bold text-fuchsia-700">
                                {format(event.date, "d")}
                              </div>
                              <div className="text-xs text-gray-600">
                                {format(event.date, "MMM")}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-800">
                                  {event.title}
                                </h3>
                                <Badge
                                  className={`${getEventTypeColor(event.type)}`}
                                >
                                  {event.type.charAt(0).toUpperCase() +
                                    event.type.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {event.time} • {event.location}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <Avatar className="h-5 w-5 border border-fuchsia-200">
                                  <AvatarImage
                                    src={event.organizerAvatar}
                                    alt={event.organizer}
                                  />
                                  <AvatarFallback className="bg-gradient-to-r from-fuchsia-200 to-violet-200 text-xs">
                                    {event.organizer.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-gray-500">
                                  {event.organizer}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {filteredEvents.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">
                    No events found matching your criteria
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <EventListItem key={event.id} event={event} />
              ))}
              {filteredEvents.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No events found matching your criteria
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;
