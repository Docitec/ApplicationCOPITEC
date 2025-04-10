"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/api"

interface TaskCreateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TaskCreateModal({ isOpen, onClose }: TaskCreateModalProps) {
  const { token } = useAuth()

  const [task, setTask] = useState({
    task: "",
    comments: "",
    execution_phase: "",
    previous: [] as string[],
    duration: "",
    actor: "",
    force_start: false,
    allow_outside_hours: false,
    start_time: "",
    end_time: "",
    notes: "",
    status: "Not Started",
    system: "",
  })

  const handleCreate = async () => {
    try {
      console.log("Payload envoyé :", task)
      await api.post("/tasks/", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      onClose()
    } catch (error) {
      console.error("Erreur de création", error)
      alert("Erreur lors de la création de la tâche.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle tâche</DialogTitle>
          <DialogDescription>Remplissez les informations de la tâche à créer.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task">Nom</Label>
            <Input
              id="task"
              value={task.task}
              onChange={(e) => setTask({ ...task, task: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Description</Label>
            <Textarea
              id="comments"
              value={task.comments}
              onChange={(e) => setTask({ ...task, comments: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="system">Système</Label>
            <Input
              id="system"
              value={task.system}
              onChange={(e) => setTask({ ...task, system: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durée (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={task.duration}
              onChange={(e) => setTask({ ...task, duration: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="force_start"
              checked={task.force_start}
              onCheckedChange={(checked) => setTask({ ...task, force_start: checked as boolean })}
            />
            <Label htmlFor="force_start">Forcer le démarrage</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allow_outside_hours"
              checked={task.allow_outside_hours}
              onCheckedChange={(checked) => setTask({ ...task, allow_outside_hours: checked as boolean })}
            />
            <Label htmlFor="allow_outside_hours">Autoriser en dehors des horaires</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleCreate}>Créer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
