import { LayoutDashboard, ListTodo, Users, Database, Settings } from "lucide-react"

export const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: ListTodo,
  },
  {
    name: "Teams",
    href: "/dashboard/teams",
    icon: Users,
  },
  {
    name: "Enums",
    href: "/dashboard/enums",
    icon: Database,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]
