"use client"

import { cn } from "@/lib/utils"
import type { Update, UpdateType } from "@/types/updates"
import { format, parseISO } from "date-fns"

const TYPE_CONFIG: Record<
  UpdateType,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className:
      "bg-[var(--badge-new-bg)] text-[var(--badge-new-text)] border border-[var(--badge-new-text)]/20",
  },
  improved: {
    label: "Improved",
    className:
      "bg-[var(--badge-improved-bg)] text-[var(--badge-improved-text)] border border-[var(--badge-improved-text)]/20",
  },
  fixed: {
    label: "Fixed",
    className:
      "bg-[var(--badge-fixed-bg)] text-[var(--badge-fixed-text)] border border-[var(--badge-fixed-text)]/20",
  },
  removed: {
    label: "Removed",
    className:
      "bg-[var(--badge-removed-bg)] text-[var(--badge-removed-text)] border border-[var(--badge-removed-text)]/20",
  },
  updated: {
    label: "Updated",
    className:
      "bg-[var(--badge-updated-bg)] text-[var(--badge-updated-text)] border border-[var(--badge-updated-text)]/20",
  },
}

interface UpdateCardProps {
  update: Update
  index: number
}

export function UpdateCard({ update, index }: UpdateCardProps) {
  const typeConfig = TYPE_CONFIG[update.type]
  const formattedDate = format(parseISO(update.date), "MMM d, yyyy")

  return (
    <article
      className={cn(
        "group relative rounded-xl border bg-card text-card-foreground p-6",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20",
        "animate-in fade-in slide-in-from-bottom-3",
        update.important &&
          "border-l-2 border-l-primary/50 pl-[calc(1.5rem-2px)]",
        !update.important && "border-border"
      )}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
      aria-label={`${update.type} update: ${update.title}`}
    >
      {/* Important glow */}
      {update.important && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse 60% 30% at 50% 0%, oklch(0.96 0 0 / 0.03), transparent)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Top row: badge + date */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide",
              typeConfig.className
            )}
          >
            {typeConfig.label}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {update.app}
          </span>
          {update.important && (
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide bg-primary/8 text-primary border border-primary/15">
              Important
            </span>
          )}
        </div>
        <time
          dateTime={update.date}
          className="text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums"
        >
          {formattedDate}
        </time>
      </div>

      {/* Title */}
      <h2 className="text-base font-semibold leading-snug text-foreground mb-2 text-balance">
        {update.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {update.description}
      </p>

      {/* Tags */}
      {update.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {update.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-muted-foreground bg-muted border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
