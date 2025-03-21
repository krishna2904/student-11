import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

interface MessageCenterProps {
  conversations?: Conversation[];
  activeConversationId?: string;
  messages?: Message[];
  currentUserId?: string;
}

const MessageCenter: React.FC<MessageCenterProps> = ({
  conversations = [
    {
      id: "1",
      participantId: "user1",
      participantName: "Alex Johnson",
      participantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      lastMessage: "Can you share the event planning document?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
    },
    {
      id: "2",
      participantId: "user2",
      participantName: "Sam Taylor",
      participantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      lastMessage: "I've updated the membership roster",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
    },
    {
      id: "3",
      participantId: "user3",
      participantName: "Jamie Rivera",
      participantAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      lastMessage: "Looking forward to the next meeting",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 0,
    },
    {
      id: "4",
      participantId: "user4",
      participantName: "Chapter Leadership",
      participantAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Leadership",
      lastMessage: "Budget approval for next quarter",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 5,
    },
    {
      id: "5",
      participantId: "user5",
      participantName: "Event Committee",
      participantAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Events",
      lastMessage: "New venue options for the annual conference",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
      unreadCount: 0,
    },
    // this is krishna
  ],
  activeConversationId = "1",
  messages = [
    {
      id: "m1",
      senderId: "user1",
      content: "Hi there! I wanted to discuss the upcoming chapter event.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true,
    },
    {
      id: "m2",
      senderId: "currentUser",
      content: "Sure, what do you need help with?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isRead: true,
    },
    {
      id: "m3",
      senderId: "user1",
      content:
        "I'm working on the presentation slides and wanted to know if you have any specific topics you'd like me to cover.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isRead: true,
    },
    {
      id: "m4",
      senderId: "currentUser",
      content:
        "Yes, could you include a section on our recent membership growth and the new initiatives we're planning?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isRead: true,
    },
    {
      id: "m5",
      senderId: "user1",
      content:
        "Absolutely! I'll make sure to highlight those points. Can you share the event planning document with me?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isRead: true,
    },
    {
      id: "m6",
      senderId: "user1",
      content: "Also, do we have a confirmed time slot for the presentation?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false,
    },
  ],
  currentUserId = "currentUser",
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId,
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // Logic to send message would go here
    setNewMessage("");
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-full w-full bg-white border border-fuchsia-100 rounded-lg overflow-hidden shadow-md">
      {/* Conversations List */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4 pt-2">
            <TabsList className="w-full bg-fuchsia-50/50">
              <TabsTrigger
                value="all"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                Unread
              </TabsTrigger>
              <TabsTrigger
                value="groups"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                Groups
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center p-3 rounded-lg mb-1 cursor-pointer hover:bg-fuchsia-50 ${conversation.id === activeConversationId ? "bg-fuchsia-100" : ""}`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.participantAvatar}
                          alt={conversation.participantName}
                        />
                        <AvatarFallback>
                          {conversation.participantName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">
                          {conversation.participantName}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${conversation.unreadCount > 0 ? "font-medium" : "text-muted-foreground"}`}
                      >
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="p-2">
                {filteredConversations
                  .filter((conv) => conv.unreadCount > 0)
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center p-3 rounded-lg mb-1 cursor-pointer hover:bg-fuchsia-50 ${conversation.id === activeConversationId ? "bg-fuchsia-100" : ""}`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={conversation.participantAvatar}
                            alt={conversation.participantName}
                          />
                          <AvatarFallback>
                            {conversation.participantName.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">
                            {conversation.participantName}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                        <p className="text-sm truncate font-medium">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="groups" className="m-0">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="p-2">
                {filteredConversations
                  .filter((conv) =>
                    ["Chapter Leadership", "Event Committee"].includes(
                      conv.participantName,
                    ),
                  )
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center p-3 rounded-lg mb-1 cursor-pointer hover:bg-fuchsia-50 ${conversation.id === activeConversationId ? "bg-fuchsia-100" : ""}`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={conversation.participantAvatar}
                            alt={conversation.participantName}
                          />
                          <AvatarFallback>
                            {conversation.participantName.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">
                            {conversation.participantName}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                        <p
                          className={`text-sm truncate ${conversation.unreadCount > 0 ? "font-medium" : "text-muted-foreground"}`}
                        >
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Message Area */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={activeConversation.participantAvatar}
                  alt={activeConversation.participantName}
                />
                <AvatarFallback>
                  {activeConversation.participantName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h3 className="font-medium">
                  {activeConversation.participantName}
                </h3>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUserId;
              const showDate =
                index === 0 ||
                formatDate(messages[index - 1].timestamp) !==
                  formatDate(message.timestamp);

              return (
                <React.Fragment key={message.id}>
                  {showDate && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage
                          src={activeConversation.participantAvatar}
                          alt={activeConversation.participantName}
                        />
                        <AvatarFallback>
                          {activeConversation.participantName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="max-w-[70%]">
                      <div
                        className={`p-3 rounded-lg ${isCurrentUser ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white" : "bg-fuchsia-50"}`}
                      >
                        {message.content}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                        {isCurrentUser && message.isRead && (
                          <span className="ml-2">Read</span>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
            <p className="text-muted-foreground">
              Choose a conversation from the list to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;
