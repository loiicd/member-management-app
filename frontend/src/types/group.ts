import { GroupFilter, GroupFilterFormData } from './groupFilter'
import { User } from './user'

export type Group = {
  id: string
  name: string
  description?: string
  version: number
  users: User[]
  color?: string
} & (IntelligentGroup | StandardGroup)

type IntelligentGroup = { type: 'intelligent', rules: GroupFilter[] }
type StandardGroup = { type: 'standard' }

export type GroupFormData = {
  name?: string
  description?: string
  color?: string
} & (IntelligentGroupFormData | StandardGroupFormData)

type IntelligentGroupFormData = { type: 'intelligent', rules: GroupFilterFormData[] }
type StandardGroupFormData = { type: 'standard', users: string[] }