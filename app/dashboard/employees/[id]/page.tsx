'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageSquare, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import RatingForm from './RatingForm';

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  // This would normally fetch employee data based on the ID
  const employee = {
    id: params.id,
    name: 'Sarah Johnson',
    title: 'Product Designer',
    company: 'Credibly Inc.',
    department: 'Design',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'Jan 15, 2023',
    crediblyScore: 92,
    ratings: {
      professionalism: 4.8,
      communication: 4.5,
      teamwork: 4.7,
      leadership: 4.2,
      technical: 4.9,
    },
    messages: [
      {
        id: '1',
        sender: 'John Doe',
        content:
          'Great job on the latest design project! The client was very impressed with your work.',
        date: '2 days ago',
        isAdmin: true,
      },
      {
        id: '2',
        sender: 'Sarah Johnson',
        content: 'Thank you! I really enjoyed working on that project.',
        date: '2 days ago',
        isAdmin: false,
      },
      {
        id: '3',
        sender: 'John Doe',
        content:
          'Your presentation skills have improved significantly. The team appreciated your clear communication.',
        date: '1 week ago',
        isAdmin: true,
      },
    ],
  };

  // Comment section state
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      const res = await fetch(`/api/comments?userId=${params.id}`);
      const data = await res.json();
      setComments(data);
      setLoading(false);
    }
    fetchComments();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author || !newComment) return;
    setSubmitting(true);
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: params.id, author, text: newComment }),
    });
    // Send notification
    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: params.id,
        type: 'comment',
        message: `${author} left you a comment!`,
      }),
    });
    setNewComment('');
    setAuthor('');
    // Refresh comments
    const res = await fetch(`/api/comments?userId=${params.id}`);
    const data = await res.json();
    setComments(data);
    setSubmitting(false);
    setAlert('Comment posted and notification sent!');
    setTimeout(() => setAlert(''), 3000);
  }

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-0">
      {alert && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-2 text-center font-medium">
          {alert}
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Link href="/dashboard/employees">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Employee Profile</h2>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src="/placeholder.svg" alt={employee.name} />
              <AvatarFallback>
                {employee.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="mt-4 text-lg sm:text-xl">{employee.name}</CardTitle>
              <CardDescription>{employee.title}</CardDescription>
              <div className="flex justify-center gap-2">
                <Badge variant="outline">{employee.department}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium break-all">{employee.email}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="font-medium">{employee.phone}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Joined</div>
              <div className="font-medium">{employee.joinDate}</div>
            </div>
            <div className="flex justify-center pt-4">
              <Link href={`/dashboard/ratings/new?employee=${employee.id}`}>
                <Button>
                  <Star className="mr-2 h-4 w-4" />
                  Rate Employee
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Credibly Score</CardTitle>
              <CardDescription>
                Overall professional credibility score based on performance ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-bold">{employee.crediblyScore}</div>
                  <p className="text-sm text-muted-foreground">Excellent</p>
                </div>
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-8 border-primary flex items-center justify-center">
                  <div className="text-xl sm:text-2xl font-bold">{employee.crediblyScore}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Performance Ratings</CardTitle>
              <CardDescription>
                Breakdown of ratings across different professional criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(employee.ratings).map(([category, rating]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <div className="text-sm font-medium capitalize">{category}</div>
                      <div className="flex items-center">
                        <div className="mr-2 text-sm font-medium">{rating}</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= Math.round(rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>Recent feedback and communication</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="messages">
                <TabsList className="mb-4">
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="send">Send Message</TabsTrigger>
                </TabsList>
                <TabsContent value="messages" className="space-y-4">
                  {employee.messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.isAdmin ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt={message.sender} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`space-y-1 max-w-[80%] ${message.isAdmin ? '' : 'text-right'}`}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{message.sender}</p>
                          <p className="text-xs text-muted-foreground">{message.date}</p>
                        </div>
                        <div
                          className={`rounded-lg p-3 ${message.isAdmin ? 'bg-muted' : 'bg-primary/10'}`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="send">
                  <div className="space-y-4">
                    <textarea
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Type your message here..."
                    />
                    <div className="flex justify-end">
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Comment Section */}
          <Card>
            <CardHeader>
              <CardTitle>Public Reviews</CardTitle>
              <CardDescription>Leave a short, public review for this user.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                <input
                  className="w-full border rounded px-2 py-1"
                  placeholder="Your name or username"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  maxLength={32}
                  required
                />
                <textarea
                  className="w-full border rounded px-2 py-1"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  maxLength={200}
                  required
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={submitting || !author || !newComment}>
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </form>
              {loading ? (
                <div>Loading comments...</div>
              ) : comments.length === 0 ? (
                <div className="text-muted-foreground">No comments yet.</div>
              ) : (
                <div className="space-y-4">
                  {comments.map(c => (
                    <div key={c._id} className="border rounded p-2">
                      <div className="text-sm font-semibold">{c.author}</div>
                      <div className="text-sm">{c.text}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rating System */}
          <RatingForm raterId="demo-rater" rateeId={params.id} />
        </div>
      </div>
    </div>
  );
}
