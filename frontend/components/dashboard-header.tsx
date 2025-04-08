import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold">Welcome back, Admin</h1>
        <p className="text-sm text-muted-foreground">Here's an overview of your cut over plan progress</p>
      </div>
      <Button variant="outline" size="sm" className="gap-1">
        <Calendar className="h-4 w-4" />
        <span>Today</span>
      </Button>
    </div>
  )
}
