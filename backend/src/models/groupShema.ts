import { z } from 'zod'
import { UserShema } from './userShema'
import { GroupFilterFormDataShema, GroupFilterShema } from './groupFilterShema'

export const GroupShema = z.object({
  id:           z.string(),
  account_id:   z.string(),
  name:         z.string(),
  description:  z.string().optional(),
  type:         z.enum(['standard', 'intelligent']),
  color:        z.string().optional(),
  version:      z.number(),
  users:        z.array(UserShema).optional(),
  rules:        z.array(GroupFilterShema).optional()
})
export type GroupType = z.infer<typeof GroupShema>

export const GroupFormDataShema = z.object({
  name:         z.string(),
  description:  z.string().optional(),
  type:         z.enum(['standard', 'intelligent']),
  color:        z.string().optional(),
  users:        z.array(z.string()).optional(),
  rules:        z.array(GroupFilterFormDataShema).optional()
})
export type GroupFormDataType = z.infer<typeof GroupFormDataShema>