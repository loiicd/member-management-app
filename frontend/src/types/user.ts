import { Qualification } from './qualification'

export type User = {
  id: string,
  firstname: string,
  lastname: string
  birthdate?: Date,
  address?: string
  email?: string,
  phone?: string,
  isOnlineUser: boolean,
  webaccess: boolean,
  qualifications: Qualification[]
}

export type UserFormData = {
  firstname: string,
  lastname: string
  birthdate?: Date,
  address?: string
  email?: string,
  phone?: string,
  isOnlineUser: boolean,
  webaccess: boolean
}

interface OnlineUser extends CoreUser {
  isOnlineUser: true
  loginEmail: string
}

interface OfflineUser extends CoreUser {
  isOnlineUser: false
}

type CoreUser = {
  id:             string,
  firstname:      string,
  lastname:       string
  birthdate?:     Date,
  address?:       string
  email?:         string,
  phone?:         string,
  webaccess:      boolean,
  qualifications: Qualification[]
}

type UserFinished = OnlineUser | OfflineUser