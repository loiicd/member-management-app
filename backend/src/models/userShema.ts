import { z } from 'zod'

export const UserShema = z.object({
  id:             z.string(),
  firstname:      z.string(),
  lastname:       z.string(),
})