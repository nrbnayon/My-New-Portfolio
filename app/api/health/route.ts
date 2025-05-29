import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { envConfig } from "@/lib/env-config"

export async function GET() {
  try {
    // Check database connection
    const client = await clientPromise
    await client.db("Portfolio").admin().ping()

    // Check environment variables
    const envStatus = {
      mongoUrl: !!envConfig.mongoUrl,
      adminEmail: !!envConfig.adminEmail,
      adminPassword: !!envConfig.adminPassword,
      nextAuthSecret: !!envConfig.nextAuthSecret,
      groqApiKey: !!envConfig.groqApiKey,
      resendApiKey: !!envConfig.resendApiKey,
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: envConfig.nodeEnv,
      database: "connected",
      environmentVariables: envStatus,
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Database connection failed",
      },
      { status: 500 },
    )
  }
}
