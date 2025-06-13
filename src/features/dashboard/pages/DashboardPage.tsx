import { useAuth } from "@/features/auth/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RatingForm } from "@/features/ratings/components/RatingForm"
import { RatingsList } from "@/features/ratings/components/RatingsList"

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here's what's happening in your network</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit a Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <RatingForm
              onSubmit={async (rating) => {
                // Handle rating submission
                console.log("Rating submitted:", rating)
              }}
              categories={[
                { name: "Communication" },
                { name: "Reliability" },
                { name: "Quality" },
                { name: "Collaboration" }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <RatingsList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 