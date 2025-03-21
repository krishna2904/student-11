import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  FileText,
  MessageSquare,
  Users,
  Share2,
  Paperclip,
  Send,
} from "lucide-react";

interface CollaborationSpaceProps {
  spaces?: {
    id: string;
    name: string;
    description: string;
    members: {
      id: string;
      name: string;
      avatar: string;
      role: string;
    }[];
    documents: {
      id: string;
      name: string;
      type: string;
      uploadedBy: string;
      uploadedAt: string;
    }[];
    discussions: {
      id: string;
      title: string;
      messages: {
        id: string;
        sender: {
          name: string;
          avatar: string;
        };
        content: string;
        timestamp: string;
      }[];
    }[];
  }[];
  currentSpaceId?: string;
}

const CollaborationSpace = ({
  spaces = [
    {
      id: "1",
      name: "Marketing Team",
      description:
        "Collaboration space for the marketing team to plan campaigns and share materials.",
      members: [
        {
          id: "1",
          name: "Alex Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          role: "Team Lead",
        },
        {
          id: "2",
          name: "Jamie Smith",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
          role: "Content Creator",
        },
        {
          id: "3",
          name: "Taylor Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
          role: "Designer",
        },
        {
          id: "4",
          name: "Morgan Lee",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
          role: "Social Media",
        },
      ],
      documents: [
        {
          id: "1",
          name: "Q2 Marketing Strategy.pdf",
          type: "PDF",
          uploadedBy: "Alex Johnson",
          uploadedAt: "2023-04-15",
        },
        {
          id: "2",
          name: "Brand Guidelines.docx",
          type: "DOCX",
          uploadedBy: "Taylor Wilson",
          uploadedAt: "2023-04-10",
        },
        {
          id: "3",
          name: "Social Media Calendar.xlsx",
          type: "XLSX",
          uploadedBy: "Morgan Lee",
          uploadedAt: "2023-04-12",
        },
      ],
      discussions: [
        // this is krishna
        {
          id: "1",
          title: "Spring Campaign Ideas",
          messages: [
            {
              id: "1",
              sender: {
                name: "Alex Johnson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
              },
              content:
                "Let's brainstorm some ideas for the spring campaign. I was thinking we could focus on sustainability.",
              timestamp: "2023-04-14 09:30",
            },
            {
              id: "2",
              sender: {
                name: "Jamie Smith",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
              },
              content:
                "That's a great idea! We could highlight our eco-friendly initiatives.",
              timestamp: "2023-04-14 09:45",
            },
            {
              id: "3",
              sender: {
                name: "Taylor Wilson",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
              },
              content:
                "I can start working on some visual concepts that emphasize nature and green themes.",
              timestamp: "2023-04-14 10:15",
            },
          ],
        },
        {
          id: "2",
          title: "Website Redesign Discussion",
          messages: [
            {
              id: "1",
              sender: {
                name: "Morgan Lee",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
              },
              content:
                "The website needs a refresh to align with our new branding.",
              timestamp: "2023-04-13 14:20",
            },
            {
              id: "2",
              sender: {
                name: "Taylor Wilson",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
              },
              content:
                "I agree. I've been working on some mockups that I can share tomorrow.",
              timestamp: "2023-04-13 14:35",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Event Planning",
      description:
        "Space for organizing and coordinating chapter events and activities.",
      members: [
        {
          id: "1",
          name: "Alex Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          role: "Event Coordinator",
        },
        {
          id: "5",
          name: "Jordan Rivera",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
          role: "Logistics",
        },
        {
          id: "6",
          name: "Casey Brown",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
          role: "Volunteer Manager",
        },
      ],
      documents: [
        {
          id: "4",
          name: "Annual Conference Plan.pdf",
          type: "PDF",
          uploadedBy: "Jordan Rivera",
          uploadedAt: "2023-04-08",
        },
        {
          id: "5",
          name: "Volunteer Schedule.xlsx",
          type: "XLSX",
          uploadedBy: "Casey Brown",
          uploadedAt: "2023-04-11",
        },
      ],
      discussions: [
        {
          id: "3",
          title: "Annual Conference Planning",
          messages: [
            {
              id: "1",
              sender: {
                name: "Jordan Rivera",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
              },
              content:
                "We need to finalize the venue for the annual conference. Any suggestions?",
              timestamp: "2023-04-10 11:00",
            },
            {
              id: "2",
              sender: {
                name: "Casey Brown",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
              },
              content:
                "The downtown convention center has good rates for non-profits.",
              timestamp: "2023-04-10 11:15",
            },
          ],
        },
      ],
    },
  ],
  currentSpaceId = "1",
}: CollaborationSpaceProps) => {
  const [activeSpace, setActiveSpace] = useState(
    spaces.find((space) => space.id === currentSpaceId) || spaces[0],
  );
  const [activeTab, setActiveTab] = useState("discussions");
  const [newMessage, setNewMessage] = useState("");
  const [activeDiscussion, setActiveDiscussion] = useState(
    activeSpace.discussions[0],
  );
  const [isCreateSpaceDialogOpen, setIsCreateSpaceDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isNewDiscussionDialogOpen, setIsNewDiscussionDialogOpen] =
    useState(false);

  return (
    <div className="bg-white w-full h-full flex flex-col rounded-lg shadow-md border border-fuchsia-100">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold">Collaboration Spaces</h2>
        <Dialog
          open={isCreateSpaceDialogOpen}
          onOpenChange={setIsCreateSpaceDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="ml-auto bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Create Space
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collaboration Space</DialogTitle>
              <DialogDescription>
                Create a new space for your team to collaborate on projects and
                initiatives.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Space Name</label>
                <Input id="name" placeholder="Enter space name" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose of this space"
                />
              </div>
              <div className="grid gap-2">
                <label>Initial Members</label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                  <div className="flex items-center gap-2 bg-secondary p-1 px-2 rounded-full">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">Alex Johnson</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateSpaceDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsCreateSpaceDialogOpen(false)}
                className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
              >
                Create Space
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Spaces Sidebar */}
        <div className="w-64 border-r border-fuchsia-100 bg-gradient-to-b from-fuchsia-50/50 to-violet-50/50 p-4">
          <div className="font-medium mb-2">Your Spaces</div>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-2">
              {spaces.map((space) => (
                <Card
                  key={space.id}
                  className={`cursor-pointer hover:bg-fuchsia-50 ${activeSpace.id === space.id ? "bg-fuchsia-100 border-fuchsia-300" : ""}`}
                  onClick={() => setActiveSpace(space)}
                >
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">{space.name}</CardTitle>
                    <CardDescription className="text-xs truncate">
                      {space.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Space Header */}
          <div className="p-4 border-b border-fuchsia-100 bg-gradient-to-r from-fuchsia-50/50 to-violet-50/50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{activeSpace.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {activeSpace.description}
                </p>
              </div>
              <div className="flex -space-x-2">
                {activeSpace.members.slice(0, 3).map((member) => (
                  <Avatar
                    key={member.id}
                    className="border-2 border-background"
                  >
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {activeSpace.members.length > 3 && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border-2 border-background text-xs font-medium">
                    +{activeSpace.members.length - 3}
                  </div>
                )}
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white/70 border border-fuchsia-100">
                <TabsTrigger
                  value="discussions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Members
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {/* Discussions Tab */}
            {activeTab === "discussions" && (
              <div className="flex h-full">
                {/* Discussions List */}
                <div className="w-1/3 border-r border-fuchsia-100 p-4 overflow-auto bg-gradient-to-b from-fuchsia-50/30 to-violet-50/30">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Discussions</h4>
                    <Dialog
                      open={isNewDiscussionDialogOpen}
                      onOpenChange={setIsNewDiscussionDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-1" /> New
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Start New Discussion</DialogTitle>
                          <DialogDescription>
                            Create a new topic for discussion in this
                            collaboration space.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <label htmlFor="title">Discussion Title</label>
                            <Input
                              id="title"
                              placeholder="Enter a title for this discussion"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="initial-message">
                              Initial Message
                            </label>
                            <Textarea
                              id="initial-message"
                              placeholder="Start the conversation..."
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsNewDiscussionDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => setIsNewDiscussionDialogOpen(false)}
                          >
                            Create Discussion
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <ScrollArea className="h-[calc(100vh-350px)]">
                    <div className="space-y-2">
                      {activeSpace.discussions.map((discussion) => (
                        <Card
                          key={discussion.id}
                          className={`cursor-pointer hover:bg-fuchsia-50 ${activeDiscussion.id === discussion.id ? "bg-fuchsia-100 border-fuchsia-300" : ""}`}
                          onClick={() => setActiveDiscussion(discussion)}
                        >
                          <CardHeader className="p-3">
                            <CardTitle className="text-sm">
                              {discussion.title}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {discussion.messages.length} messages • Last
                              activity:{" "}
                              {
                                discussion.messages[
                                  discussion.messages.length - 1
                                ]?.timestamp.split(" ")[0]
                              }
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Discussion Messages */}
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b border-fuchsia-100 bg-gradient-to-r from-fuchsia-50/30 to-violet-50/30">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{activeDiscussion.title}</h4>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {activeDiscussion.messages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar>
                            <AvatarImage
                              src={message.sender.avatar}
                              alt={message.sender.name}
                            />
                            <AvatarFallback>
                              {message.sender.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {message.sender.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp}
                              </span>
                            </div>
                            <div className="mt-1">{message.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Shared Documents</h4>
                  <Dialog
                    open={isUploadDialogOpen}
                    onOpenChange={setIsUploadDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Upload
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Document</DialogTitle>
                        <DialogDescription>
                          Share a document with members of this collaboration
                          space.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="mt-2">
                            Drag and drop your file here, or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supports PDF, DOCX, XLSX, and other common formats
                          </p>
                          <Input
                            type="file"
                            className="hidden"
                            id="file-upload"
                          />
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() =>
                              document.getElementById("file-upload")?.click()
                            }
                          >
                            Browse Files
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsUploadDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsUploadDialogOpen(false)}>
                          Upload
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeSpace.documents.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden">
                      <div className="bg-muted p-4 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-primary" />
                      </div>
                      <CardContent className="p-4">
                        <h5 className="font-medium truncate">{doc.name}</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          {doc.type} • Uploaded by {doc.uploadedBy}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.uploadedAt}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === "members" && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Space Members</h4>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Invite
                  </Button>
                </div>
                <div className="space-y-4">
                  {activeSpace.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-fuchsia-50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-medium">{member.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSpace;
