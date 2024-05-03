import { User } from './user'

export type Group = {
  id: string
  name: string
  version: number
  users: User[]
  color?: string
}

export type GroupFormData = {
  name?: string
  color?: string
  users: string[]
}