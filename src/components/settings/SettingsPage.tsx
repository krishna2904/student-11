import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Globe,
  Trash2,
  Save,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "../layout/DashboardLayout";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("english");

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Student organization leader with a passion for technology and community building.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    role: "Admin",
    chapter: "Engineering",
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    taskReminders: true,
    memberUpdates: true,
    weeklyDigest: true,
  });

  // Theme settings
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Handle profile form changes
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  // Handle notification settings changes
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    });
  };

  return (
    // this is krishna
    <DashboardLayout pageTitle="Settings">
      <div className="bg-white rounded-xl shadow-sm border border-fuchsia-100 p-6">
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-6">
                <div className="flex flex-col items-center mb-6 p-4 bg-gradient-to-r from-fuchsia-50 to-violet-50 rounded-lg border border-fuchsia-100">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-md mb-3">
                    <AvatarImage
                      src={profileForm.avatar}
                      alt={profileForm.name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-fuchsia-400 to-violet-400 text-white text-xl">
                      {profileForm.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-gray-800">
                    {profileForm.name}
                  </h3>
                  <p className="text-sm text-gray-500">{profileForm.role}</p>
                </div>

                <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
                  <TabsTrigger
                    value="profile"
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700 text-gray-600"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700 text-gray-600"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Account & Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700 text-gray-600"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="appearance"
                    className="w-full justify-start px-3 py-2 data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-700 text-gray-600"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                </TabsList>

                <Separator className="my-4" />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full justify-start mt-4"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to log out?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be logged out of your account and redirected to
                        the login page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Log Out</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information and how it is displayed to
                      others.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chapter">Chapter</Label>
                      <Select
                        value={profileForm.chapter}
                        onValueChange={(value) =>
                          setProfileForm({ ...profileForm, chapter: value })
                        }
                      >
                        <SelectTrigger id="chapter">
                          <SelectValue placeholder="Select a chapter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Sciences">Sciences</SelectItem>
                          <SelectItem value="Medicine">Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Reset
                    </Button>
                    <Button className="flex items-center gap-1">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account & Security</CardTitle>
                    <CardDescription>
                      Manage your account security and authentication settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="2fa" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Update Security Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "emailNotifications",
                              checked,
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-500">
                            Receive notifications on your device
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "pushNotifications",
                              checked,
                            )
                          }
                        />
                      </div>

                      <Separator className="my-4" />
                      <h3 className="text-lg font-medium">
                        Notification Types
                      </h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Event Reminders</p>
                          <p className="text-sm text-gray-500">
                            Get notified about upcoming events
                          </p>
                        </div>
                        <Switch
                          id="event-reminders"
                          checked={notificationSettings.eventReminders}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("eventReminders", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Task Reminders</p>
                          <p className="text-sm text-gray-500">
                            Get notified about task deadlines
                          </p>
                        </div>
                        <Switch
                          id="task-reminders"
                          checked={notificationSettings.taskReminders}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("taskReminders", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Member Updates</p>
                          <p className="text-sm text-gray-500">
                            Get notified about new members and role changes
                          </p>
                        </div>
                        <Switch
                          id="member-updates"
                          checked={notificationSettings.memberUpdates}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("memberUpdates", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Digest</p>
                          <p className="text-sm text-gray-500">
                            Receive a weekly summary of activities
                          </p>
                        </div>
                        <Switch
                          id="weekly-digest"
                          checked={notificationSettings.weeklyDigest}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("weeklyDigest", checked)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Save Notification Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize the look and feel of your dashboard.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          className="flex items-center gap-2 w-32"
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="h-4 w-4" />
                          Light
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          className="flex items-center gap-2 w-32"
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                        </Button>
                      </div>

                      <Separator className="my-4" />

                      <h3 className="text-lg font-medium">Language</h3>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language" className="w-full">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save Appearance Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
