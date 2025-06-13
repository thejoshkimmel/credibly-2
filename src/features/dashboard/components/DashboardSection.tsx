"use client"

import { DashboardStats, RecentEmployee, RecentMessage } from "@/types"
import { Dashboard } from "./Dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { BarChart3, Plus } from "lucide-react"
import Link from "next/link"

interface DashboardSectionProps {
  stats: DashboardStats
  recentEmployees: RecentEmployee[]
  recentMessages: RecentMessage[]
  userName: string
  isLoading?: boolean
  onMessageClick?: (userId: string) => void
}

export function DashboardSection({
  stats,
  recentEmployees,
  recentMessages,
  userName,
  isLoading = false,
  onMessageClick
}: DashboardSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h2>
        <div className="flex gap-2">
          <Link href="/dashboard/employees/add">
            <Button
              leftIcon={<Plus className="h-4 w-4" />}
              aria-label="Add new employee"
            >
              Add Employee
            </Button>
          </Link>
          <Link href="/dashboard/analytics">
            <Button
              variant="outline"
              leftIcon={<BarChart3 className="h-4 w-4" />}
              aria-label="View detailed analytics"
            >
              Analytics
            </Button>
          </Link>
        </div>
      </div>

      <Dashboard
        stats={stats}
        recentEmployees={recentEmployees}
        recentMessages={recentMessages}
        userName={userName}
        isLoading={isLoading}
      />
    </div>
  )
} 