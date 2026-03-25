import { ChangelogClient } from "@/components/changelog-client"
import type { Update } from "@/types/updates"
import updatesData from "@/data/updates.json"

export default function WhatsNewPage() {
  // Sort newest first
  const updates: Update[] = [...(updatesData as Update[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            LuckiApps
          </span>
          <span className="text-xs text-muted-foreground">Changelog</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Hero */}
        <section className="mb-14" aria-labelledby="page-heading">
          <h1
            id="page-heading"
            className="text-4xl font-bold tracking-tight text-foreground text-balance mb-3"
          >
            {"What's New"}
          </h1>
          <p className="text-lg text-foreground/80 font-medium mb-2 text-balance">
            Every important change in LuckiApps, in one place.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg text-pretty">
            We share new features, improvements, fixes and removals to keep
            everything transparent.
          </p>
        </section>

        {/* Filters + Updates */}
        <ChangelogClient updates={updates} />
      </main>

      <footer className="border-t border-border mt-24">
        <div className="mx-auto max-w-3xl px-6 py-8 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LuckiApps
          </span>
          <span className="text-xs text-muted-foreground">
            All changes, always transparent.
          </span>
        </div>
      </footer>
    </div>
  )
}
