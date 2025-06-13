"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
  label?: string
  description?: string
  name?: string
  required?: boolean
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className,
  label = "Rating",
  description,
  name,
  required = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null)
  const [selectedRating, setSelectedRating] = React.useState(rating)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [focusedStar, setFocusedStar] = React.useState<number | null>(null)
  const [isInvalid, setIsInvalid] = React.useState(false)

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null)
    }
  }

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      setSelectedRating(index)
      onRatingChange(index)
      setIsAnimating(true)
      setIsInvalid(false)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!interactive) return

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault()
        handleClick(index)
        break
      case "ArrowRight":
        event.preventDefault()
        if (index < maxRating) {
          setFocusedStar(index + 1)
        }
        break
      case "ArrowLeft":
        event.preventDefault()
        if (index > 1) {
          setFocusedStar(index - 1)
        }
        break
    }
  }

  const handleBlur = () => {
    if (required && selectedRating === 0) {
      setIsInvalid(true)
    }
  }

  const displayRating = hoverRating ?? selectedRating

  return (
    <div 
      className={cn("flex flex-col gap-2", className)}
      role="radiogroup"
      aria-label={label}
      aria-describedby={description ? "rating-description" : undefined}
      aria-required={required}
      aria-invalid={isInvalid}
    >
      {description && (
        <p id="rating-description" className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= displayRating
          const isFocused = focusedStar === starValue

          return (
            <button
              key={index}
              type={interactive ? "button" : undefined}
              className={cn(
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full",
                interactive && "cursor-pointer",
                "transition-all duration-200 ease-in-out hover:scale-110 hover:rotate-12",
                isAnimating && isFilled && "animate-rating-pop",
                isInvalid && "ring-2 ring-destructive"
              )}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starValue)}
              onKeyDown={(e) => handleKeyDown(e, starValue)}
              onFocus={() => setFocusedStar(starValue)}
              onBlur={handleBlur}
              disabled={!interactive}
              role="radio"
              aria-checked={isFilled}
              tabIndex={interactive ? (isFocused ? 0 : -1) : undefined}
              aria-label={`${starValue} out of ${maxRating} stars`}
              aria-posinset={starValue}
              aria-setsize={maxRating}
              name={name}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled ? "fill-primary text-primary" : "text-muted-foreground",
                  "transition-all duration-200 ease-in-out"
                )}
                aria-hidden="true"
              />
              <span className="sr-only">
                {starValue} {starValue === 1 ? "star" : "stars"} out of {maxRating}
              </span>
            </button>
          )
        })}
      </div>
      {interactive && (
        <p className="text-sm text-muted-foreground">
          Use arrow keys to navigate and Enter to select a rating
        </p>
      )}
      {isInvalid && (
        <p className="text-sm text-destructive" role="alert">
          Please select a rating
        </p>
      )}
    </div>
  )
} 