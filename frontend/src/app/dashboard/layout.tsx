"use client"

import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.replace("/") // Redirection stricte
    }
  }, [token, router])

  if (!token) return null // ⛔ Empêche le rendu du dashboard si non connecté

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
