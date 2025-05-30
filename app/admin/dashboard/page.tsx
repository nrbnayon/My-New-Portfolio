"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, MessageSquare, User } from "lucide-react";
import AdminHeader from "@/components/admin/admin-header";
import ProjectsManager from "@/components/admin/projects-manager";
import ExperienceManager from "@/components/admin/experience-manager";
import MessagesManager from "@/components/admin/messages-manager";
import ProfileManager from "@/components/admin/profile-manager";

interface DashboardStats {
  totalProjects: number;
  totalExperiences: number;
  totalMessages: number;
  lastUpdated: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/login");
    },
  });

  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalExperiences: 0,
    totalMessages: 0,
    lastUpdated: new Date().toLocaleDateString(),
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);

        const response = await fetch("/api/dashboard/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();

        setStats({
          totalProjects: data.totalProjects,
          totalExperiences: data.totalExperiences,
          totalMessages: data.totalMessages,
          lastUpdated: new Date(data.lastUpdated).toLocaleDateString(),
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Keep default values on error
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
          <p className='text-muted-foreground'>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-secondary/20'>
      <AdminHeader />

      <main className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Admin Dashboard</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {isLoadingStats ? (
                  <div className='h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
                ) : (
                  stats.totalProjects
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                Experience Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {isLoadingStats ? (
                  <div className='h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
                ) : (
                  stats.totalExperiences
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {isLoadingStats ? (
                  <div className='h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
                ) : (
                  stats.totalMessages
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm font-medium'>
                {isLoadingStats ? "Loading..." : stats.lastUpdated}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue='projects'>
          <TabsList className='grid grid-cols-4 mb-8'>
            <TabsTrigger value='projects' className='flex items-center gap-2'>
              <Briefcase className='h-4 w-4' /> Projects
            </TabsTrigger>
            <TabsTrigger value='experience' className='flex items-center gap-2'>
              <FileText className='h-4 w-4' /> Experience
            </TabsTrigger>
            <TabsTrigger value='messages' className='flex items-center gap-2'>
              <MessageSquare className='h-4 w-4' /> Messages
            </TabsTrigger>
            <TabsTrigger value='profile' className='flex items-center gap-2'>
              <User className='h-4 w-4' /> Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value='projects'>
            <ProjectsManager />
          </TabsContent>

          <TabsContent value='experience'>
            <ExperienceManager />
          </TabsContent>

          <TabsContent value='messages'>
            <MessagesManager />
          </TabsContent>

          <TabsContent value='profile'>
            <ProfileManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
