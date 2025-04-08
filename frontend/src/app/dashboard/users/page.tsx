import { UserManagement } from "@/components/user-management"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
      <p className="text-muted-foreground">Manage users and their roles in the application.</p>

      <UserManagement />
    </div>
  )
}
