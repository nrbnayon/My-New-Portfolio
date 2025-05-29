"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AIChat } from "@/components/ai-chat";
import { NeuralNetworkBackground } from "@/components/ui/neural-network-bg";
import { FloatingTechIcons } from "@/components/ui/floating-tech-icons";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FuturisticLoader } from "@/components/ui/futuristic-loader";
import { AnimatePresence } from "framer-motion";
import EnhancedNeuralBackground from "@/components/common/background-animation";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { AnimatedBackground } from "@/components/ui/animated-background";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <title>Full Stack Developer, Software Engineer & AI Specialist</title>
        <meta
          name='description'
          content='Portfolio of Nayon Kanti Halder - Experience the future of web development with Nayon Kanti Halder - Full Stack Developer specializing in AI integration, MERN stack, and cutting-edge digital experiences.'
        />
        <meta
          name='keywords'
          content='AI Developer, Full Stack Developer, MERN Stack, AI Integration, React, Next.js, Node.js, Express.js MongoDB, TypeScript, Neural Networks'
        />
      </head>
      <body
        className={`${inter.className} bg-black text-white overflow-x-hidden`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnimatePresence mode='wait'>
            {isLoading ? (
              <FuturisticLoader
                key='loader'
                onComplete={() => setIsLoading(false)}
              />
            ) : (
              <>
                {/* Background elements with lowest z-index */}
                <div className='fixed inset-0 z-0'>
                  <CustomCursor />
                  <NeuralNetworkBackground />
                  <EnhancedNeuralBackground />
                  <FloatingShapes />
                  <FloatingTechIcons />
                </div>

                {/* Main content with medium z-index */}
                <div className='relative z-20 flex flex-col min-h-screen'>
                  <Header />
                  <main className='flex-1'>{children}</main>
                  <Footer />
                </div>

                {/* AI Chat with highest z-index - moved outside main content */}
                <AIChat />
              </>
            )}
          </AnimatePresence>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
