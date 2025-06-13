"use client"

import { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

interface ProfileEditorProps {
  user: User
  onSave: (updatedUser: Partial<User>) => Promise<void>
  isLoading?: boolean
}

export function ProfileEditor({ user, onSave, isLoading = false }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    image: user.image
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when user prop changes
  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      image: user.image
    })
  }, [user])

  // Reset error state when form data changes
  useEffect(() => {
    setError(null)
  }, [formData])

  // Cleanup image preview when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        image: user.image
      })
      setImagePreview(null)
      setError(null)
    }
  }, [user])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Cleanup previous preview if exists
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData(prev => ({
          ...prev,
          image: result
        }))
      }
      reader.readAsDataURL(file)
    }
  }, [imagePreview])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSave(formData)
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      image: user.image
    }))
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImagePreview(null)
    setIsEditing(false)
  }, [user, imagePreview])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage
                  src={imagePreview || user.image}
                  alt={formData.name}
                  fallbackSrc={user.fallbackImage}
                />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading || isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading || isSubmitting}
                  disabled={isLoading || isSubmitting}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                disabled={isLoading || isSubmitting}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

ProfileEditor.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    fallbackImage: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

ProfileEditor.defaultProps = {
  isLoading: false
} 