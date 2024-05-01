export type Group = {
  id: string
  name: string
  version: number
  color?: string
}

export type GroupFormData = {
  name?: string
  color?: string
}