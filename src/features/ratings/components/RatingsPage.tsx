import { useState, useCallback } from "react"
import { useRatings } from "../context/RatingsContext"
import { RatingsList } from "./RatingsList"
import { SearchInput } from "@/components/ui/SearchInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RatingsPage() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("")
  
  // Get ratings from context
  const { ratings, isLoading, error } = useRatings()

  // Memoize the search handler to prevent unnecessary re-renders of child components
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
  }, []) // Empty dependency array because setSearchTerm is stable

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchInput
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search ratings..."
          />
        </CardContent>
      </Card>

      {error && (
        <div className="text-destructive">
          {error}
        </div>
      )}

      <RatingsList
        ratings={ratings}
        searchTerm={searchTerm}
      />
    </div>
  )
} 