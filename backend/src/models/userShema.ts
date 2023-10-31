import { z } from 'zod'

export const UserShema = z.object({
  id:             z.string(),
  firstname:      z.string(),
  lastname:       z.string(),
  birthdate:      z.date().optional(),
  address:        z.string().optional(),
})