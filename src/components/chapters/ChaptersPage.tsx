import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Users,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "../layout/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChapterProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  category: string;
  leadName: string;
  leadAvatar: string;
  events: number;
  tasks: number;
  engagementRate: number;
  coverImage: string;
  isJoined?: boolean;
}

const ChaptersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock chapters data
  const chapters: ChapterProps[] = [
    {
      id: "ch1",
      name: "Engineering",
      description:
        "For students interested in software engineering, hardware design, and technical projects.",
      memberCount: 45,
      maxMembers: 50,
      category: "Technical",
      leadName: "Alex Johnson",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      events: 12,
      tasks: 8,
      engagementRate: 85,
      coverImage:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a2aa?w=800&q=80",
      isJoined: true,
    },
    {
      id: "ch2",
      name: "Design",
      description:
        "Focused on UI/UX design, graphic design, and creative projects for various platforms.",
      memberCount: 32,
      maxMembers: 40,
      category: "Creative",
      leadName: "Sarah Miller",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      events: 8,
      tasks: 5,
      engagementRate: 78,
      coverImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      isJoined: false,
    },
    {
      id: "ch3",
      name: "Business",
      description:
        "For students interested in entrepreneurship, marketing, and business strategy.",
      memberCount: 38,
      maxMembers: 45,
      category: "Professional",
      leadName: "Michael Chen",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      events: 10,
      tasks: 6,
      engagementRate: 72,
      coverImage:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
      isJoined: true,
    },
    {
      id: "ch4",
      name: "Data Science",
      description:
        "Exploring data analysis, machine learning, and AI applications in various domains.",
      memberCount: 28,
      maxMembers: 35,
      category: "Technical",
      leadName: "Emily Rodriguez",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      events: 6,
      tasks: 9,
      engagementRate: 80,
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      isJoined: false,
    },
    {
      id: "ch5",
      name: "Marketing",
      description:
        "Focused on digital marketing, brand strategy, and promotional campaigns.",
      memberCount: 25,
      maxMembers: 30,
      category: "Professional",
      leadName: "David Park",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      events: 7,
      tasks: 4,
      engagementRate: 75,
      coverImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      isJoined: false,
    },
    {
      id: "ch6",
      name: "Photography",
      description:
        "For students passionate about photography, videography, and visual storytelling.",
      memberCount: 22,
      maxMembers: 30,
      category: "Creative",
      leadName: "Jessica Wong",
      leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      events: 9,
      tasks: 3,
      engagementRate: 82,
      coverImage:
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
      isJoined: true,
    },
  ];

  const filteredChapters = chapters
    .filter((chapter) => {
      // Filter by search query
      if (searchQuery) {
        return (
          chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chapter.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          chapter.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter((chapter) => {
      // Filter by category
      if (categoryFilter) {
        return chapter.category === categoryFilter;
      }
      return true;
    })
    .filter((chapter) => {
      // Filter by tab
      if (activeTab === "joined") return chapter.isJoined;
      return true;
    });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200 text-blue-800";
      case "Creative":
        return "bg-gradient-to-r from-fuchsia-100 to-violet-100 border-fuchsia-200 text-fuchsia-800";
      case "Professional":
        return "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-amber-800";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 border-gray-200 text-gray-800";
    }
  };

  const getEngagementColor = (rate: number) => {
    if (rate >= 80) return "text-emerald-600";
    if (rate >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout pageTitle="Chapters">
      // this is krishna
      <div className="bg-white rounded-xl shadow-sm border border-fuchsia-100 p-6">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fuchsia-400" />
            <Input
              type="search"
              placeholder="Search chapters..."
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
                  <Layers className="h-4 w-4 mr-2" />
                  {categoryFilter || "All Categories"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-fuchsia-100">
                <DropdownMenuItem
                  onClick={() => setCategoryFilter(null)}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCategoryFilter("Technical")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Technical
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCategoryFilter("Creative")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Creative
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCategoryFilter("Professional")}
                  className="cursor-pointer hover:bg-fuchsia-50"
                >
                  Professional
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Chapter
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
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              All Chapters
            </TabsTrigger>
            <TabsTrigger
              value="joined"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              Joined Chapters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
              {filteredChapters.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">
                    No chapters found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
              {filteredChapters.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">
                    You haven't joined any chapters yet
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50"
                    onClick={() => setActiveTab("all")}
                  >
                    Browse All Chapters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface ChapterCardProps {
  chapter: ChapterProps;
}

const ChapterCard = ({ chapter }: ChapterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200 text-blue-800";
      case "Creative":
        return "bg-gradient-to-r from-fuchsia-100 to-violet-100 border-fuchsia-200 text-fuchsia-800";
      case "Professional":
        return "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-amber-800";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 border-gray-200 text-gray-800";
    }
  };

  const getEngagementColor = (rate: number) => {
    if (rate >= 80) return "text-emerald-600";
    if (rate >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full border-fuchsia-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="relative h-36 overflow-hidden">
          <img
            src={chapter.coverImage}
            alt={chapter.name}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <h3 className="text-white font-semibold text-lg">{chapter.name}</h3>
            <Badge className={`${getCategoryColor(chapter.category)}`}>
              {chapter.category}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600 line-clamp-2 h-10">
            {chapter.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-fuchsia-200">
                <AvatarImage src={chapter.leadAvatar} alt={chapter.leadName} />
                <AvatarFallback className="bg-gradient-to-r from-fuchsia-200 to-violet-200 text-xs">
                  {chapter.leadName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-gray-500">Chapter Lead</p>
                <p className="text-sm font-medium">{chapter.leadName}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-gradient-to-r from-fuchsia-50 to-violet-50 border border-fuchsia-100">
              <Users className="h-4 w-4 text-fuchsia-600 mb-1" />
              <span className="text-xs text-gray-600">Members</span>
              <span className="text-sm font-medium">{chapter.memberCount}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-gradient-to-r from-fuchsia-50 to-violet-50 border border-fuchsia-100">
              <Calendar className="h-4 w-4 text-fuchsia-600 mb-1" />
              <span className="text-xs text-gray-600">Events</span>
              <span className="text-sm font-medium">{chapter.events}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-gradient-to-r from-fuchsia-50 to-violet-50 border border-fuchsia-100">
              <BarChart3 className="h-4 w-4 text-fuchsia-600 mb-1" />
              <span className="text-xs text-gray-600">Engagement</span>
              <span
                className={`text-sm font-medium ${getEngagementColor(chapter.engagementRate)}`}
              >
                {chapter.engagementRate}%
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
              <span>Capacity</span>
              <span>
                {chapter.memberCount}/{chapter.maxMembers}
              </span>
            </div>
            <Progress
              value={(chapter.memberCount / chapter.maxMembers) * 100}
              className="h-2 bg-gray-100"
            />
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="w-full flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              className="border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50"
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              View Details
            </Button>
            {chapter.isJoined ? (
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                Leave
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
              >
                Join
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ChaptersPage;
