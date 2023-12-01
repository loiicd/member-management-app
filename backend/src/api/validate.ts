import { z } from 'zod'
import { UserShema } from '../models/userShema'

export const validateUser = (user: any) => UserShema.parse(user)

const IDShema = z.string().uuid()
export const validateUUID = (id: any): string => {
  return IDShema.parse(id)
}

const SearchTermShema = z.string().optional()
export const validateSearchTerm = (string: any): string | undefined => {
  return SearchTermShema.parse(string)
}