// app\api\auth\[...nextauth]\route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Extend the Session type to include 'id' on user
import { Session } from "next-auth"
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if the credentials match the admin credentials from environment variables
        const isValidEmail = credentials.email === process.env.ADMIN_EMAIL
        const isValidPassword = credentials.password === process.env.ADMIN_PASSWORD

        if (isValidEmail && isValidPassword) {
          return {
            id: "admin",
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
