"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { TaskCreateModal } from "@/components/task-create-modal"

interface TaskModalContextType {
  openCreateTaskModal: () => void
}

const TaskModalContext = createContext<TaskModalContextType | undefined>(undefined)

export function TaskModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openCreateTaskModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <TaskModalContext.Provider value={{ openCreateTaskModal }}>
      {children}
      <TaskCreateModal isOpen={isOpen} onClose={closeModal} />
    </TaskModalContext.Provider>
  )
}

export function useTaskModal() {
  const context = useContext(TaskModalContext)
  if (!context) {
    throw new Error("useTaskModal must be used within a TaskModalProvider")
  }
  return context
}
