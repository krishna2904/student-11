import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
  height?: number | string;
  width?: number | string;
}

const ChartContainer = ({
  title = "Chart Title",
  description = "Chart description and context",
  className = "",
  children,
  isLoading = false,
  height = 350,
  width = "100%",
}: ChartContainerProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden bg-white border-fuchsia-100 shadow-md",
        className,
      )}
      style={{ width, height }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : null}
        <div className="h-full w-full min-h-[250px]">
          {children || (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <p>Chart visualization will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
      // this is krishna
    </Card>
  );
};

export default ChartContainer;
