"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Rating {
  id: string
  user: {
    name: string
    image: string
    fallbackImage: string
  }
  rating: number
  comment: string
  date: string
  categories: {
    name: string
    score: number
  }[]
}

interface RatingFeedProps {
  ratings: Rating[]
}

export function RatingFeed({ ratings }: RatingFeedProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">Recent Ratings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {ratings.map((rating) => (
            <div
              key={rating.id}
              className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-start md:gap-6"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <Avatar className="h-12 w-12 md:h-16 md:w-16">
                  <AvatarImage
                    name={rating.user.name}
                    src={rating.user.image}
                    fallbackSrc={rating.user.fallbackImage}
                    sizes="(max-width: 768px) 48px, 64px"
                  />
                  <AvatarFallback>
                    {rating.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col md:items-center">
                  <p className="font-medium md:text-lg">{rating.user.name}</p>
                  <p className="text-sm text-muted-foreground md:text-base">{rating.date}</p>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary md:h-6 md:w-6" />
                    <span className="text-lg font-medium md:text-xl">{rating.rating}</span>
                  </div>
                </div>

                <p className="text-base md:text-lg">{rating.comment}</p>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {rating.categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between rounded-md bg-muted p-2"
                    >
                      <span className="text-sm md:text-base">{category.name}</span>
                      <span className="font-medium md:text-lg">{category.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
} 