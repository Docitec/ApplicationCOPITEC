"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigationItems } from "@/lib/navigation-items"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-50/40 md:block w-64 overflow-y-auto">
      <div className="flex flex-col gap-2 p-4">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
