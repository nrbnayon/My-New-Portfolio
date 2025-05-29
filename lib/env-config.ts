// Environment configuration and validation
export const envConfig = {
  // Database
  mongoUrl: process.env.MONGO_URL!,

  // Authentication
  adminEmail: process.env.ADMIN_EMAIL!,
  adminPassword: process.env.ADMIN_PASSWORD!,
  nextAuthSecret: process.env.NEXTAUTH_SECRET!,

  // AI Services
  groqApiKey: process.env.GROQ_API_KEY!,

  // Email Service (optional)
  resendApiKey: process.env.RESEND_API_KEY,

  // App Configuration
  nodeEnv: process.env.NODE_ENV || "development",
  vercelUrl: process.env.VERCEL_URL,
}

// Validate required environment variables
export function validateEnvConfig() {
  const requiredVars = ["MONGO_URL", "ADMIN_EMAIL", "ADMIN_PASSWORD", "NEXTAUTH_SECRET", "GROQ_API_KEY"]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }

  console.log("✅ All required environment variables are configured")
}

// Call validation on app startup
if (typeof window === "undefined") {
  validateEnvConfig()
}
