export type GroupFilter = {
  id: string
  group_id: string
  entity: 'qualification'
  rule: 'include' | 'exclude'
  value: string
}

export type GroupFilterFormData = {
  entity: 'qualification' | null
  rule: 'include' | 'exclude' | null
  value: string | null
}