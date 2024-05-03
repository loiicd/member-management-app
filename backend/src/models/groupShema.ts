import { z } from 'zod'
import { UserShema } from './userShema'
import { GroupFilterFormDataShema, GroupFilterShema } from './groupFilterShema'

export const GroupShema = z.object({
  id:           z.string(),
  name:         z.string(),
  abbreviation: z.string().optional(),
  type:         z.enum(['standard', 'intelligent']),
  color:        z.string().optional(),
  version:      z.number(),
  users:        z.array(UserShema),
  rules:        z.array(GroupFilterShema)
})
export type GroupType = z.infer<typeof GroupShema>

export const GroupFormDataShema = z.object({
  name:         z.string(),
  abbreviation: z.string().optional(),
  type:         z.enum(['standard', 'intelligent']),
  color:        z.string().optional(),
  users:        z.array(z.string()),
  rules:        z.array(GroupFilterFormDataShema)
})
export type GroupFormDataType = z.infer<typeof GroupFormDataShema>