"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen } from "lucide-react"

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Student",
    email: "student@example.com",
    bio: "Passionate learner interested in web development",
  })

  const [certificates, setCertificates] = useState([
    {
      id: "1",
      courseName: "React Fundamentals",
      issuedDate: "2024-03-15",
      certificateId: "CERT-1234567890",
    },
  ])

  const [stats, setStats] = useState({
    coursesEnrolled: 2,
    coursesCompleted: 1,
    totalLearningHours: 24,
    certificatesEarned: 1,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your achievements</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stats.coursesEnrolled}</p>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stats.coursesCompleted}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stats.certificatesEarned}</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{stats.totalLearningHours}h</p>
                  <p className="text-sm text-muted-foreground">Learning Hours</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your public profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <p className="text-foreground font-medium">{profile.name}</p>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-foreground font-medium">{profile.email}</p>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <p className="text-foreground">{profile.bio}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Certificates</CardTitle>
              <CardDescription>Certificates you've earned by completing courses</CardDescription>
            </CardHeader>
            <CardContent>
              {certificates.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No certificates yet. Complete a course to earn one!
                </p>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-foreground">{cert.courseName}</h3>
                        <p className="text-sm text-muted-foreground">Issued: {cert.issuedDate}</p>
                        <p className="text-xs text-muted-foreground mt-1">ID: {cert.certificateId}</p>
                      </div>
                      <Button variant="outline" className="bg-transparent">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="text-destructive bg-transparent border-destructive/50">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
