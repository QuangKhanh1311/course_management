"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Trash2, Shield, XCircle } from "lucide-react"
import { TeacherService } from "@/services/teacher.service"
import { Button } from "@/components/ui/button"

interface UserManagementProps {
  users: {
    teacherId: string
    userId: string
    name: string
    email: string
    qualification?: string
    isActive: boolean
  }[]
}

export function UserManagement({ users: initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatus = (user: any) => {
    if (user.status === "Rejected") return "Rejected"
    if (!user.qualification) return "Not Submitted"
    if (!user.isActive) return "Pending"
    return "Active"
  }

  const handleApprove = async (user: any) => {
    try {
      await TeacherService.update(user.teacherId, { isActive: true })
      setUsers(users.map((u) => u.teacherId === user.teacherId ? { ...u, isActive: true } : u))
    } catch (err) {
      console.error("Approve failed", err)
    }
  }

  const handleDismiss = async (user: any) => {
    try {
      await TeacherService.update(user.teacherId, { isActive: false })
      setUsers(users.map((u) => u.teacherId === user.teacherId ? { ...u, status: "Rejected" } : u))
    } catch (err) {
      console.error("Dismiss failed", err)
    }
  }

  const handleDelete = (teacherId: string) => {
    setUsers(users.filter((u) => u.teacherId !== teacherId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teacher Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Qualification</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const status = getStatus(u)
                return (
                  <tr key={u.teacherId} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">
                      {u.qualification ? (
                        <a
                          href={u.qualification}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : "-"}
                    </td>
                    <td className="py-2 px-4">
                      <Badge
                        className={
                          status === "Active"
                            ? "bg-green-500/20 text-green-700 border-green-500/30"
                            : status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                            : status === "Rejected"
                            ? "bg-red-500/20 text-red-700 border-red-500/30"
                            : "bg-gray-500/20 text-gray-700 border-gray-500/30"
                        }
                      >
                        {status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      {status === "Pending" && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleApprove(u)}>
                            <Shield className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDismiss(u)}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(u.teacherId)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
