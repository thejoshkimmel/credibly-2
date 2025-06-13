"use client"

import { useMemo } from "react"
import { Rating } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RatingItem } from "./RatingItem"

interface RatingsListProps {
  ratings: Rating[]
  searchTerm: string
}

// Memoize the list item to prevent unnecessary re-renders
const MemoizedRatingItem = React.memo(RatingItem)

export function RatingsList({ ratings, searchTerm }: RatingsListProps) {
  // Memoize the filtered list to prevent recalculation on every render
  const filteredRatings = useMemo(() => {
    if (!searchTerm) return ratings

    const searchLower = searchTerm.toLowerCase()
    return ratings.filter(rating => 
      rating.comment.toLowerCase().includes(searchLower) ||
      rating.category.toLowerCase().includes(searchLower)
    )
  }, [ratings, searchTerm]) // Only recalculate when ratings or searchTerm changes

  if (filteredRatings.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">
          No ratings found
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredRatings.map(rating => (
            <MemoizedRatingItem
              key={rating.id}
              rating={rating}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 