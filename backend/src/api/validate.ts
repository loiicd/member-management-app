import { z } from 'zod'
import { UserShema, UserFormDataShema } from '../models/userShema'
import { UserFormData, UserType } from '../types'

export const validateUser = (user: any): UserType => UserShema.parse(user)
export const validateUserFormData = (formData: any): UserFormData => UserFormDataShema.parse(formData)

const IDShema = z.string().uuid()
export const validateUUID = (id: any): string => IDShema.parse(id)

const SearchTermShema = z.string().optional()
export const validateSearchTerm = (string: any): string | undefined => SearchTermShema.parse(string)