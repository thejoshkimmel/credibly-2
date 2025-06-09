"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Star } from "lucide-react"

export default function NewRatingPage({ searchParams }: { searchParams: { employee?: string } }) {
  const [ratings, setRatings] = useState({
    professionalism: 0,
    communication: 0,
    teamwork: 0,
    leadership: 0,
    technical: 0,
  })

  // This would normally fetch employee data based on the ID in searchParams
  const employee = searchParams.employee
    ? {
        id: searchParams.employee,
        name: "Sarah Johnson",
        title: "Product Designer",
        department: "Design",
      }
    : null

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const calculateAverage = () => {
    const values = Object.values(ratings) as number[]
    const sum = values.reduce((acc, val) => acc + val, 0)
    return values.length > 0 ? (sum / values.length).toFixed(1) : "0.0"
  }

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Link href="/dashboard/ratings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">New Rating</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Submit Performance Rating</CardTitle>
          <CardDescription>Rate the employee's performance across different professional criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!employee ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Select Employee</Label>
                <Select>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sarah Johnson</SelectItem>
                    <SelectItem value="2">Michael Chen</SelectItem>
                    <SelectItem value="3">Emily Rodriguez</SelectItem>
                    <SelectItem value="4">David Kim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src="/placeholder.svg" alt={employee.name} />
                <AvatarFallback>
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{employee.name}</p>
                <p className="text-sm text-muted-foreground">
                  {employee.title} • {employee.department}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {Object.keys(ratings).map((category) => (
              <div key={category} className="space-y-2">
                <Label htmlFor={category} className="capitalize">
                  {category}
                </Label>
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(category, star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${star <= ratings[category as keyof typeof ratings] ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {ratings[category as keyof typeof ratings] > 0
                      ? ratings[category as keyof typeof ratings]
                      : "Not rated"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Additional Comments</Label>
            <Textarea
              id="comments"
              placeholder="Provide any additional feedback or comments about the employee's performance..."
              className="min-h-[100px]"
            />
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <p className="font-medium">Average Rating</p>
                <p className="text-sm text-muted-foreground">Based on all criteria</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl sm:text-2xl font-bold">{calculateAverage()}</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(Number.parseFloat(calculateAverage())) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
          <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
          <Button className="w-full sm:w-auto">Submit Rating</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
