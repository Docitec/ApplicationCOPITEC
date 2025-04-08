"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { MoreHorizontal, Edit } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { TaskDetailModal } from "@/src/components/task-detail-modal"

// Sample data - in a real app this would come from an API
const tasks = [
  {
    id: "1",
    name: "Database Backup",
    status: "Completed",
    executionPhase: "Preparation",
    assignedTo: "John Doe",
    system: "System A",
    plannedStart: "2023-06-10 08:00",
    plannedEnd: "2023-06-10 10:00",
  },
  {
    id: "2",
    name: "Server Migration",
    status: "In Progress",
    executionPhase: "Execution",
    assignedTo: "Jane Smith",
    system: "System B",
    plannedStart: "2023-06-11 09:00",
    plannedEnd: "2023-06-11 18:00",
  },
  {
    id: "3",
    name: "Application Deployment",
    status: "Not Started",
    executionPhase: "Planning",
    assignedTo: "Mike Johnson",
    system: "System C",
    plannedStart: "2023-06-12 10:00",
    plannedEnd: "2023-06-12 14:00",
  },
  {
    id: "4",
    name: "Network Configuration",
    status: "Blocked",
    executionPhase: "Preparation",
    assignedTo: "Sarah Williams",
    system: "System A",
    plannedStart: "2023-06-13 08:30",
    plannedEnd: "2023-06-13 12:30",
  },
  {
    id: "5",
    name: "User Acceptance Testing",
    status: "Not Started",
    executionPhase: "Verification",
    assignedTo: "David Brown",
    system: "System B",
    plannedStart: "2023-06-14 09:00",
    plannedEnd: "2023-06-14 17:00",
  },
]

export function TaskList() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Not Started":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
      case "Blocked":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Execution Phase</TableHead>
              <TableHead className="hidden md:table-cell">Assigned To</TableHead>
              <TableHead className="hidden lg:table-cell">System</TableHead>
              <TableHead className="hidden lg:table-cell">Planned Start</TableHead>
              <TableHead className="hidden lg:table-cell">Planned End</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{task.executionPhase}</TableCell>
                <TableCell className="hidden md:table-cell">{task.assignedTo}</TableCell>
                <TableCell className="hidden lg:table-cell">{task.system}</TableCell>
                <TableCell className="hidden lg:table-cell">{task.plannedStart}</TableCell>
                <TableCell className="hidden lg:table-cell">{task.plannedEnd}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedTask(task.id)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedTask(task.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TaskDetailModal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} taskId={selectedTask} />
    </>
  )
}
