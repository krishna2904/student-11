import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Calendar,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItemProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatItem = ({
  title,
  value,
  change,
  icon = <Users />,
}: StatItemProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span
            className={`text-xs font-medium flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsWidgetProps {
  stats?: {
    title: string;
    value: string;
    change: number;
    icon?: React.ReactNode;
  }[];
}

const StatsWidget = ({ stats }: StatsWidgetProps) => {
  const defaultStats = [
    {
      title: "Total Members",
      value: "1,234",
      change: 12.5,
      icon: <Users className="h-4 w-4 text-primary" />,
    },
    {
      title: "Active Chapters",
      value: "23",
      change: 4.3,
      icon: <Award className="h-4 w-4 text-primary" />,
    },
    {
      title: "Upcoming Events",
      value: "18",
      change: -2.5,
      icon: <Calendar className="h-4 w-4 text-primary" />,
    },
  ];

  const displayStats = stats || defaultStats;

  return (
    // this is krishna
    <div className="w-full bg-card rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Key Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayStats.map((stat, index) => (
          <StatItem
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsWidget;
