"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AnalyticsDashboardProps {
  stats: any
}

export function AnalyticsDashboard({ stats }: AnalyticsDashboardProps) {
  // Mock chart data
  const revenueData = [
    { month: "Jan", revenue: 4000, students: 240 },
    { month: "Feb", revenue: 3000, students: 221 },
    { month: "Mar", revenue: 2000, students: 229 },
    { month: "Apr", revenue: 2780, students: 200 },
    { month: "May", revenue: 1890, students: 229 },
    { month: "Jun", revenue: 2390, students: 200 },
  ]

  const courseData = [
    { name: "React", students: 234, revenue: 11699.66 },
    { name: "TypeScript", students: 156, revenue: 12478.44 },
    { name: "Web Design", students: 89, revenue: 3559.11 },
    { name: "Business", students: 145, revenue: 8694.55 },
    { name: "Python", students: 201, revenue: 17889.99 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue and student growth</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" name="Revenue ($)" />
              <Line type="monotone" dataKey="students" stroke="hsl(var(--secondary))" name="New Students" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Courses by Revenue</CardTitle>
          <CardDescription>Performance of top performing courses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue ($)" />
              <Bar dataKey="students" fill="hsl(var(--secondary))" name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Avg Course Rating</span>
              <span className="font-semibold text-foreground">4.7/5</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Course Completion Rate</span>
              <span className="font-semibold text-foreground">68%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Student Satisfaction</span>
              <span className="font-semibold text-foreground">92%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Platform Uptime</span>
              <span className="font-semibold text-foreground">99.9%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
            <CardDescription>Platform expansion indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Monthly User Growth</span>
              <span className="font-semibold text-green-600">+12.5%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Course Growth</span>
              <span className="font-semibold text-green-600">+8.3%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Revenue Growth</span>
              <span className="font-semibold text-green-600">+15.7%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Instructor Growth</span>
              <span className="font-semibold text-green-600">+6.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
