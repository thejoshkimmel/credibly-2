"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import { Star, MessageSquare } from "lucide-react"
import { Rating } from "@/types"
import { formatDistanceToNow } from "date-fns"

interface RatingCardProps {
  rating: Rating & {
    user: {
      name: string
      image: string
      fallbackImage: string
    }
  }
  onMessageClick?: (userId: string) => void
  showMessageButton?: boolean
}

export function RatingCard({ 
  rating, 
  onMessageClick,
  showMessageButton = true 
}: RatingCardProps) {
  const averageScore = Math.round(
    rating.categories.reduce((acc, cat) => acc + cat.score, 0) / 
    rating.categories.length
  )

  const formattedDate = formatDistanceToNow(new Date(rating.date), { addSuffix: true })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12 md:h-14 md:w-14">
          <AvatarImage
            name={rating.user.name}
            src={rating.user.image}
            fallbackSrc={rating.user.fallbackImage}
            sizes="(max-width: 768px) 48px, 56px"
          />
          <AvatarFallback className="text-lg md:text-xl">
            {rating.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg md:text-xl">{rating.user.name}</CardTitle>
          <p className="text-sm text-muted-foreground md:text-base">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-primary text-primary md:h-6 md:w-6" />
            <span className="text-lg font-medium md:text-xl">{averageScore}</span>
          </div>
          {showMessageButton && onMessageClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMessageClick(rating.userId)}
              aria-label={`Send message to ${rating.user.name}`}
            >
              <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base md:text-lg">{rating.comment}</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rating.categories.map((category) => (
            <div
              key={`${rating.id}-${category.name}`}
              className="flex items-center justify-between rounded-md bg-muted p-2"
            >
              <span className="text-sm md:text-base">{category.name}</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary md:h-5 md:w-5" />
                <span className="font-medium md:text-lg">{category.score}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 