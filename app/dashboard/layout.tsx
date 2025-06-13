"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, Home, LogOut, MessageSquare, Settings, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Navbar } from "@/components/layout/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Teams", href: "/dashboard/teams", icon: Users },
    { name: "Ratings", href: "/dashboard/ratings", icon: Star },
    { name: "Messaging", href: "/dashboard/messaging", icon: MessageSquare },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
