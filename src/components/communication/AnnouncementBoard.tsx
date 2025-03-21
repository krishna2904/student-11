import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  Pin,
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreVertical,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface AnnouncementProps {
  id?: string;
  title?: string;
  content?: string;
  author?: {
    name: string;
    avatar: string;
    role: string;
  };
  date?: Date;
  isPinned?: boolean;
  likes?: number;
  comments?: number;
  chapter?: string;
}

const defaultAnnouncements: AnnouncementProps[] = [
  // this is krishna
  {
    id: "1",
    title: "Annual Chapter Leadership Summit",
    content:
      "We're excited to announce our Annual Leadership Summit will be held on June 15th. All chapter presidents and officers are required to attend. We'll be discussing strategic goals for the upcoming academic year and sharing best practices across chapters.",
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      role: "National Director",
    },
    date: new Date(2023, 5, 1),
    isPinned: true,
    likes: 24,
    comments: 8,
    chapter: "National",
  },
  {
    id: "2",
    title: "New Member Recruitment Drive",
    content:
      "The spring recruitment drive will begin next week. Please review the updated recruitment materials in the shared drive and prepare your chapter's outreach strategy. Remember to focus on diversity and inclusion in your recruitment efforts.",
    author: {
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      role: "Membership Coordinator",
    },
    date: new Date(2023, 4, 25),
    isPinned: false,
    likes: 17,
    comments: 5,
    chapter: "West Region",
  },
  {
    id: "3",
    title: "Budget Submission Deadline",
    content:
      "This is a reminder that all chapter budget proposals for the next semester are due by May 30th. Please use the new budget template and include detailed justifications for any increased funding requests.",
    author: {
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      role: "Financial Officer",
    },
    date: new Date(2023, 4, 20),
    isPinned: false,
    likes: 9,
    comments: 12,
    chapter: "All Chapters",
  },
];

const Announcement: React.FC<AnnouncementProps> = ({
  title = "Announcement Title",
  content = "Announcement content placeholder",
  author = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "Member",
  },
  date = new Date(),
  isPinned = false,
  likes = 0,
  comments = 0,
  chapter = "General",
}) => {
  return (
    <Card className="mb-4 bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span className="font-medium">{author.name}</span>
                <span className="mx-1">•</span>
                <span>{author.role}</span>
                <span className="mx-1">•</span>
                <span>{format(date, "MMM d, yyyy")}</span>
                {chapter && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">
                      {chapter}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isPinned && <Pin size={16} className="text-amber-500 mr-2" />}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{content}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <ThumbsUp size={16} />
            <span>{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <MessageSquare size={16} />
            <span>{comments}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1"
        >
          <Share2 size={16} />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface AnnouncementBoardProps {
  announcements?: AnnouncementProps[];
  userRole?: "admin" | "member" | "organizer";
}

const AnnouncementBoard: React.FC<AnnouncementBoardProps> = ({
  announcements = defaultAnnouncements,
  userRole = "admin",
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [showNewAnnouncementForm, setShowNewAnnouncementForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAnnouncements = announcements
    .filter((announcement) => {
      if (activeTab === "all") return true;
      if (activeTab === "pinned") return announcement.isPinned;
      return announcement.chapter?.toLowerCase() === activeTab.toLowerCase();
    })
    .filter((announcement) => {
      if (!searchQuery) return true;
      return (
        announcement.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div className="w-full bg-gradient-to-br from-white via-fuchsia-50/20 to-violet-50/20 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        {userRole === "admin" && (
          <Button
            onClick={() => setShowNewAnnouncementForm(!showNewAnnouncementForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
          >
            <PlusCircle size={16} />
            <span>New Announcement</span>
          </Button>
        )}
      </div>

      {showNewAnnouncementForm && (
        <Card className="mb-6 bg-white border-fuchsia-100 shadow-md">
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Announcement Title" className="mb-2" />
            </div>
            <div>
              <Textarea
                placeholder="Write your announcement here..."
                className="min-h-[120px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                <option value="">Select Chapter/Audience</option>
                <option value="National">National</option>
                <option value="All Chapters">All Chapters</option>
                <option value="East Region">East Region</option>
                <option value="West Region">West Region</option>
                <option value="South Region">South Region</option>
                <option value="North Region">North Region</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowNewAnnouncementForm(false)}
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700">
              Publish
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
        <Tabs
          defaultValue="all"
          className="w-full md:w-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-white/50 border border-fuchsia-100">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="pinned"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              Pinned
            </TabsTrigger>
            <TabsTrigger
              value="National"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              National
            </TabsTrigger>
            <TabsTrigger
              value="East Region"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              East Region
            </TabsTrigger>
            <TabsTrigger
              value="West Region"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              West Region
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex w-full md:w-auto space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <Announcement key={announcement.id} {...announcement} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-muted-foreground">No announcements found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBoard;
