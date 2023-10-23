import { z } from 'zod'
import { UserShema } from '../models/userShema'

export const validateUser = (user: any) => UserShema.parse(user)

const IDShema = z.string().uuid()

export const validateUUID = (id: any): string => {
  console.log(id)
  return IDShema.parse(id)
}