import { User } from './user'

export type UserApiResponse = {
  page: number,
  total: number, 
  data: User[]
}

export type ApiResponse = UserCreatedResponse | MailExistsResponse | RelExistsResponse

type UserCreatedResponse = {
  type: 'userCreated'
}

type MailExistsResponse = {
  type: 'mailExists',
  userId: string
}

type RelExistsResponse = {
  type: 'relExists'
  userId: string
}