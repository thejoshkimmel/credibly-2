"use client"

import { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Star } from "lucide-react"
import { Rating } from "@/types"

interface RatingFormProps {
  onSubmit: (rating: Omit<Rating, "id" | "userId" | "date">) => Promise<void>
  isLoading?: boolean
  categories: { name: string }[]
}

export function RatingForm({ onSubmit, isLoading = false, categories }: RatingFormProps) {
  const [comment, setComment] = useState("")
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({})
  const [hoveredScore, setHoveredScore] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize category scores when categories prop changes
  useEffect(() => {
    setCategoryScores(prev => 
      categories.reduce((acc, cat) => ({ ...acc, [cat.name]: prev[cat.name] || 0 }), {})
    )
  }, [categories])

  // Reset form state when submission is complete
  useEffect(() => {
    if (!isLoading && !error) {
      setComment("")
      setCategoryScores(prev => 
        Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
      )
      setHoveredScore({})
    }
  }, [isLoading, error])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setComment("")
      setCategoryScores({})
      setHoveredScore({})
      setError(null)
    }
  }, [])

  const handleScoreChange = useCallback((category: string, score: number) => {
    setCategoryScores(prev => ({
      ...prev,
      [category]: score
    }))
  }, [])

  const handleHoverScore = useCallback((category: string, score: number) => {
    setHoveredScore(prev => ({
      ...prev,
      [category]: score
    }))
  }, [])

  const handleClearHover = useCallback((category: string) => {
    setHoveredScore(prev => {
      const newState = { ...prev }
      delete newState[category]
      return newState
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const ratingData = {
        comment,
        categories: Object.entries(categoryScores).map(([name, score]) => ({
          name,
          score
        }))
      }

      await onSubmit(ratingData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit rating")
    } finally {
      setIsSubmitting(false)
    }
  }

  const averageScore = Math.round(
    Object.values(categoryScores).reduce((acc, score) => acc + score, 0) / 
    categories.length
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Submit Rating</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <label className="text-sm font-medium md:text-base">
                  {category.name}
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      className="p-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                      onClick={() => handleScoreChange(category.name, score)}
                      onMouseEnter={() => handleHoverScore(category.name, score)}
                      onMouseLeave={() => handleClearHover(category.name)}
                      aria-label={`Rate ${score} stars for ${category.name}`}
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          (hoveredScore[category.name] || categoryScores[category.name]) >= score
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium md:text-base">
              Comments
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Share your thoughts..."
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground md:text-base">
                Average Score:
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-medium">{averageScore}</span>
              </div>
            </div>
            <Button
              type="submit"
              isLoading={isLoading || isSubmitting}
              disabled={isLoading || isSubmitting || averageScore === 0}
            >
              Submit Rating
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

RatingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
}

RatingForm.defaultProps = {
  isLoading: false
} 