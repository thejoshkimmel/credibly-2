"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface ProfileContainerProps {
  user: {
    name: string
    role: string
    department: string
    image: string
    fallbackImage: string
    rating: number
    reviews: number
  }
}

export function ProfileContainer({ user }: ProfileContainerProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-12">
      {/* Profile Card */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-start md:gap-8">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage
              name={user.name}
              src={user.image}
              fallbackSrc={user.fallbackImage}
              sizes="(max-width: 768px) 96px, 128px"
            />
            <AvatarFallback className="text-2xl md:text-3xl">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">{user.name}</h2>
            <p className="text-lg text-muted-foreground md:text-xl">{user.role}</p>
            <p className="text-base text-muted-foreground md:text-lg">{user.department}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary md:h-6 md:w-6" />
                <span className="text-lg font-medium md:text-xl">{user.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground md:text-base">
                ({user.reviews} reviews)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground md:text-base">Total Ratings</p>
            <p className="text-2xl font-bold md:text-3xl">{user.reviews}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground md:text-base">Average Rating</p>
            <p className="text-2xl font-bold md:text-3xl">{user.rating}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground md:text-base">Department Rank</p>
            <p className="text-2xl font-bold md:text-3xl">#3</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 