import { z } from 'zod'

export const AccountShema = z.object({
  id:                 z.string(),
  organisation_name:   z.string(),
})
export type AccountType = z.infer<typeof AccountShema>