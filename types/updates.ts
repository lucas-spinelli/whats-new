export type UpdateType = "new" | "improved" | "fixed" | "removed" | "updated"

export interface Update {
  id: string
  date: string
  title: string
  description: string
  type: UpdateType
  app: string
  slug: string
  tags: string[]
  important: boolean
}
