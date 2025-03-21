import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Filter,
  Users,
  ArrowUp,
  ArrowDown,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "../layout/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [chapterFilter, setChapterFilter] = useState("all");

  // Mock data for charts
  const memberActivityData = [
    { name: "Week 1", active: 45, new: 12 },
    { name: "Week 2", active: 52, new: 8 },
    { name: "Week 3", active: 48, new: 10 },
    { name: "Week 4", active: 61, new: 15 },
    { name: "Week 5", active: 58, new: 7 },
    { name: "Week 6", active: 65, new: 9 },
  ];

  const eventAttendanceData = [
    { name: "Workshop", value: 35 },
    { name: "Social", value: 25 },
    { name: "Meeting", value: 20 },
    { name: "Conference", value: 15 },
    { name: "Other", value: 5 },
  ];
  // this is krishna

  const chapterEngagementData = [
    { name: "Engineering", engagement: 85, members: 45 },
    { name: "Design", engagement: 78, members: 32 },
    { name: "Business", engagement: 72, members: 38 },
    { name: "Data Science", engagement: 80, members: 28 },
    { name: "Marketing", engagement: 75, members: 25 },
  ];

  const timeSpentData = [
    { name: "Mon", events: 2.5, tasks: 1.2, social: 0.8 },
    { name: "Tue", events: 1.8, tasks: 2.0, social: 0.5 },
    { name: "Wed", events: 3.2, tasks: 1.5, social: 1.0 },
    { name: "Thu", events: 2.0, tasks: 2.2, social: 0.7 },
    { name: "Fri", events: 1.5, tasks: 1.0, social: 2.5 },
    { name: "Sat", events: 0.5, tasks: 0.3, social: 3.0 },
    { name: "Sun", events: 0.2, tasks: 0.5, social: 1.8 },
  ];

  // Top members data
  const topMembers = [
    {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      chapter: "Engineering",
      eventsAttended: 12,
      tasksCompleted: 8,
      engagementScore: 95,
    },
    {
      name: "Sarah Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      chapter: "Design",
      eventsAttended: 10,
      tasksCompleted: 9,
      engagementScore: 92,
    },
    {
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      chapter: "Business",
      eventsAttended: 8,
      tasksCompleted: 12,
      engagementScore: 90,
    },
    {
      name: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      chapter: "Data Science",
      eventsAttended: 9,
      tasksCompleted: 7,
      engagementScore: 88,
    },
    {
      name: "David Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      chapter: "Marketing",
      eventsAttended: 7,
      tasksCompleted: 10,
      engagementScore: 85,
    },
  ];

  // Summary metrics
  const summaryMetrics = [
    {
      title: "Total Members",
      value: 168,
      change: 12,
      changeType: "increase",
      icon: <Users className="h-5 w-5 text-fuchsia-600" />,
    },
    {
      title: "Active Members",
      value: 142,
      change: 8,
      changeType: "increase",
      icon: <Activity className="h-5 w-5 text-fuchsia-600" />,
    },
    {
      title: "Events This Month",
      value: 24,
      change: 3,
      changeType: "increase",
      icon: <Calendar className="h-5 w-5 text-fuchsia-600" />,
    },
    {
      title: "Avg. Engagement",
      value: "78%",
      change: 5,
      changeType: "increase",
      icon: <TrendingUp className="h-5 w-5 text-fuchsia-600" />,
    },
  ];

  // Colors for charts
  const COLORS = ["#D946EF", "#8B5CF6", "#EC4899", "#6366F1", "#F97316"];

  return (
    <DashboardLayout pageTitle="Member Analytics">
      <div className="space-y-6">
        {/* Filters and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl shadow-sm border border-fuchsia-100 p-4">
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] border-fuchsia-200 focus:ring-fuchsia-500">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chapterFilter} onValueChange={setChapterFilter}>
              <SelectTrigger className="w-[180px] border-fuchsia-200 focus:ring-fuchsia-500">
                <SelectValue placeholder="Select chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chapters</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="datascience">Data Science</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryMetrics.map((metric, index) => (
            <Card key={index} className="border-fuchsia-100">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {metric.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">
                      {metric.value}
                    </h3>
                    <div className="flex items-center mt-1">
                      {metric.changeType === "increase" ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          {metric.change}%
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          {metric.change}%
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500 ml-2">
                        vs last {timeRange}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-fuchsia-100 to-violet-100">
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main analytics content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="chapters"
              className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700"
            >
              Chapters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Member Activity Chart */}
              <Card className="border-fuchsia-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Member Activity</CardTitle>
                  <CardDescription>
                    Active and new members over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={memberActivityData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="active"
                          name="Active Members"
                          fill="#D946EF"
                        />
                        <Bar dataKey="new" name="New Members" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Event Attendance Chart */}
              <Card className="border-fuchsia-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Event Attendance</CardTitle>
                  <CardDescription>Distribution by event type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={eventAttendanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {eventAttendanceData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Chapter Engagement Chart */}
              <Card className="border-fuchsia-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Chapter Engagement</CardTitle>
                  <CardDescription>Engagement rate by chapter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={chapterEngagementData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="engagement"
                          name="Engagement (%)"
                          fill="#D946EF"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Time Spent Chart */}
              <Card className="border-fuchsia-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Time Spent Distribution
                  </CardTitle>
                  <CardDescription>
                    Hours spent on different activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={timeSpentData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="events"
                          name="Events"
                          stackId="1"
                          fill="#D946EF"
                          stroke="#D946EF"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="tasks"
                          name="Tasks"
                          stackId="1"
                          fill="#8B5CF6"
                          stroke="#8B5CF6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="social"
                          name="Social"
                          stackId="1"
                          fill="#EC4899"
                          stroke="#EC4899"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Members */}
            <Card className="border-fuchsia-100">
              <CardHeader>
                <CardTitle className="text-lg">
                  Top Performing Members
                </CardTitle>
                <CardDescription>Based on engagement score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-fuchsia-100">
                        <th className="text-left font-medium text-gray-500 py-3 px-4">
                          Member
                        </th>
                        <th className="text-left font-medium text-gray-500 py-3 px-4">
                          Chapter
                        </th>
                        <th className="text-center font-medium text-gray-500 py-3 px-4">
                          Events Attended
                        </th>
                        <th className="text-center font-medium text-gray-500 py-3 px-4">
                          Tasks Completed
                        </th>
                        <th className="text-center font-medium text-gray-500 py-3 px-4">
                          Engagement Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topMembers.map((member, index) => (
                        <tr
                          key={index}
                          className="border-b border-fuchsia-50 hover:bg-fuchsia-50/30"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border border-fuchsia-200">
                                <AvatarImage
                                  src={member.avatar}
                                  alt={member.name}
                                />
                                <AvatarFallback className="bg-gradient-to-r from-fuchsia-200 to-violet-200 text-xs">
                                  {member.name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-gray-800">
                                {member.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {member.chapter}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600">
                            {member.eventsAttended}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600">
                            {member.tasksCompleted}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-fuchsia-100 to-violet-100 text-fuchsia-800">
                              {member.engagementScore}/100
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="border-fuchsia-100">
              <CardHeader>
                <CardTitle>Member Analytics</CardTitle>
                <CardDescription>
                  Detailed member statistics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Member-specific analytics content would go here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card className="border-fuchsia-100">
              <CardHeader>
                <CardTitle>Event Analytics</CardTitle>
                <CardDescription>
                  Event performance and attendance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Event-specific analytics content would go here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chapters">
            <Card className="border-fuchsia-100">
              <CardHeader>
                <CardTitle>Chapter Analytics</CardTitle>
                <CardDescription>
                  Chapter growth and engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Chapter-specific analytics content would go here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
