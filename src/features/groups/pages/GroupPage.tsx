import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RatingsList } from "@/features/ratings/components/RatingsList"
import { RatingForm } from "@/features/ratings/components/RatingForm"

export function GroupPage() {
  const { groupId } = useParams()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Group</h1>
        <p className="text-muted-foreground">View and manage group ratings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit a Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <RatingForm
              onSubmit={async (rating) => {
                // Handle rating submission for group
                console.log("Group rating submitted:", rating)
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
            <CardTitle>Group Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <RatingsList groupId={groupId} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 