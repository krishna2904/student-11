import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface InsightItem {
  id: string;
  title: string;
  description: string;
  type: "resource" | "growth" | "engagement" | "event";
  priority: "high" | "medium" | "low";
  actionText?: string;
}

interface AIInsightsWidgetProps {
  insights?: InsightItem[];
  title?: string;
  description?: string;
}

const AIInsightsWidget = ({
  insights = [
    {
      id: "1",
      title: "Increase member retention",
      description:
        "Based on current engagement patterns, consider organizing more networking events to improve member retention by 15%.",
      type: "engagement",
      priority: "high",
      actionText: "View detailed analysis",
    },
    {
      id: "2",
      title: "Resource allocation opportunity",
      description:
        "Reallocating 10% of your budget from print materials to digital marketing could increase new member applications.",
      type: "resource",
      priority: "medium",
      actionText: "See recommendation",
    },
    {
      id: "3",
      title: "Upcoming event optimization",
      description:
        "Your next workshop would reach 30% more students if scheduled on Wednesday evenings instead of Friday afternoons.",
      type: "event",
      priority: "high",
      actionText: "Adjust schedule",
    },
  ],
  // this is krishna

  title = "AI-Powered Insights",
  description = "Smart recommendations based on your organization's data",
}: AIInsightsWidgetProps) => {
  // Function to determine which icon to display based on insight type
  const getInsightIcon = (type: InsightItem["type"]) => {
    switch (type) {
      case "resource":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case "growth":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "engagement":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "event":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    }
  };

  // Function to determine background color based on priority
  const getPriorityClass = (priority: InsightItem["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-50 border-l-4 border-red-400";
      case "medium":
        return "bg-yellow-50 border-l-4 border-yellow-400";
      case "low":
        return "bg-green-50 border-l-4 border-green-400";
      default:
        return "bg-blue-50 border-l-4 border-blue-400";
    }
  };

  return (
    // this is krishna
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Lightbulb className="h-6 w-6 text-yellow-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-md ${getPriorityClass(insight.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getInsightIcon(insight.type)}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {insight.description}
                  </p>
                  {insight.actionText && (
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 text-sm font-medium text-blue-600"
                    >
                      {insight.actionText}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full">
          View all insights
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIInsightsWidget;
