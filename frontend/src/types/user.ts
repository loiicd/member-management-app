import { qualification } from './qualification'

export type User = {
  id: string,
  firstname: string,
  lastname: string
  birthdate?: Date,
  address?: string
  email?: string,
  phone?: string,
  webaccess: boolean,
  qualifications: qualification[]
}

export type UserFormData = {
  firstname: string,
  lastname: string
  birthdate?: Date,
  address?: string
  email?: string,
  phone?: string,
  webaccess: boolean
}