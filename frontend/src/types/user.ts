import { Qualification } from './qualification'

export type User = {
  id: string
  firstname: string
  lastname: string
  birthdate?: Date
  address?: string
  email?: string
  phone?: string
  is_online_user: boolean
  webaccess: boolean
  created_at: Date
  updated_at: Date
  qualifications: Qualification[]
}

export type UserFormData = {
  firstname: string | null
  lastname: string | null
  birthdate: Date | null
  address: string | null
  email: string | null
  phone: string | null
  is_online_user: boolean
  webaccess: boolean
  qualifications: string[]
}