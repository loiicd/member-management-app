import { User } from './user'

export type UserApiResponse = {
  page: number,
  total: number, 
  data: User[]
}