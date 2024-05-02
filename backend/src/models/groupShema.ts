import { z } from 'zod'
import { UserShema } from './userShema'

export const GroupShema = z.object({
  id:           z.string(),
  name:         z.string(),
  abbreviation: z.string().optional(),
  color:        z.string().optional(),
  version:      z.number(),
  users:        z.array(UserShema)
})
export type GroupType = z.infer<typeof GroupShema>

export const GroupFormDataShema = z.object({
  name:         z.string(),
  abbreviation: z.string().optional(),
  color:        z.string().optional(),
  users:        z.array(z.string())
})
export type GroupFormDataType = z.infer<typeof GroupFormDataShema>