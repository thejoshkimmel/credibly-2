"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, MessageSquare, Plus, Star, Users } from "lucide-react"

const employees = [
  { 
    name: "Sarah Johnson", 
    role: "Product Designer", 
    department: "Design", 
    score: 92,
    image: "/avatars/sarah.webp",
    fallbackImage: "/avatars/sarah.jpg"
  },
  { 
    name: "Michael Chen", 
    role: "Frontend Developer", 
    department: "Engineering", 
    score: 88,
    image: "/avatars/michael.webp",
    fallbackImage: "/avatars/michael.jpg"
  },
  { 
    name: "Emily Rodriguez", 
    role: "Marketing Manager", 
    department: "Marketing", 
    score: 90,
    image: "/avatars/emily.webp",
    fallbackImage: "/avatars/emily.jpg"
  },
  { 
    name: "David Kim", 
    role: "Data Analyst", 
    department: "Analytics", 
    score: 85,
    image: "/avatars/david.webp",
    fallbackImage: "/avatars/david.jpg"
  },
]

const messages = [
  { 
    name: "Sarah Johnson", 
    message: "Thank you for the feedback on my presentation!", 
    time: "2h ago",
    image: "/avatars/sarah.webp",
    fallbackImage: "/avatars/sarah.jpg"
  },
  {
    name: "Michael Chen",
    message: "I've completed the frontend task ahead of schedule.",
    time: "5h ago",
    image: "/avatars/michael.webp",
    fallbackImage: "/avatars/michael.jpg"
  },
  { 
    name: "Emily Rodriguez", 
    message: "Can we discuss the marketing strategy tomorrow?", 
    time: "1d ago",
    image: "/avatars/emily.webp",
    fallbackImage: "/avatars/emily.jpg"
  },
]

export default function DashboardPage() {
  return (
    <main className="space-y-6 md:space-y-8 lg:space-y-12" role="main" aria-label="Dashboard">
      <section 
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        role="banner"
        aria-label="Welcome section"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">Welcome back, John!</h1>
          <p className="text-sm text-muted-foreground md:text-base lg:text-lg">Here's an overview of your company's performance and activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/employees/add">
            <Button 
              className="w-full gap-1 md:w-auto" 
              aria-label="Add new employee to the organization"
              aria-haspopup="dialog"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              <span className="hidden md:inline">Add Employee</span>
              <span className="md:hidden">Add</span>
            </Button>
          </Link>
        </div>
      </section>

      <section 
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" 
        aria-label="Company Statistics"
        role="region"
      >
        <Card 
          tabIndex={0} 
          role="region" 
          aria-label="Total Employees"
          aria-describedby="total-employees-desc"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium md:text-base">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground md:h-5 md:w-5" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold md:text-3xl">42</div>
            <p id="total-employees-desc" className="text-xs text-muted-foreground md:text-sm">+4 new employees from last month</p>
          </CardContent>
        </Card>
        <Card 
          tabIndex={0} 
          role="region" 
          aria-label="Teams"
          aria-describedby="teams-desc"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium md:text-base">Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground md:h-5 md:w-5" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold md:text-3xl">8</div>
            <p id="teams-desc" className="text-xs text-muted-foreground md:text-sm">+1 new team from last month</p>
          </CardContent>
        </Card>
        <Card 
          tabIndex={0} 
          role="region" 
          aria-label="Average Credibly Score"
          aria-describedby="score-desc"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium md:text-base">Avg. Credibly Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground md:h-5 md:w-5" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold md:text-3xl">87.3</div>
            <p id="score-desc" className="text-xs text-muted-foreground md:text-sm">+2.5 points improvement from last month</p>
          </CardContent>
        </Card>
        <Card 
          tabIndex={0} 
          role="region" 
          aria-label="Pending Ratings"
          aria-describedby="ratings-desc"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium md:text-base">Pending Ratings</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground md:h-5 md:w-5" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold md:text-3xl">12</div>
            <p id="ratings-desc" className="text-xs text-muted-foreground md:text-sm">Due for completion this week</p>
          </CardContent>
        </Card>
      </section>

      <section 
        className="grid gap-4 lg:grid-cols-7" 
        aria-label="Recent Activity"
        role="region"
      >
        <Card 
          className="col-span-4" 
          tabIndex={0} 
          role="region" 
          aria-label="Recent Employees"
          aria-describedby="recent-employees-desc"
        >
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl lg:text-3xl">Recent Employees</CardTitle>
            <CardDescription id="recent-employees-desc" className="text-sm md:text-base">Recently added employees to your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" role="list">
              {employees.map((employee, i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-4 p-2 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:flex-row md:items-center md:justify-between"
                  tabIndex={0}
                  role="listitem"
                  aria-label={`Employee: ${employee.name}, ${employee.role} in ${employee.department}`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 md:h-14 md:w-14">
                      <AvatarImage 
                        name={employee.name}
                        src={employee.image}
                        fallbackSrc={employee.fallbackImage}
                        sizes="(max-width: 768px) 48px, 56px"
                      />
                      <AvatarFallback className="text-lg md:text-xl">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium md:text-base">{employee.name}</p>
                      <p className="text-xs text-muted-foreground md:text-sm">
                        {employee.role} • {employee.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary md:h-5 md:w-5" aria-hidden="true" />
                      <span className="text-sm font-medium md:text-base">{employee.score}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      aria-label={`Send message to ${employee.name}`}
                      aria-haspopup="dialog"
                    >
                      <MessageSquare className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/employees">
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  aria-label="View all employees in the organization"
                >
                  View All Employees
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="col-span-3" 
          tabIndex={0} 
          role="region" 
          aria-label="Recent Messages"
          aria-describedby="recent-messages-desc"
        >
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl lg:text-3xl">Recent Messages</CardTitle>
            <CardDescription id="recent-messages-desc" className="text-sm md:text-base">Latest feedback and messages from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" role="list">
              {messages.map((message, i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-4 p-2 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:flex-row md:gap-4"
                  tabIndex={0}
                  role="listitem"
                  aria-label={`Message from ${message.name} received ${message.time}`}
                >
                  <Avatar className="h-12 w-12 md:h-14 md:w-14">
                    <AvatarImage 
                      name={message.name}
                      src={message.image}
                      fallbackSrc={message.fallbackImage}
                      sizes="(max-width: 768px) 48px, 56px"
                    />
                    <AvatarFallback className="text-lg md:text-xl">
                      {message.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium md:text-base">{message.name}</p>
                      <p className="text-xs text-muted-foreground md:text-sm">{message.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground md:text-base">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/messaging">
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  aria-label="View all messages in the organization"
                >
                  View All Messages
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
