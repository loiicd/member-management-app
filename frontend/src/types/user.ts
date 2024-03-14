import { Qualification } from './qualification'

export type User = {
  id: string,
  firstname: string,
  lastname: string
  birthdate?: Date,
  address?: string
  email?: string,
  phone?: string,
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
  webaccess: boolean
}


interface OnlineUser extends CoreUserData {
  userType:       'SELFMANAGED'
  accountEmail:    string
}

interface OrganisationUser extends CoreUserData {
  userType:       'ORGANISATIONMANAGED'
}

type CoreUserData = {
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

type Test = OrganisationUser | OnlineUser