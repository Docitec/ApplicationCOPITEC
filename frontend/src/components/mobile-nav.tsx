"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { navigationItems } from "@/lib/navigation-items"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/dashboard" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-bold">COPITEC</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-7 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
