import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart3, MessageSquare, Plus, Star, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, John!</h2>
          <p className="text-muted-foreground">
            Here's an overview of your company's performance and activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/employees/add">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Credibly Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3</div>
            <p className="text-xs text-muted-foreground">+2.5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Ratings</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Employees</CardTitle>
            <CardDescription>Recently added employees to your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Product Designer',
                  department: 'Design',
                  score: 92,
                },
                {
                  name: 'Michael Chen',
                  role: 'Frontend Developer',
                  department: 'Engineering',
                  score: 88,
                },
                {
                  name: 'Emily Rodriguez',
                  role: 'Marketing Manager',
                  department: 'Marketing',
                  score: 90,
                },
                { name: 'David Kim', role: 'Data Analyst', department: 'Analytics', score: 85 },
              ].map((employee, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?${i}`} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {employee.role} • {employee.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{employee.score}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/employees">
                <Button variant="outline">View All Employees</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest feedback and messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'Sarah Johnson',
                  message: 'Thank you for the feedback on my presentation!',
                  time: '2h ago',
                },
                {
                  name: 'Michael Chen',
                  message: "I've completed the frontend task ahead of schedule.",
                  time: '5h ago',
                },
                {
                  name: 'Emily Rodriguez',
                  message: 'Can we discuss the marketing strategy tomorrow?',
                  time: '1d ago',
                },
              ].map((message, i) => (
                <div key={i} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?${i}`} alt={message.name} />
                    <AvatarFallback>
                      {message.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{message.name}</p>
                      <p className="text-xs text-muted-foreground">{message.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/messaging">
                <Button variant="outline">View All Messages</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
