import { SparklesIcon, UploadIcon } from "lucide-react"

import AppToggle from "@/components/app-toggle"
import TeamSwitcher from "@/components/team-switcher"
import { Button } from "@/components/ui/button"

const teams = ["Acme Inc.", "Origin UI", "Junon"]

export default function Component() {
  return (
    <header className="">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          <TeamSwitcher teams={teams} defaultTeam={teams[0]} />
        </div>
        {/* Middle area */}
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-sm max-sm:aspect-square max-sm:p-0"
          >
            <UploadIcon
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">Export</span>
          </Button>
          <Button size="sm" className="text-sm max-sm:aspect-square max-sm:p-0">
            <SparklesIcon
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">Upgrade</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
