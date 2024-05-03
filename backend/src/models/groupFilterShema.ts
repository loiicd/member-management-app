import { z } from 'zod'

export const GroupFilterShema = z.object({
  id:         z.string(),
  group_id:   z.string(),
  entity:     z.enum(['qualification']),
  rule:       z.enum(['include', 'exclude']),
  value:      z.string(),
})
export type GroupFilterType = z.infer<typeof GroupFilterShema>

export const GroupFilterFormDataShema = z.object({
  entity:     z.enum(['qualification']),
  rule:       z.enum(['include', 'exclude']),
  value:      z.string(),
})
export type GroupFilterFormDataType = z.infer<typeof GroupFilterFormDataShema>