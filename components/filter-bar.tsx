"use client"

import { cn } from "@/lib/utils"
import type { UpdateType } from "@/types/updates"
import { Search, X } from "lucide-react"

const TYPE_FILTERS: { label: string; value: UpdateType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Improved", value: "improved" },
  { label: "Fixed", value: "fixed" },
  { label: "Removed", value: "removed" },
  { label: "Updated", value: "updated" },
]

const PILL_ACTIVE: Record<UpdateType | "all", string> = {
  all: "bg-foreground text-background border-foreground",
  new: "bg-[var(--badge-new-bg)] text-[var(--badge-new-text)] border-[var(--badge-new-text)]/30",
  improved:
    "bg-[var(--badge-improved-bg)] text-[var(--badge-improved-text)] border-[var(--badge-improved-text)]/30",
  fixed:
    "bg-[var(--badge-fixed-bg)] text-[var(--badge-fixed-text)] border-[var(--badge-fixed-text)]/30",
  removed:
    "bg-[var(--badge-removed-bg)] text-[var(--badge-removed-text)] border-[var(--badge-removed-text)]/30",
  updated:
    "bg-[var(--badge-updated-bg)] text-[var(--badge-updated-text)] border-[var(--badge-updated-text)]/30",
}

interface FilterBarProps {
  activeFilter: UpdateType | "all"
  onFilterChange: (filter: UpdateType | "all") => void
  activeApp: string
  onAppChange: (app: string) => void
  apps: string[]
  search: string
  onSearchChange: (s: string) => void
  totalCount: number
  filteredCount: number
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  activeApp,
  onAppChange,
  apps,
  search,
  onSearchChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          size={15}
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search updates..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search updates"
          className={cn(
            "w-full rounded-xl border border-border bg-card text-foreground",
            "pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-1 focus:ring-ring transition-colors",
            "hover:border-foreground/20"
          )}
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Pills + App filter row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Type pills */}
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter by type"
        >
          {TYPE_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              aria-pressed={activeFilter === value}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                activeFilter === value
                  ? PILL_ACTIVE[value]
                  : "border-border text-muted-foreground bg-transparent hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* App dropdown + result count */}
        <div className="flex items-center gap-3">
          {apps.length > 1 && (
            <select
              value={activeApp}
              onChange={(e) => onAppChange(e.target.value)}
              aria-label="Filter by app"
              className={cn(
                "rounded-xl border border-border bg-card text-foreground",
                "px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
                "hover:border-foreground/20 transition-colors cursor-pointer"
              )}
            >
              <option value="all">All Apps</option>
              {apps.map((app) => (
                <option key={app} value={app}>
                  {app}
                </option>
              ))}
            </select>
          )}
          <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
            {filteredCount === totalCount
              ? `${totalCount} updates`
              : `${filteredCount} of ${totalCount}`}
          </span>
        </div>
      </div>
    </div>
  )
}
