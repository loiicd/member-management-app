import { z } from 'zod'
import { QualificationShema } from './qualificationShema'

export const UserShema = z.object({
  id:             z.string(),
  firstname:      z.string(),
  lastname:       z.string(),
  birthdate:      z.coerce.date().optional().nullable(),
  address:        z.string().optional().nullable(),
  email:          z.string().optional().nullable(),
  phone:          z.string().optional().nullable(),
  isOnlineUser:   z.boolean(),
  webaccess:      z.boolean(),
  qualifications: z.array(QualificationShema),
})
export type UserType = z.infer<typeof UserShema>

export const UserFormDataShema = z.object({
  firstname:      z.string(),
  lastname:       z.string(),
  birthdate:      z.coerce.date().optional().nullable(),
  address:        z.string().optional().nullable(),
  email:          z.string().optional().nullable(),
  phone:          z.string().optional().nullable(),
  isOnlineUser:   z.boolean(),
  webaccess:      z.boolean(),
})
export type UserFormDataType = z.infer<typeof UserFormDataShema>

export const UserLoginShema = z.object({
  email:          z.string().email(),
  password:       z.string(),
})
export type UserLoginType = z.infer<typeof UserLoginShema>