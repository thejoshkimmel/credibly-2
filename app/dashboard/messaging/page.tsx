"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send } from "lucide-react"

export default function MessagingPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>("1")
  const [searchQuery, setSearchQuery] = useState("")

  const employees = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Product Designer",
      lastMessage: "Thank you for the feedback!",
      time: "2h ago",
      unread: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Frontend Developer",
      lastMessage: "I've completed the task ahead of schedule.",
      time: "5h ago",
      unread: false,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      title: "Marketing Manager",
      lastMessage: "Can we discuss the strategy tomorrow?",
      time: "1d ago",
      unread: false,
    },
    {
      id: "4",
      name: "David Kim",
      title: "Data Analyst",
      lastMessage: "I've sent you the report.",
      time: "2d ago",
      unread: false,
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "John Doe",
      content: "Hi Sarah, I wanted to provide some feedback on your recent project.",
      time: "10:30 AM",
      isAdmin: true,
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      content: "Thank you! I'd love to hear your thoughts.",
      time: "10:32 AM",
      isAdmin: false,
    },
    {
      id: "3",
      sender: "John Doe",
      content:
        "Your design work was exceptional. The client was very impressed with the user interface and how intuitive it was to navigate.",
      time: "10:35 AM",
      isAdmin: true,
    },
    {
      id: "4",
      sender: "Sarah Johnson",
      content: "I'm glad to hear that! I spent extra time on the navigation to make sure it was user-friendly.",
      time: "10:38 AM",
      isAdmin: false,
    },
    {
      id: "5",
      sender: "John Doe",
      content: "It definitely paid off. For the next project, I'd like you to take the lead on the design direction.",
      time: "10:40 AM",
      isAdmin: true,
    },
    {
      id: "6",
      sender: "Sarah Johnson",
      content: "That sounds great! I have some ideas already that I'd like to discuss.",
      time: "10:42 AM",
      isAdmin: false,
    },
    {
      id: "7",
      sender: "John Doe",
      content: "Perfect. Let's schedule a meeting for tomorrow to go over those ideas.",
      time: "10:45 AM",
      isAdmin: true,
    },
    {
      id: "8",
      sender: "Sarah Johnson",
      content: "Thank you for the feedback and the opportunity!",
      time: "10:47 AM",
      isAdmin: false,
    },
  ]

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedEmployeeData = employees.find((emp) => emp.id === selectedEmployee)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messaging</h2>
        <p className="text-muted-foreground">Send feedback and communicate with your employees</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <div className="px-4">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="m-0">
                <div className="space-y-1 p-1">
                  {filteredEmployees.map((employee) => (
                    <button
                      key={employee.id}
                      className={`flex w-full items-center gap-3 rounded-md p-3 text-left ${selectedEmployee === employee.id ? "bg-muted" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedEmployee(employee.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt={employee.name} />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {employee.unread && (
                          <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.time}</p>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{employee.lastMessage}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <div className="space-y-1 p-1">
                  {filteredEmployees
                    .filter((emp) => emp.unread)
                    .map((employee) => (
                      <button
                        key={employee.id}
                        className={`flex w-full items-center gap-3 rounded-md p-3 text-left ${selectedEmployee === employee.id ? "bg-muted" : "hover:bg-muted/50"}`}
                        onClick={() => setSelectedEmployee(employee.id)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" alt={employee.name} />
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.time}</p>
                          </div>
                          <p className="truncate text-sm text-muted-foreground">{employee.lastMessage}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="flex flex-col md:col-span-2">
          {selectedEmployee && selectedEmployeeData ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={selectedEmployeeData.name} />
                    <AvatarFallback>
                      {selectedEmployeeData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedEmployeeData.name}</CardTitle>
                    <CardDescription>{selectedEmployeeData.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-4 ${message.isAdmin ? "flex-row" : "flex-row-reverse"}`}>
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt={message.sender} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`space-y-1 max-w-[80%] ${message.isAdmin ? "" : "text-right"}`}>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{message.sender}</p>
                          <p className="text-xs text-muted-foreground">{message.time}</p>
                        </div>
                        <div className={`rounded-lg p-3 ${message.isAdmin ? "bg-muted" : "bg-primary/10"}`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <p className="text-lg font-medium">No conversation selected</p>
                <p className="text-muted-foreground">Select an employee to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
