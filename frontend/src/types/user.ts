import { Qualification } from './qualification'

export type User = {
  id: string
  firstname: string
  lastname: string
  birthdate?: Date
  address?: string
  email?: string
  phone?: string
  isOnlineUser: boolean
  webaccess: boolean
  created_at: Date
  updated_at: Date
  qualifications: Qualification[]
}

export type UserFormData = {
  firstname?: string
  lastname?: string
  birthdate?: Date
  address?: string
  email?: string
  phone?: string
  isOnlineUser: boolean
  webaccess: boolean
}