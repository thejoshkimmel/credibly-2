'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const employees = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    role: 'Product Designer',
    department: 'Design',
    score: 92,
  },
  {
    id: '2',
    name: 'Michael Chen',
    username: 'mchen',
    role: 'Frontend Developer',
    department: 'Engineering',
    score: 88,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    username: 'emilyr',
    role: 'Marketing Manager',
    department: 'Marketing',
    score: 90,
  },
  {
    id: '4',
    name: 'David Kim',
    username: 'davidk',
    role: 'Data Analyst',
    department: 'Analytics',
    score: 85,
  },
];

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const filtered = employees.filter(
    emp =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Search for users by name or username</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by name or username..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-4">
            {filtered.length === 0 && <div className="text-muted-foreground">No users found.</div>}
            {filtered.map(employee => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?${employee.id}`} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {employee.name}{' '}
                      <span className="text-xs text-muted-foreground">(@{employee.username})</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {employee.role} • {employee.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{employee.score}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
