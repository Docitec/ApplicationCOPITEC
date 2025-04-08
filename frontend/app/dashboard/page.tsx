import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Link href="/dashboard/tasks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </Link>
      </div>
      <DashboardCards />
    </div>
  )
}
