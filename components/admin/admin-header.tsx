"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { LogOut, Home } from "lucide-react"

export default function AdminHeader() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">NK</span>
            <span className="font-semibold">Admin Dashboard</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
