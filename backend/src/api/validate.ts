import { z } from 'zod'
import { UserShema, UserFormDataShema } from '../models/userShema'

export const validateUser = (user: any) => UserShema.parse(user)
export const validateUserFormData = (formData: any) => UserFormDataShema.parse(formData)

const IDShema = z.string().uuid()
export const validateUUID = (id: any): string => {
  return IDShema.parse(id)
}

const SearchTermShema = z.string().optional()
export const validateSearchTerm = (string: any): string | undefined => {
  return SearchTermShema.parse(string)
}