import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface ChapterMetric {
  name: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
}

interface ChapterData {
  id: string;
  name: string;
  location: string;
  memberCount: number;
  activeStatus: "active" | "inactive" | "pending";
  metrics: ChapterMetric[];
}

interface ChapterOverviewWidgetProps {
  chapters?: ChapterData[];
  selectedChapterId?: string;
  onSelectChapter?: (chapterId: string) => void;
  onViewAllChapters?: () => void;
}

const ChapterOverviewWidget = ({
  chapters = [
    {
      id: "ch1",
      name: "University of Technology",
      location: "San Francisco, CA",
      memberCount: 124,
      activeStatus: "active",
      metrics: [
        {
          name: "Events",
          value: 12,
          change: 8.5,
          trend: "up",
        },
        {
          name: "Engagement",
          value: "78%",
          change: 5.2,
          trend: "up",
        },
        {
          name: "New Members",
          value: 18,
          change: 12.3,
          trend: "up",
        },
      ],
    },
    {
      id: "ch2",
      name: "City College",
      location: "Boston, MA",
      memberCount: 87,
      activeStatus: "active",
      metrics: [
        {
          name: "Events",
          value: 8,
          change: -2.1,
          trend: "down",
        },
        {
          name: "Engagement",
          value: "65%",
          change: 3.7,
          trend: "up",
        },
        {
          name: "New Members",
          value: 9,
          change: -4.5,
          trend: "down",
        },
      ],
    },
    {
      id: "ch3",
      name: "State University",
      location: "Chicago, IL",
      memberCount: 156,
      activeStatus: "active",
      metrics: [
        {
          name: "Events",
          value: 15,
          change: 12.0,
          trend: "up",
        },
        {
          name: "Engagement",
          value: "82%",
          change: 7.8,
          trend: "up",
        },
        {
          name: "New Members",
          value: 22,
          change: 15.4,
          trend: "up",
        },
      ],
    },
  ],
  selectedChapterId = "ch1",
  onSelectChapter = () => {},
  onViewAllChapters = () => {},
}: ChapterOverviewWidgetProps) => {
  const selectedChapter =
    chapters.find((chapter) => chapter.id === selectedChapterId) || chapters[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    // this is krishna
    // this is krishna

    // this is krishna

    <Card className="w-full h-full bg-white overflow-hidden border-fuchsia-100 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 to-violet-50">
        <div>
          <CardTitle className="text-xl font-bold">Chapter Overview</CardTitle>
          <CardDescription>
            Performance metrics and chapter details
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAllChapters}
          className="border-fuchsia-200 hover:bg-fuchsia-50 hover:text-fuchsia-700"
        >
          View All Chapters
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {/* Chapter Selector */}
          <div className="flex overflow-x-auto pb-2 -mx-2 px-2 space-x-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => onSelectChapter(chapter.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-colors ${selectedChapterId === chapter.id ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white border-transparent" : "bg-white hover:bg-fuchsia-50 border-fuchsia-200"}`}
              >
                <span className="font-medium text-sm">{chapter.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Chapter Details */}
          <div className="bg-muted/20 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedChapter.name}
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {selectedChapter.location}
                  </span>
                  <Badge
                    className={getStatusColor(selectedChapter.activeStatus)}
                    variant="outline"
                  >
                    {selectedChapter.activeStatus.charAt(0).toUpperCase() +
                      selectedChapter.activeStatus.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <Users className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="font-medium">
                  {selectedChapter.memberCount}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  members
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {selectedChapter.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg p-4 border"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-muted-foreground">
                      {metric.name}
                    </span>
                    {metric.name === "Events" ? (
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    ) : metric.name === "Engagement" ? (
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Users className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(metric.trend)}
                      <span
                        className={`text-xs font-medium ml-1 ${getTrendColor(metric.trend)}`}
                      >
                        {metric.change > 0 ? "+" : ""}
                        {metric.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-fuchsia-100 bg-gradient-to-r from-fuchsia-50/50 to-violet-50/50 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-fuchsia-100 hover:text-fuchsia-700"
        >
          <Calendar className="h-4 w-4 mr-2" />
          View Events
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-fuchsia-100 hover:text-fuchsia-700"
        >
          <Users className="h-4 w-4 mr-2" />
          Manage Members
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-fuchsia-100 hover:text-fuchsia-700"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChapterOverviewWidget;
