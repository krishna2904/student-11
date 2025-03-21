import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChartContainer from "./ChartContainer";
import MetricsCard from "./MetricsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CalendarIcon,
  UsersIcon,
  TrendingUpIcon,
  BarChart3Icon,
  PieChartIcon,
  ActivityIcon,
} from "lucide-react";

interface AnalyticsPanelProps {
  userRole?: "admin" | "member" | "organizer";
  timeRange?: "week" | "month" | "quarter" | "year";
  chapterId?: string;
}

const AnalyticsPanel = ({
  userRole = "admin",
  timeRange = "month",
  chapterId,
}: AnalyticsPanelProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(timeRange);
  const [selectedChapter, setSelectedChapter] = useState<string>(
    chapterId || "all",
  );

  // Mock data for charts
  const membershipData = [
    { name: "Jan", active: 40, new: 24, total: 64 },
    { name: "Feb", active: 45, new: 18, total: 63 },
    { name: "Mar", active: 50, new: 22, total: 72 },
    { name: "Apr", active: 55, new: 15, total: 70 },
    { name: "May", active: 60, new: 20, total: 80 },
    { name: "Jun", active: 65, new: 25, total: 90 },
  ];

  const eventData = [
    { name: "Workshops", count: 12, attendance: 85 },
    { name: "Seminars", count: 8, attendance: 72 },
    { name: "Networking", count: 6, attendance: 90 },
    { name: "Conferences", count: 4, attendance: 95 },
    { name: "Social", count: 10, attendance: 78 },
  ];

  const engagementData = [
    { name: "High", value: 35 },
    { name: "Medium", value: 45 },
    { name: "Low", value: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const chapterOptions = [
    { id: "all", name: "All Chapters" },
    { id: "ch1", name: "University of Washington" },
    { id: "ch2", name: "Stanford University" },
    { id: "ch3", name: "MIT" },
    { id: "ch4", name: "UC Berkeley" },
  ]; // this is krishna

  // Render different metrics based on user role
  const renderMetricsCards = () => {
    if (userRole === "admin") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricsCard
            title="Total Members"
            value="1,245"
            previousValue="1,180"
            percentageChange={5.5}
            icon={<UsersIcon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Active Chapters"
            value="24"
            previousValue="22"
            percentageChange={9.1}
            icon={<BarChart3Icon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Events This Month"
            value="38"
            previousValue="32"
            percentageChange={18.8}
            icon={<CalendarIcon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Avg. Engagement Rate"
            value="76%"
            previousValue="71%"
            percentageChange={7.0}
            icon={<TrendingUpIcon className="h-5 w-5" />}
          />
        </div>
      );
    } else if (userRole === "organizer") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricsCard
            title="Event Attendance"
            value="87%"
            previousValue="82%"
            percentageChange={6.1}
            icon={<UsersIcon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Upcoming Events"
            value="12"
            icon={<CalendarIcon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Resource Utilization"
            value="68%"
            previousValue="72%"
            percentageChange={-5.6}
            icon={<PieChartIcon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Feedback Score"
            value="4.7/5"
            previousValue="4.5/5"
            percentageChange={4.4}
            icon={<ActivityIcon className="h-5 w-5" />}
          />
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <MetricsCard
            title="Events Attended"
            value="8"
            previousValue="5"
            percentageChange={60}
            icon={<CalendarIcon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Engagement Score"
            value="82/100"
            previousValue="75/100"
            percentageChange={9.3}
            icon={<TrendingUpIcon className="h-5 w-5" />}
          />
          <MetricsCard
            title="Chapter Rank"
            value="#3"
            previousValue="#5"
            percentageChange={40}
            icon={<BarChart3Icon className="h-5 w-5" />}
          />
        </div>
      );
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-white via-fuchsia-50/20 to-violet-50/20 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Analytics Dashboard</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          {userRole === "admin" && (
            <Select value={selectedChapter} onValueChange={setSelectedChapter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                {chapterOptions.map((chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {renderMetricsCards()}

      <Tabs defaultValue="membership" className="w-full">
        <TabsList className="mb-4 bg-white/50 border border-fuchsia-100">
          <TabsTrigger
            value="membership"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
          >
            Membership
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="engagement"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
          >
            Engagement
          </TabsTrigger>
          {userRole === "admin" && (
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              Resources
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="membership" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer
              title="Membership Growth"
              description="Active and new members over time"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={membershipData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" fill="#8884d8" name="Active Members" />
                  <Bar dataKey="new" fill="#82ca9d" name="New Members" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer
              title="Membership Trends"
              description="Total membership over time"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={membershipData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Total Members"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer
              title="Event Distribution"
              description="Number of events by type"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={eventData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Number of Events" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer
              title="Event Attendance"
              description="Average attendance percentage by event type"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={eventData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="attendance"
                    fill="#82ca9d"
                    name="Attendance Rate (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer
              title="Member Engagement Levels"
              description="Distribution of member engagement"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  Engagement Insights
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-500 rounded-full p-1">
                      <TrendingUpIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">High Engagement Members</p>
                      <p className="text-sm text-gray-500">
                        35% of members are highly engaged, participating in 5+
                        events monthly
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-green-500 rounded-full p-1">
                      <UsersIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Medium Engagement Growth</p>
                      <p className="text-sm text-gray-500">
                        Medium engagement group grew by 12% compared to last{" "}
                        {selectedTimeRange}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-amber-500 rounded-full p-1">
                      <ActivityIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Engagement Opportunities</p>
                      <p className="text-sm text-gray-500">
                        20% of members show low engagement, representing growth
                        opportunity
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer
                title="Resource Allocation"
                description="Budget allocation by category"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Events", value: 45 },
                        { name: "Marketing", value: 20 },
                        { name: "Operations", value: 25 },
                        { name: "Technology", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: "Events", value: 45 },
                        { name: "Marketing", value: 20 },
                        { name: "Operations", value: 25 },
                        { name: "Technology", value: 10 },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][
                              index % 4
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer
                title="Resource Utilization"
                description="Percentage of allocated resources used"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Events", allocated: 100, used: 85 },
                      { name: "Marketing", allocated: 100, used: 92 },
                      { name: "Operations", allocated: 100, used: 78 },
                      { name: "Technology", allocated: 100, used: 95 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="used" fill="#82ca9d" name="Utilization (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AnalyticsPanel;
