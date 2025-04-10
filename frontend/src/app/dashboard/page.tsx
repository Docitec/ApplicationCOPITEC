"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useTaskModal } from "@/context/TaskModalContext"

export default function DashboardPage() {
  const { openCreateTaskModal } = useTaskModal()

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={openCreateTaskModal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
      <DashboardCards />
    </div>
  )
}
