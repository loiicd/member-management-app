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
  is_online_user: z.boolean(),
  webaccess:      z.boolean(),
  password:       z.string().optional().nullable(),
  passwordsalt:   z.string().optional().nullable(),
  created_at:     z.string(),
  updated_at:     z.string(),
  login_email:    z.string().optional().nullable(),
  version:        z.number(),
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
  login_email:    z.string().optional().nullable(),
  is_online_user: z.boolean(),
  webaccess:      z.boolean(),
  password:       z.string().optional().nullable(),
  passwordsalt:   z.string().optional().nullable(),
  qualifications: z.array(z.string())
})
export type UserFormDataType = z.infer<typeof UserFormDataShema>

export const UserLoginShema = z.object({
  email:          z.string().email(),
  password:       z.string(),
})
export type UserLoginType = z.infer<typeof UserLoginShema>

export const UserRegistrationShema = z.object({
  loginEmail:     z.string().email(),
  password:       z.string(),
  firstname:      z.string(),
  lastname:       z.string()
})
export type UserRegistrationType = z.infer<typeof UserRegistrationShema>