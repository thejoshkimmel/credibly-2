import { useParams } from "react-router-dom"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { ProfileEditor } from "../components/ProfileEditor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RatingsList } from "@/features/ratings/components/RatingsList"

export function ProfilePage() {
  const { userId } = useParams()
  const { user } = useAuth()

  // In a real app, you would fetch the user's data based on userId
  const isOwnProfile = userId === "me" || userId === user?.id

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          {isOwnProfile ? "Manage your profile" : "View user profile"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileEditor
              user={user!}
              onSave={async (updatedUser) => {
                // Handle profile update
                console.log("Profile updated:", updatedUser)
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <RatingsList userId={userId} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 