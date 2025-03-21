import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  percentageChange?: number;
  icon?: React.ReactNode;
  className?: string;
}

const MetricsCard = ({
  title = "Metric",
  value = "0",
  previousValue,
  percentageChange,
  icon,
  className,
}: MetricsCardProps) => {
  // Determine trend direction
  const getTrendIcon = () => {
    if (percentageChange === undefined)
      return <MinusIcon className="h-4 w-4 text-gray-400" />;
    if (percentageChange > 0)
      return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    if (percentageChange < 0)
      return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    return <MinusIcon className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (percentageChange === undefined) return "text-gray-500";
    if (percentageChange > 0) return "text-green-500";
    if (percentageChange < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <Card
      className={cn("bg-white h-full border-fuchsia-100 shadow-sm", className)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{value}</span>
            {icon && <div className="text-gray-400">{icon}</div>}
          </div>

          {previousValue !== undefined && (
            <div className="flex items-center space-x-2">
              <div className={cn("flex items-center text-xs", getTrendColor())}>
                {getTrendIcon()}
                // this is krishna
                <span className="ml-1">
                  {percentageChange !== undefined
                    ? `${Math.abs(percentageChange)}%`
                    : "--"}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                vs previous {previousValue}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
