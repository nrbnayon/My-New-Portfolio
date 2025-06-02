"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Bot, Send, X, User, Trash2, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

// Initialize Groq with API key
const groqClient = createGroq({
  apiKey:
    process.env.GROQ_API_KEY ||
    "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",
});

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// Badge component for active status indicator
const ActiveBadge = ({
  isActive = true,
  size = "default",
  className = "",
}: {
  isActive?: boolean;
  size?: "small" | "default" | "large";
  className?: string;
}) => {
  const sizeClasses = {
    small: "w-2.5 h-2.5",
    default: "w-3 h-3",
    large: "w-4 h-4",
  };

  const statusClasses = isActive
    ? "bg-green-500 border-green-400"
    : "bg-gray-400 border-gray-300";

  return (
    <div
      className={cn(
        "absolute top-0 right-1 border-2 border-white rounded-full shadow-sm",
        sizeClasses[size],
        statusClasses,
        className
      )}
    />
  );
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! 👋 I'm Nayon's AI assistant. I'm here to help you learn more about his skills, projects, and experience. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAIActive, setIsAIActive] = useState(true); // State for AI active status
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Simulate AI activity status based on loading state
  useEffect(() => {
    setIsAIActive(!isLoading);
  }, [isLoading]);

  // Clear all messages
  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! 🧹 How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare the conversation history for the AI
      const conversation = messages
        .slice(-10) // Keep only last 10 messages for context
        .map(
          (msg) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n");

      const prompt = `You are a friendly and helpful AI assistant for Nayon Kanti Halder's portfolio website. Be conversational, warm, and use emojis occasionally to make the chat feel natural and engaging.

        About Nayon:
        - Full Stack Developer specializing in MERN stack 💻
        - Currently working at Join Venture AI Artificial Intelligence (JVAI) since January 2025
        - Previously Software Engineer Intern at Innovate International Ltd (October 2024 – December 2024)
        - BSc in Computer Science and Engineering from United International University (2019-2023)
        - Skills: React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, JavaScript, Tailwind CSS, and more
        - Location: Vatara, Dhaka, Bangladesh 🇧🇩
        - Email: nrbnayon@gmail.com
        - Phone: +8801934025581
        - GitHub: https://github.com/nrbnayon
        - LinkedIn: https://www.linkedin.com/in/itsnayon

        Key Projects:
        - LMS (Learning Management System): Comprehensive online learning platform with payment integration using Stripe 📚
        - RMS (Restaurant Management System): Modern food ordering website with real-time updates 🍽️

        Be helpful, friendly, and professional. Keep responses concise but informative. If you don't know specific details, encourage visitors to contact Nayon directly. Use a conversational tone as if you're chatting with a friend.

        Recent conversation:
        ${conversation}

        User: ${input.trim()}
        Assistant:`;

      // Use the AI SDK to generate a response with the Groq API
      const { text } = await generateText({
        model: groqClient("llama-3.3-70b-versatile"),
        prompt,
        maxTokens: 5500,
        temperature: 0.8,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);

      // Fallback to the backup model if the primary model fails
      try {
        const { text } = await generateText({
          model: groqClient("llama-3.1-8b-instant"),
          prompt: `You are Nayon Kanti Halder's friendly portfolio assistant. Answer warmly about his skills as a Full Stack Developer. User asked: ${input.trim()}`,
          maxTokens: 5500,
          temperature: 0.8,
        });

        const assistantMessage: Message = {
          role: "assistant",
          content: text,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (fallbackError) {
        console.error("Fallback model also failed:", fallbackError);

        const errorMessage: Message = {
          role: "assistant",
          content:
            "Oops! 😅 I'm having some technical difficulties right now. Please feel free to reach out to Nayon directly at nrbnayon@gmail.com or +880 1934025581. He'd love to chat about his work and experience!",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className='fixed bottom-6 right-6 z-[9999] pointer-events-none'>
        <Button
          onClick={() => setIsOpen(true)}
          className='rounded-full h-14 w-14 p-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white pointer-events-auto transition-all duration-300 hover:scale-110 hover:shadow-2xl'
          style={{ zIndex: 9999 }}
        >
          <MessageCircle className='h-7 w-7' />
        </Button>
        <ActiveBadge isActive={isAIActive} />
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className='h-[85vh] max-h-[600px] z-[10000] mx-auto max-w-lg bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 '>
          {/* Header */}
          <DrawerHeader className='border-b bg-gradient-to-r from-blue-50 to-purple-50 pb-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {/* Avatar with Active Badge */}
                <div className='relative'>
                  <Avatar className='h-10 w-10 border-2 border-white shadow-md'>
                    <AvatarImage src='/api/placeholder/40/40' alt='Nayon AI' />
                    <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold'>
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <ActiveBadge isActive={isAIActive} />
                </div>
                <div>
                  <DrawerTitle className='text-lg font-semibold text-gray-800'>
                    Chat with Nayon's AI
                  </DrawerTitle>
                  <DrawerDescription className='text-sm text-gray-600'>
                    {isAIActive ? "Online • Ask me anything!" : "Processing..."}
                  </DrawerDescription>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleClearChat}
                  className='h-8 w-8 p-0 text-gray-500 hover:text-red-500 hover:bg-red-50'
                  title='Clear chat'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
                <DrawerClose className='h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full'>
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Close</span>
                </DrawerClose>
              </div>
            </div>
          </DrawerHeader>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50'
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-3 max-w-[85%] animate-in slide-in-from-bottom-2 duration-300",
                  message.role === "user"
                    ? "ml-auto flex-row-reverse"
                    : "mr-auto"
                )}
              >
                {/* Avatar with Badge for message bubbles */}
                <div className='relative'>
                  <Avatar className='h-8 w-8 flex-shrink-0 shadow-sm'>
                    {message.role === "assistant" ? (
                      <>
                        <AvatarImage
                          src='/api/placeholder/32/32'
                          alt='AI Assistant'
                        />
                        <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold'>
                          <Bot className='h-4 w-4' />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src='/api/placeholder/32/32' alt='User' />
                        <AvatarFallback className='bg-gradient-to-r from-green-500 to-teal-600 text-white text-xs font-semibold'>
                          <User className='h-4 w-4' />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  {message.role === "assistant" && (
                    <ActiveBadge isActive={true} size='small' />
                  )}
                  {message.role === "user" && (
                    <ActiveBadge isActive={true} size='small' />
                  )}
                </div>

                {/* Message Bubble */}
                <div className='flex flex-col max-w-full'>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm break-words",
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                    )}
                  >
                    <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                      {message.content}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <span
                    className={cn(
                      "text-xs text-gray-700 mt-1 px-1",
                      message.role === "user" ? "text-right" : "text-left"
                    )}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className='flex items-end gap-3 max-w-[85%] animate-in slide-in-from-bottom-2 duration-300'>
                <div className='relative'>
                  <Avatar className='h-8 w-8 shadow-sm'>
                    <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs'>
                      <Bot className='h-4 w-4' />
                    </AvatarFallback>
                  </Avatar>
                  <ActiveBadge isActive={false} size='small' />
                </div>
                <div className='bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-sm'>
                  <div className='flex items-center space-x-2'>
                    <div className='flex space-x-1'>
                      <div className='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                      <div className='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                      <div className='h-2 w-2 bg-gray-400 rounded-full animate-bounce'></div>
                    </div>
                    <span className='text-xs text-gray-500'>
                      AI is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <DrawerFooter className='border-t bg-white p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex-1 relative'>
                <Input
                  placeholder='Type your message...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className='pr-12 rounded-full text-black border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors'
                />
              </div>
              <Button
                size='icon'
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className='rounded-full h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
              >
                <Send className='h-4 w-4' />
                <span className='sr-only'>Send message</span>
              </Button>
            </div>

            {/* Footer text */}
            <p className='text-xs text-gray-500 text-center mt-2'>
              Powered by AI • Ask me anything about Nayon's skills, projects, or
              experience! 😊
            </p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer";
// import { Input } from "@/components/ui/input";
// import { Bot, Send, X } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";
// import { generateText } from "ai";
// import { createGroq } from "@ai-sdk/groq";

// // Initialize Groq with API key
// const groqClient = createGroq({
//   apiKey:
//     process.env.GROQ_API_KEY ||
//     "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",
// });

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export function AIChat() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content: "Hi there! I'm Nayon's AI assistant. How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       role: "user",
//       content: input,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       // Prepare the conversation history for the AI
//       const conversation = messages
//         .map(
//           (msg) =>
//             `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
//         )
//         .join("\n");

//       const prompt = `You are a helpful AI assistant for Nayon Kanti Halder's portfolio website.

// About Nayon:
// - Full Stack Developer specializing in MERN stack
// - Currently working at Join Venture AI Artificial Intelligence (JVAI) since January 2025
// - Previously Software Engineer Intern at Innovate International Ltd (October 2024 – December 2025)
// - BSc in Computer Science and Engineering from United International University (2019-2023)
// - Skills: React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, JavaScript, and more
// - Location: Vatara, Dhaka, Bangladesh
// - Email: nrbnayon@gmail.com
// - Phone: +880 1934025581
// - GitHub: https://github.com/nrbnayon
// - LinkedIn: https://www.linkedin.com/in/itsnayon

// Projects:
// - LMS (Learning Management System): Online platform with payment integration using Stripe
// - RMS (Restaurant Management System): Food selling website with real-time updates

// Answer questions about Nayon's skills, experience, projects, and how to contact him. Be concise, friendly, and professional. If you don't know something specific, suggest the visitor contact him directly.

// Conversation history:
// ${conversation}

// User: ${input}
// Assistant:`;

//       // Use the AI SDK to generate a response with the Groq API
//       const { text } = await generateText({
//         model: groqClient("llama-3.3-70b-versatile"),
//         prompt,
//         maxTokens: 500,
//         temperature: 0.7,
//       });

//       const assistantMessage: Message = {
//         role: "assistant",
//         content: text,
//       };

//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error("Error generating AI response:", error);

//       // Fallback to the backup model if the primary model fails
//       try {
//         const { text } = await generateText({
//           model: groqClient("llama-3.1-8b-instant"),
//           prompt: `You are Nayon Kanti Halder's portfolio assistant. Answer briefly about his skills as a Full Stack Developer. User asked: ${input}`,
//           maxTokens: 300,
//           temperature: 0.7,
//         });

//         const assistantMessage: Message = {
//           role: "assistant",
//           content: text,
//         };

//         setMessages((prev) => [...prev, assistantMessage]);
//       } catch (fallbackError) {
//         console.error("Fallback model also failed:", fallbackError);

//         const errorMessage: Message = {
//           role: "assistant",
//           content:
//             "I'm sorry, I'm having trouble connecting right now. Please feel free to contact Nayon directly at nrbnayon@gmail.com or +880 1934025581 for any questions about his work and experience.",
//         };

//         setMessages((prev) => [...prev, errorMessage]);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <>
//       {/* Fixed positioning with proper z-index */}
//       <div className='fixed bottom-4 right-4 z-[9999] pointer-events-none'>
//         <Button
//           onClick={() => setIsOpen(true)}
//           className='rounded-full h-12 w-12 p-0 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground pointer-events-auto transition-all duration-200 hover:scale-110'
//           style={{ zIndex: 9999 }}
//         >
//           <Bot className='h-6 w-6' />
//         </Button>
//       </div>

//       <Drawer open={isOpen} onOpenChange={setIsOpen}>
//         <DrawerContent className='h-[80vh] z-[10000]'>
//           <DrawerHeader className='border-b'>
//             <DrawerTitle>Chat with Nayon's AI Assistant</DrawerTitle>
//             <DrawerDescription>
//               Ask me anything about Nayon's skills, projects, or experience.
//             </DrawerDescription>
//             <DrawerClose className='absolute right-4 top-4'>
//               <X className='h-4 w-4' />
//               <span className='sr-only'>Close</span>
//             </DrawerClose>
//           </DrawerHeader>

//           <div className='flex-1 overflow-y-auto p-4 space-y-4'>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={cn(
//                   "flex items-start gap-3 max-w-[80%]",
//                   message.role === "user" ? "ml-auto" : ""
//                 )}
//               >
//                 {message.role === "assistant" && (
//                   <Avatar className='h-8 w-8'>
//                     <AvatarImage
//                       src='/placeholder.svg?height=32&width=32'
//                       alt='AI'
//                     />
//                     <AvatarFallback>AI</AvatarFallback>
//                   </Avatar>
//                 )}

//                 <div
//                   className={cn(
//                     "rounded-lg p-3",
//                     message.role === "user"
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-muted"
//                   )}
//                 >
//                   {message.content}
//                 </div>

//                 {message.role === "user" && (
//                   <Avatar className='h-8 w-8'>
//                     <AvatarImage
//                       src='/placeholder.svg?height=32&width=32'
//                       alt='User'
//                     />
//                     <AvatarFallback>U</AvatarFallback>
//                   </Avatar>
//                 )}
//               </div>
//             ))}

//             {isLoading && (
//               <div className='flex items-start gap-3'>
//                 <Avatar className='h-8 w-8'>
//                   <AvatarImage
//                     src='/placeholder.svg?height=32&width=32'
//                     alt='AI'
//                   />
//                   <AvatarFallback>AI</AvatarFallback>
//                 </Avatar>
//                 <div className='bg-muted rounded-lg p-3'>
//                   <div className='flex space-x-2'>
//                     <div className='h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]'></div>
//                     <div className='h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]'></div>
//                     <div className='h-2 w-2 bg-current rounded-full animate-bounce'></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <DrawerFooter className='border-t pt-2'>
//             <div className='flex items-center gap-2'>
//               <Input
//                 placeholder='Type your message...'
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 disabled={isLoading}
//                 className='cursor-text'
//                 style={{ cursor: "text" }}
//               />
//               <Button
//                 size='icon'
//                 onClick={handleSend}
//                 disabled={isLoading || !input.trim()}
//                 className='cursor-pointer'
//                 style={{ cursor: "pointer" }}
//               >
//                 <Send className='h-4 w-4' />
//                 <span className='sr-only'>Send</span>
//               </Button>
//             </div>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }

// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer";
// import { Input } from "@/components/ui/input";
// import { Bot, Send, X, Trash2, User } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";
// import { generateText } from "ai";
// import { createGroq } from "@ai-sdk/groq";

// // Initialize Groq with API key
// const groqClient = createGroq({
//   apiKey:
//     process.env.GROQ_API_KEY ||
//     "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",
// });

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// };

// export function AIChat() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "welcome",
//       role: "assistant",
//       content:
//         "👋 Hey there! I'm Nayon's AI assistant. I'm here to help you learn more about his skills, projects, and experience. What would you like to know?",
//       timestamp: new Date(),
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Auto-scroll to latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Focus input when drawer opens
//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => {
//         inputRef.current?.focus();
//       }, 100);
//     }
//   }, [isOpen]);

//   const clearAllMessages = () => {
//     setMessages([
//       {
//         id: "welcome-new",
//         role: "assistant",
//         content:
//           "👋 Chat cleared! I'm ready to help you again. What would you like to know about Nayon?",
//         timestamp: new Date(),
//       },
//     ]);
//   };

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: input.trim(),
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       // Prepare conversation history (last 10 messages for context)
//       const recentMessages = messages.slice(-10);
//       const conversation = recentMessages
//         .map(
//           (msg) =>
//             `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
//         )
//         .join("\n");

//       const prompt = `You are Nayon Kanti Halder's friendly AI assistant on his portfolio website. Be conversational, helpful, and personable while staying professional.

// About Nayon:
// - 🚀 Full Stack Developer specializing in MERN stack (MongoDB, Express.js, React.js, Next.js, Node.js)
// - 💼 Currently working at Join Venture AI Artificial Intelligence (JVAI) since January 2025
// - 🎓 Previously Software Engineer Intern at Innovate International Ltd (October 2024 – December 2024)
// - 🎓 BSc in Computer Science and Engineering from United International University (2019-2023)
// - 💻 Expert in: React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, JavaScript, Python, AI Integration
// - 🌍 Location: Vatara, Dhaka, Bangladesh
// - 📧 Email: nrbnayon@gmail.com
// - 📱 Phone: +880 1934025581
// - 🔗 GitHub: https://github.com/nrbnayon
// - 💼 LinkedIn: https://www.linkedin.com/in/itsnayon

// Key Projects:
// - 📚 LMS (Learning Management System): Comprehensive online learning platform with Stripe payment integration
// - 🍽️ RMS (Restaurant Management System): Dynamic food ordering system with real-time updates
// - 🤖 AI-powered applications with modern frameworks

// Communication Style:
// - Be friendly and conversational (use emojis occasionally)
// - Keep responses concise but informative
// - Show enthusiasm about Nayon's work
// - If you don't know something specific, warmly suggest contacting him directly
// - Use a natural, human-like tone

// Recent conversation:
// ${conversation}

// User: ${input.trim()}
// Assistant:`;

//       const { text } = await generateText({
//         model: groqClient("llama-3.3-70b-versatile"),
//         prompt,
//         maxTokens: 400,
//         temperature: 0.8,
//       });

//       const assistantMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: text,
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error("Error generating AI response:", error);

//       try {
//         const { text } = await generateText({
//           model: groqClient("llama-3.1-8b-instant"),
//           prompt: `You are Nayon Kanti Halder's friendly portfolio assistant. Answer conversationally about his skills as a Full Stack Developer. User asked: ${input.trim()}`,
//           maxTokens: 300,
//           temperature: 0.8,
//         });

//         const assistantMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: text,
//           timestamp: new Date(),
//         };

//         setMessages((prev) => [...prev, assistantMessage]);
//       } catch (fallbackError) {
//         console.error("Fallback model also failed:", fallbackError);

//         const errorMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content:
//             "🔧 Oops! I'm having some technical difficulties right now. Please feel free to reach out to Nayon directly at nrbnayon@gmail.com or +880 1934025581. He'd love to chat about his work! 😊",
//           timestamp: new Date(),
//         };

//         setMessages((prev) => [...prev, errorMessage]);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       <div className='fixed bottom-6 right-6 z-[9999]'>
//         <Button
//           onClick={() => setIsOpen(true)}
//           className='relative rounded-full h-14 w-14 p-0 shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-110 group'
//           style={{ zIndex: 9999 }}
//         >
//           <Bot className='h-7 w-7 transition-transform group-hover:scale-110' />
//           <div className='absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse'></div>
//         </Button>
//       </div>

//       <Drawer open={isOpen} onOpenChange={setIsOpen}>
//         <DrawerContent className='h-[85vh] max-w-md mx-auto z-[10000] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
//           {/* Header */}
//           <DrawerHeader className='border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30'>
//             <div className='flex items-center justify-between'>
//               <div className='flex items-center gap-3'>
//                 <Avatar className='h-10 w-10 border-2 border-primary/20'>
//                   <AvatarImage src='/api/placeholder/40/40' alt="Nayon's AI" />
//                   <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold'>
//                     <Bot className='h-5 w-5' />
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <DrawerTitle className='text-lg font-semibold text-left'>
//                     Nayon's AI Assistant
//                   </DrawerTitle>
//                   <DrawerDescription className='text-sm text-muted-foreground text-left'>
//                     Online • Ready to help
//                   </DrawerDescription>
//                 </div>
//               </div>
//               <div className='flex items-center gap-2'>
//                 <Button
//                   variant='ghost'
//                   size='sm'
//                   onClick={clearAllMessages}
//                   className='hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30'
//                   title='Clear chat'
//                 >
//                   <Trash2 className='h-4 w-4' />
//                 </Button>
//                 <DrawerClose>
//                   <Button
//                     variant='ghost'
//                     size='sm'
//                     className='hover:bg-gray-100 dark:hover:bg-gray-800'
//                   >
//                     <X className='h-4 w-4' />
//                   </Button>
//                 </DrawerClose>
//               </div>
//             </div>
//           </DrawerHeader>

//           {/* Messages Container */}
//           <div className='flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-gray-50/30 to-white dark:from-gray-900/30 dark:to-background'>
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={cn(
//                   "flex gap-3 max-w-[85%] group",
//                   message.role === "user"
//                     ? "ml-auto flex-row-reverse"
//                     : "mr-auto"
//                 )}
//               >
//                 {/* Avatar */}
//                 <Avatar
//                   className={cn(
//                     "h-8 w-8 flex-shrink-0 transition-transform group-hover:scale-105",
//                     message.role === "user" ? "order-1" : ""
//                   )}
//                 >
//                   {message.role === "assistant" ? (
//                     <>
//                       <AvatarImage
//                         src='/api/placeholder/32/32'
//                         alt='AI Assistant'
//                       />
//                       <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs'>
//                         <Bot className='h-4 w-4' />
//                       </AvatarFallback>
//                     </>
//                   ) : (
//                     <>
//                       <AvatarImage src='/api/placeholder/32/32' alt='You' />
//                       <AvatarFallback className='bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs'>
//                         <User className='h-4 w-4' />
//                       </AvatarFallback>
//                     </>
//                   )}
//                 </Avatar>

//                 {/* Message Bubble */}
//                 <div
//                   className={cn(
//                     "flex flex-col gap-1",
//                     message.role === "user" ? "items-end" : "items-start"
//                   )}
//                 >
//                   <div
//                     className={cn(
//                       "rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md max-w-full break-words",
//                       message.role === "user"
//                         ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
//                         : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-md"
//                     )}
//                   >
//                     <p className='text-sm leading-relaxed whitespace-pre-wrap'>
//                       {message.content}
//                     </p>
//                   </div>
//                   <span
//                     className={cn(
//                       "text-xs text-muted-foreground px-2 opacity-0 group-hover:opacity-100 transition-opacity",
//                       message.role === "user" ? "text-right" : "text-left"
//                     )}
//                   >
//                     {formatTime(message.timestamp)}
//                   </span>
//                 </div>
//               </div>
//             ))}

//             {/* Loading Indicator */}
//             {isLoading && (
//               <div className='flex gap-3 max-w-[85%] mr-auto'>
//                 <Avatar className='h-8 w-8 flex-shrink-0'>
//                   <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs'>
//                     <Bot className='h-4 w-4' />
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm'>
//                   <div className='flex items-center gap-1'>
//                     <div className='flex space-x-1'>
//                       <div className='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
//                       <div className='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
//                       <div className='h-2 w-2 bg-gray-400 rounded-full animate-bounce'></div>
//                     </div>
//                     <span className='text-xs text-muted-foreground ml-2'>
//                       AI is typing...
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Auto-scroll target */}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Footer */}
//           <DrawerFooter className='border-t bg-white/80 dark:bg-background/80 backdrop-blur p-4'>
//             <div className='flex items-end gap-2'>
//               <div className='flex-1 relative'>
//                 <Input
//                   ref={inputRef}
//                   placeholder='Type your message...'
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   disabled={isLoading}
//                   className='pr-12 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary transition-colors resize-none bg-white dark:bg-gray-800'
//                   maxLength={500}
//                 />
//                 <div className='absolute right-3 bottom-3 text-xs text-muted-foreground'>
//                   {input.length}/500
//                 </div>
//               </div>
//               <Button
//                 size='icon'
//                 onClick={handleSend}
//                 disabled={isLoading || !input.trim()}
//                 className='h-11 w-11 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
//               >
//                 <Send className='h-5 w-5' />
//               </Button>
//             </div>
//             <p className='text-xs text-muted-foreground text-center mt-2'>
//               Powered by AI • Ask me about Nayon's skills & projects
//             </p>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }
