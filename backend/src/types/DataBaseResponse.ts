import { UserType } from '../models/userShema'

export type DataBaseResponse = {
  page: number,
  total: number, 
  data: UserType[]
}