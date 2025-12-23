// pages/admin/dashboard.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, DollarSign, AlertCircle } from "lucide-react";
import { AdminStats } from "@/components/admin/admin-stats";
import { UserManagement } from "@/components/admin/user-management";
import { TeacherService } from "@/services/teacher.service";
import { CourseModeration } from "@/components/admin/course-moderation";
import { CourseService } from "@/services/course.service";

interface Teacher {
  teacherId: string;
  userId: string;
  name: string;
  email: string;
  role: "teacher";
  qualification?: string;
  isActive: boolean;
  joinedAt: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInstructors: 0,
    activeUsers: 0,
  });
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await TeacherService.getAll();
        const teacherList: Teacher[] = res.data
          .filter((t: any) => t.user_id)
          .map((t: any) => ({
            teacherId: t._id,
            userId: t.user_id._id,
            name: t.user_id.full_name || "Unknown",
            email: t.user_id.email || "Unknown",
            role: "teacher",
            qualification: t.qualification || "",
            isActive: t.isActive || false,
            joinedAt: t.user_id.createdAt ? t.user_id.createdAt.split("T")[0] : "-",
          }));
        setTeachers(teacherList);
        setStats({
          totalUsers: teacherList.length,
          totalInstructors: teacherList.length,
          activeUsers: teacherList.filter(t => t.isActive).length,
        });
      } catch (err) {
        console.error("Fetch teachers failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeachers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage teachers and review submissions</p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <AdminStats icon={Users} label="Total Instructors" value={stats.totalInstructors} />
        <AdminStats icon={BookOpen} label="-" value={0} />
        <AdminStats icon={DollarSign} label="-" value="$0" />
        <AdminStats icon={AlertCircle} label="Active Instructors" value={stats.activeUsers} color="text-green-500" />
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Teachers</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <p>Overview content here</p>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement users={teachers} />
        </TabsContent>

        <TabsContent value="courses">
          <CourseModeration />
        </TabsContent>

        <TabsContent value="analytics">
          <p>Analytics content here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
