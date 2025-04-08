import { TaskList } from "@/src/components/task-list"
import { TaskFilters } from "@/src/components/task-filters"
import { Button } from "@/src/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <Link href="/dashboard/tasks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </Link>
      </div>
      <TaskFilters />
      <TaskList />
    </div>
  )
}
