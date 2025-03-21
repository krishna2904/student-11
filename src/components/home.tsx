import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Users, Calendar, Sparkles, ArrowRight } from "lucide-react";

interface HomeProps {
  initialRole?: "admin" | "member" | "organizer";
}

const Home = ({ initialRole = "admin" }: HomeProps) => {
  const [userRole, setUserRole] = useState<"admin" | "member" | "organizer">(
    initialRole,
  );
  const navigate = useNavigate();

  const handleRoleChange = (role: "admin" | "member" | "organizer") => {
    setUserRole(role);
  }; // this is krishna

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <Select
          value={userRole}
          onValueChange={(value: any) => handleRoleChange(value)}
        >
          <SelectTrigger className="w-[180px] bg-white/90 backdrop-blur-sm border-fuchsia-200 hover:border-fuchsia-300">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin View</SelectItem>
            <SelectItem value="member">Member View</SelectItem>
            <SelectItem value="organizer">Event Organizer View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <div className="hidden">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="w-full">
          <DashboardLayout userRole={userRole} />
        </TabsContent>

        <TabsContent value="welcome" className="w-full">
          <WelcomeScreen onGetStarted={() => navigate("/dashboard")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted = () => {} }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white via-fuchsia-50 to-violet-50">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
            Student Organization Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Centralized management for multiple student chapters with role-based
            views, analytics, and AI-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="Role-Based Views"
            description="Tailored interfaces for admins, members, and event organizers."
          />
          <FeatureCard
            icon={<Sparkles className="h-10 w-10 text-primary" />}
            title="AI Integration"
            description="Smart notifications and predictive insights for better decision making."
          />
          <FeatureCard
            icon={<Calendar className="h-10 w-10 text-primary" />}
            title="Event Management"
            description="Organize, track, and manage events across all chapters."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Member Tracking"
            description="Monitor membership growth and engagement across chapters."
          />
        </div>

        <Button
          size="lg"
          onClick={onGetStarted}
          className="mt-8 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon = <Shield className="h-10 w-10 text-primary" />,
  title = "Feature Title",
  description = "Feature description goes here.",
}: FeatureCardProps) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-fuchsia-200 hover:border-fuchsia-300 transition-all shadow-md hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
    // this is krishna
  );
};

export default Home;
