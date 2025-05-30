"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Database,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type HealthStatus = {
  status: string;
  timestamp: string;
  environment: string;
  database: string;
  environmentVariables: {
    mongoUrl: boolean;
    adminEmail: boolean;
    adminPassword: boolean;
    nextAuthSecret: boolean;
    groqApiKey: boolean;
    resendApiKey: boolean;
  };
};

type SeedResult = {
  success: boolean;
  message: string;
  results: {
    projects: { existing: number; inserted: number };
    experiences: { existing: number; inserted: number };
    profile: { existing: number; inserted: number };
  };
};

export default function SetupPage() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch health status");
      }
      setHealthStatus(data);
    } catch (error) {
      console.error("Health check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const seedDatabase = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch("/api/seed", { method: "POST" });
      const data: SeedResult = await response.json();

      if (data.success) {
        toast({
          title: "Database Seeded Successfully",
          description: `Added ${data.results.projects.inserted} projects, ${data.results.experiences.inserted} experiences, and ${data.results.profile.inserted} profile.`,
        });
        checkHealth(); // Refresh status
      } else {
        throw new Error(data.message || "Failed to seed database");
      }
    } catch (error) {
      toast({
        title: "Seeding Failed",
        description: "Failed to seed the database. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const clearDatabase = async () => {
    if (
      !confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsClearing(true);
    try {
      const response = await fetch("/api/seed", { method: "DELETE" });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Database Cleared",
          description: "All data has been removed from the database.",
        });
        checkHealth(); // Refresh status
      } else {
        throw new Error("Failed to clear database");
      }
    } catch (error) {
      toast({
        title: "Clear Failed",
        description: "Failed to clear the database. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const envVarStatus = [
    {
      name: "MONGO_URL",
      status: healthStatus?.environmentVariables.mongoUrl,
      required: true,
    },
    {
      name: "ADMIN_EMAIL",
      status: healthStatus?.environmentVariables.adminEmail,
      required: true,
    },
    {
      name: "ADMIN_PASSWORD",
      status: healthStatus?.environmentVariables.adminPassword,
      required: true,
    },
    {
      name: "NEXTAUTH_SECRET",
      status: healthStatus?.environmentVariables.nextAuthSecret,
      required: true,
    },
    {
      name: "GROQ_API_KEY",
      status: healthStatus?.environmentVariables.groqApiKey,
      required: true,
    },
    {
      name: "RESEND_API_KEY",
      status: healthStatus?.environmentVariables.resendApiKey,
      required: false,
    },
  ];

  const allRequiredVarsSet = envVarStatus
    .filter((v) => v.required)
    .every((v) => v.status);

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-4'>Portfolio Setup Status</h1>
          <p className='text-muted-foreground'>
            Check your application configuration and environment variables
          </p>
        </div>

        <div className='grid gap-6'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>System Health</CardTitle>
              <Button
                onClick={checkHealth}
                disabled={isLoading}
                size='sm'
                variant='outline'
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {healthStatus ? (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span>Overall Status:</span>
                    <Badge
                      variant={
                        healthStatus.status === "healthy"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {healthStatus.status}
                    </Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Environment:</span>
                    <Badge variant='outline'>{healthStatus.environment}</Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Database:</span>
                    <Badge
                      variant={
                        healthStatus.database === "connected"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {healthStatus.database}
                    </Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Database Name:</span>
                    <Badge variant='outline'>Portfolio</Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Last Checked:</span>
                    <span className='text-sm text-muted-foreground'>
                      {new Date(healthStatus.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className='text-center py-4'>
                  <div className='h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                  <p className='text-muted-foreground'>
                    Checking system health...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {envVarStatus.map((envVar) => (
                  <div
                    key={envVar.name}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <span className='font-mono text-sm'>{envVar.name}</span>
                      {!envVar.required && (
                        <Badge variant='outline' className='text-xs'>
                          Optional
                        </Badge>
                      )}
                    </div>
                    <div className='flex items-center gap-2'>
                      {envVar.status ? (
                        <CheckCircle className='h-5 w-5 text-green-500' />
                      ) : (
                        <XCircle className='h-5 w-5 text-red-500' />
                      )}
                      <Badge
                        variant={envVar.status ? "default" : "destructive"}
                      >
                        {envVar.status ? "Set" : "Missing"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-sm text-muted-foreground'>
                Initialize your portfolio with sample data or clear existing
                data.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Button
                  onClick={seedDatabase}
                  disabled={isSeeding || !allRequiredVarsSet}
                >
                  <Database className='h-4 w-4 mr-2' />
                  {isSeeding ? "Seeding..." : "Seed Database"}
                </Button>
                <Button
                  onClick={clearDatabase}
                  disabled={isClearing || !allRequiredVarsSet}
                  variant='destructive'
                >
                  <Trash2 className='h-4 w-4 mr-2' />
                  {isClearing ? "Clearing..." : "Clear Database"}
                </Button>
              </div>
              {!allRequiredVarsSet && (
                <p className='text-sm text-yellow-600'>
                  ⚠️ Please ensure all required environment variables are set
                  before managing the database.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Button asChild disabled={!allRequiredVarsSet}>
                  <a href='/admin/login'>Access Admin Panel</a>
                </Button>
                <Button asChild variant='outline'>
                  <a href='/'>View Portfolio</a>
                </Button>
              </div>

              <div className='pt-4 border-t'>
                <h4 className='font-semibold mb-2'>Admin Credentials:</h4>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <p>
                    Email:{" "}
                    {healthStatus?.environmentVariables.adminEmail
                      ? "✓ Configured"
                      : "❌ Not set"}
                  </p>
                  <p>
                    Password:{" "}
                    {healthStatus?.environmentVariables.adminPassword
                      ? "✓ Configured"
                      : "❌ Not set"}
                  </p>
                </div>
              </div>

              <div className='pt-4 border-t'>
                <h4 className='font-semibold mb-2'>Database Connection:</h4>
                <div className='text-sm text-muted-foreground'>
                  <p>Host: myportfolio.jxb3f.mongodb.net</p>
                  <p>Database: Portfolio</p>
                  <p>Status: {healthStatus?.database || "Checking..."}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
