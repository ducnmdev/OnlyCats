"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex flex-wrap gap-2 px-1.5 md:px-2">
      <Button variant="outline" className="text-black! dark:text-white!" size="icon" onClick={() => setTheme("light")}>
        <Sun />
      </Button>
      <Button variant="outline" className="text-black! dark:text-white!" size="icon" onClick={() => setTheme("dark")}>
        <Moon />
      </Button>
    </div>
  )
}
