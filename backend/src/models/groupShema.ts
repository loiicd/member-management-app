import { z } from 'zod'

export const GroupShema = z.object({
  id:           z.string(),
  name:         z.string(),
  abbreviation: z.string().optional(),
  color:        z.string().optional(),
  version:      z.number()
})
export type GroupType = z.infer<typeof GroupShema>

export const GroupFormDataShema = z.object({
  name:         z.string(),
  abbreviation: z.string().optional(),
  color:        z.string().optional(),
})
export type GroupFormDataType = z.infer<typeof GroupFormDataShema>