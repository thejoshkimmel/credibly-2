"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function AdminStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: {
      total: 0,
      verified: 0,
      suspended: 0,
      newToday: 0,
    },
    reports: {
      total: 0,
      pending: 0,
      resolved: 0,
      dismissed: 0,
    },
    ratings: {
      total: 0,
      average: 0,
      distribution: {},
    },
    activity: {
      last24h: 0,
      last7d: 0,
      last30d: 0,
    },
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Statistics Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>User statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Users:</span>
                <span className="font-medium">{stats.users.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Verified:</span>
                <span className="font-medium">{stats.users.verified}</span>
              </div>
              <div className="flex justify-between">
                <span>Suspended:</span>
                <span className="font-medium">{stats.users.suspended}</span>
              </div>
              <div className="flex justify-between">
                <span>New Today:</span>
                <span className="font-medium">{stats.users.newToday}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Report statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Reports:</span>
                <span className="font-medium">{stats.reports.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-medium">{stats.reports.pending}</span>
              </div>
              <div className="flex justify-between">
                <span>Resolved:</span>
                <span className="font-medium">{stats.reports.resolved}</span>
              </div>
              <div className="flex justify-between">
                <span>Dismissed:</span>
                <span className="font-medium">{stats.reports.dismissed}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ratings</CardTitle>
            <CardDescription>Rating statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Ratings:</span>
                <span className="font-medium">{stats.ratings.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Rating:</span>
                <span className="font-medium">{stats.ratings.average.toFixed(1)}</span>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Distribution:</div>
                {Object.entries(stats.ratings.distribution).map(([rating, count]) => (
                  <div key={rating} className="flex justify-between text-sm">
                    <span>{rating} stars:</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Last 24h:</span>
                <span className="font-medium">{stats.activity.last24h}</span>
              </div>
              <div className="flex justify-between">
                <span>Last 7 days:</span>
                <span className="font-medium">{stats.activity.last7d}</span>
              </div>
              <div className="flex justify-between">
                <span>Last 30 days:</span>
                <span className="font-medium">{stats.activity.last30d}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 