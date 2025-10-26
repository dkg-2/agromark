"use client";

import { useState, useEffect, useRef } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { cn } from "@/lib/utils"; // Ensure cn is imported

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling

  const placeholders = [
    "How do I identify early blight in tomatoes?",
    "What's the best fertilizer for sandy soil?",
    "Tell me about sustainable farming practices.",
    "What are the symptoms of nutrient deficiency in corn?",
    "How can I improve my crop yield?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, sender: "user" as const };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue(""); // Clear input after sending
    setIsLoading(true);

    try {
      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }), // Send current messages + new user message
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || "Failed to get AI response");
      }

      const data = await apiResponse.json();
      const aiResponse = { text: data.response, sender: "ai" as const };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error: any) {
      console.error("Error during chat:", error);
      const errorMessage = {
        text: `Error: ${error.message}`,
        sender: "ai" as const,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <h1 className="text-4xl font-bold text-center py-8">AI Chat Assistant</h1>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "user" ? (
                // User message bubble
                <div className="max-w-md rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                  {msg.text}
                </div>
              ) : (
                // AI response - no bubble, wider for tables/code
                <div
                  className="prose prose-sm w-full max-w-none dark:prose-invert prose-a:text-blue-500 hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-muted text-muted-foreground">
                AI is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t bg-card">
        <div className="max-w-3xl mx-auto">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
