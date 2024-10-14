"use client"; // Ensure this component runs on the client-side
import React, { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea component
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar components
import { Input } from "@/components/ui/input"; // Import Input component
import { Button } from "@/components/ui/button"; // Import Button component
import { useUser } from "@clerk/nextjs";

interface Message {
  id: string;
  content: string;
  userId: string;
  userName: string; // Adding userName field to display in the message
  avatarUrl?: string; // Optional field for user avatar
}

const Discussion: React.FC<{ category: string }> = ({ category }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { isSignedIn, user, isLoaded } = useUser(); // Using usUser hook to get user info

  // Fetch messages initially and every 5 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/discussions/${category}`);
        if (response.ok) {
          const data: Message[] = await response.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch messages immediately on mount
    fetchMessages();

    // Set an interval to fetch messages every 5 seconds
    const intervalId = setInterval(fetchMessages, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [category]);

  const handleSendMessage = async () => {
    if (!isSignedIn || !newMessage.trim()) return; // Check if the user is signed in and prevent sending empty messages

    const response = await fetch(`/api/discussions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        discussionId: category, // Using category as discussionId
        userId: user?.id, // Clerk user ID
        content: newMessage,
        userName: user?.firstName || "Anonymous", // Clerk user name or fallback
        avatarUrl: user?.imageUrl, // Clerk user profile image URL
      }),
    });

    if (response.ok) {
      const message: Message = await response.json();
      setMessages((prev) => [...prev, message]); // Update messages with the new message
      setNewMessage(""); // Clear the input field after sending
    } else {
      console.error("Failed to send message");
    }
  };

  // Handle loading state
  if (!isLoaded) {
    return <div>Loading...</div>; // Show a loading message while the user status is being loaded
  }

  return (
    <div className="flex flex-col h-[800px]">
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="text-xl font-bold">Discussions: {category}</h1>
      </header>
      <ScrollArea className="flex-1 px-4 py-2 space-y-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-2">
              <Avatar>
                <AvatarImage src={msg.avatarUrl || "/placeholder-user.jpg"} alt={msg.userName} />
                <AvatarFallback>{msg.userName?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <div className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
                <p className="font-semibold">{msg.userName}</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center px-4 py-2 border-t">
        <Input
          className="flex-1 mr-2"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Discussion;
