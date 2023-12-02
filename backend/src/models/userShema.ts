import { z } from 'zod'

export const UserShema = z.object({
  id:             z.string(),
  firstname:      z.string(),
  lastname:       z.string(),
  birthdate:      z.coerce.date().optional().nullable(),
  address:        z.string().optional().nullable(),
  email:          z.string().optional().nullable(),
  phone:          z.string().optional().nullable(),
})

export const UserFormDataShema = z.object({
  firstname:      z.string(),
  lastname:       z.string(),
  birthdate:      z.coerce.date().optional().nullable(),
  address:        z.string().optional().nullable(),
  email:          z.string().optional().nullable(),
  phone:          z.string().optional().nullable(),
})