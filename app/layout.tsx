// app\layout.tsx
import type React from "react";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Nayon Kanti Halder | Full Stack Developer, Software Engineer & AI Specialist",
  description:
    "Portfolio of Nayon Kanti Halder - Experience the future of web development with Nayon Kanti Halder - Full Stack Developer specializing in AI integration, MERN stack, and cutting-edge digital experiences.",
  keywords:
    "Full Stack Developer, MERN Stack, AI Integration, React, Next.js, Node.js, MongoDB, TypeScript",
  authors: [{ name: "Nayon Kanti Halder" }],
  creator: "Nayon Kanti Halder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nayonkanti.dev",
    title:
      "Nayon Kanti Halder | Full Stack Developer, Software Engineer & AI Specialist",
    description:
      "Creating innovative digital experiences with cutting-edge technologies",
    siteName: "Nayon Kanti Halder Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Stack Developer, Software Engineer & AI Specialist",
    description:
      "Creating innovative digital experiences with cutting-edge technologies",
    creator: "@nrbnayon",
    site: "@nrbnayon",
  },
  generator: "nrbnayon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}

