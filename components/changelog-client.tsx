"use client"

import { useMemo, useState, useCallback } from "react"
import { FilterBar } from "@/components/filter-bar"
import { UpdateCard } from "@/components/update-card"
import type { Update, UpdateType } from "@/types/updates"

interface ChangelogClientProps {
  updates: Update[]
}

export function ChangelogClient({ updates }: ChangelogClientProps) {
  const [activeFilter, setActiveFilter] = useState<UpdateType | "all">("all")
  const [activeApp, setActiveApp] = useState<string>("all")
  const [search, setSearch] = useState("")

  const apps = useMemo(() => {
    const set = new Set(updates.map((u) => u.app))
    return Array.from(set).sort()
  }, [updates])

  const filtered = useMemo(() => {
    return updates.filter((u) => {
      if (activeFilter !== "all" && u.type !== activeFilter) return false
      if (activeApp !== "all" && u.app !== activeApp) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        const inTitle = u.title.toLowerCase().includes(q)
        const inTags = u.tags.some((t) => t.toLowerCase().includes(q))
        const inDesc = u.description.toLowerCase().includes(q)
        const inApp = u.app.toLowerCase().includes(q)
        if (!inTitle && !inTags && !inDesc && !inApp) return false
      }
      return true
    })
  }, [updates, activeFilter, activeApp, search])

  const handleFilterChange = useCallback((f: UpdateType | "all") => {
    setActiveFilter(f)
  }, [])

  const handleAppChange = useCallback((app: string) => {
    setActiveApp(app)
  }, [])

  const handleSearchChange = useCallback((s: string) => {
    setSearch(s)
  }, [])

  return (
    <div className="space-y-8">
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        activeApp={activeApp}
        onAppChange={handleAppChange}
        apps={apps}
        search={search}
        onSearchChange={handleSearchChange}
        totalCount={updates.length}
        filteredCount={filtered.length}
      />

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block"
          aria-hidden="true"
        />

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted-foreground text-sm">
              No updates match your filters.
            </p>
            <button
              onClick={() => {
                setActiveFilter("all")
                setActiveApp("all")
                setSearch("")
              }}
              className="mt-3 text-xs text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="md:pl-8 space-y-4">
            {filtered.map((update, i) => (
              <UpdateCard key={update.id} update={update} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
