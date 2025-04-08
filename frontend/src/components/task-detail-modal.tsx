"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Badge } from "@/src/components/ui/badge"

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  taskId: string | null
}

export function TaskDetailModal({ isOpen, onClose, taskId }: TaskDetailModalProps) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    executionPhases: [] as string[],
    dependencies: [] as string[],
    duration: "",
    actor: "",
    forceStart: false,
    allowOutsideWorkingHours: false,
    startRealTime: "",
    endRealTime: "",
    notesExecution: "",
    chronoState: "Not Started",
    status: "Not Started",
    system: "",
  })

  // In a real app, this would fetch the task data from an API
  useEffect(() => {
    if (taskId) {
      // Simulate API call
      setTask({
        id: taskId,
        name: "Database Backup",
        description: "Perform a full backup of the production database before migration",
        executionPhases: ["Preparation"],
        dependencies: ["1", "2"],
        duration: "120",
        actor: "John Doe",
        forceStart: false,
        allowOutsideWorkingHours: true,
        startRealTime: "2023-06-10T08:00",
        endRealTime: "2023-06-10T10:00",
        notesExecution: "Ensure all connections are closed before starting",
        chronoState: "Completed",
        status: "Completed",
        system: "System A",
      })
    }
  }, [taskId])

  const handleSave = () => {
    // In a real app, this would save the task data to an API
    console.log("Saving task:", task)
    onClose()
  }

  const handleDelete = () => {
    // In a real app, this would delete the task
    console.log("Deleting task:", taskId)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {taskId ? "Edit Task" : "Create New Task"}
            {task.status && <Badge className="ml-2 bg-green-100 text-green-800">{task.status}</Badge>}
          </DialogTitle>
          <DialogDescription>
            {taskId ? "Update the task details below" : "Fill in the task details below"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Task Name</Label>
              <Input id="name" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="system">System</Label>
              <Select value={task.system} onValueChange={(value) => setTask({ ...task, system: value })}>
                <SelectTrigger id="system">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="System A">System A</SelectItem>
                  <SelectItem value="System B">System B</SelectItem>
                  <SelectItem value="System C">System C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="executionPhases">Execution Phases</Label>
              <Select>
                <SelectTrigger id="executionPhases">
                  <SelectValue placeholder="Select phases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="preparation">Preparation</SelectItem>
                  <SelectItem value="execution">Execution</SelectItem>
                  <SelectItem value="verification">Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependencies">Dependencies</Label>
              <Select>
                <SelectTrigger id="dependencies">
                  <SelectValue placeholder="Select dependencies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task1">Database Backup</SelectItem>
                  <SelectItem value="task2">Server Migration</SelectItem>
                  <SelectItem value="task3">Application Deployment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={task.duration}
                onChange={(e) => setTask({ ...task, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actor">Actor</Label>
              <Select value={task.actor} onValueChange={(value) => setTask({ ...task, actor: value })}>
                <SelectTrigger id="actor">
                  <SelectValue placeholder="Select actor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={task.status} onValueChange={(value) => setTask({ ...task, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startRealTime">Planned Start</Label>
              <Input
                id="startRealTime"
                type="datetime-local"
                value={task.startRealTime}
                onChange={(e) => setTask({ ...task, startRealTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endRealTime">Planned End</Label>
              <Input
                id="endRealTime"
                type="datetime-local"
                value={task.endRealTime}
                onChange={(e) => setTask({ ...task, endRealTime: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="forceStart"
                checked={task.forceStart}
                onCheckedChange={(checked) => setTask({ ...task, forceStart: checked as boolean })}
              />
              <Label htmlFor="forceStart">Force Start</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowOutsideWorkingHours"
                checked={task.allowOutsideWorkingHours}
                onCheckedChange={(checked) => setTask({ ...task, allowOutsideWorkingHours: checked as boolean })}
              />
              <Label htmlFor="allowOutsideWorkingHours">Allow Outside Working Hours</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notesExecution">Notes Execution</Label>
            <Textarea
              id="notesExecution"
              rows={3}
              value={task.notesExecution}
              onChange={(e) => setTask({ ...task, notesExecution: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {taskId && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="flex flex-col-reverse sm:flex-row sm:space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
