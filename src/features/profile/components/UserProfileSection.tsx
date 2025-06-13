"use client"

import { User } from "@/types"
import { UserProfile } from "./UserProfile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Settings } from "lucide-react"
import Link from "next/link"

interface UserProfileSectionProps {
  user: User
  isLoading?: boolean
}

export function UserProfileSection({ user, isLoading = false }: UserProfileSectionProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-32 bg-muted rounded-lg" />
          <div className="h-24 bg-muted rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Profile</h2>
        <Link href="/dashboard/profile/settings">
          <Button
            variant="outline"
            leftIcon={<Settings className="h-4 w-4" />}
            aria-label="Edit profile settings"
          >
            Edit Profile
          </Button>
        </Link>
      </div>
      
      <UserProfile user={user} />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Total Ratings Given</p>
              <p className="text-2xl font-bold">{user.stats.totalRatings}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <p className="text-2xl font-bold">{user.stats.averageRating}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Department Rank</p>
              <p className="text-2xl font-bold">#{user.stats.departmentRank}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 