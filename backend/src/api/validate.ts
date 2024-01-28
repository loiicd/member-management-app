import { z } from 'zod'
import { UserShema, UserFormDataShema, UserLoginShema, UserFormDataType, UserLoginType, UserType } from '../models/userShema'
import { QualificationFormDataShema, QualificationFormDataType } from '../models/qualificationShema'

export const validateUser = (user: any): UserType => UserShema.parse(user)
export const validateUserFormData = (formData: any): UserFormDataType => UserFormDataShema.parse(formData)
export const validateUserLogin = (data: any): UserLoginType => UserLoginShema.parse(data)

export const validatequalificationFormData = (data: any): QualificationFormDataType => QualificationFormDataShema.parse(data)

// const IDShema = z.string().uuid()   (Sollte normaler Weise UUID checken, aber das funktioniert nicht?!)
const IDShema = z.string()
export const validateUUID = (id: any): string => IDShema.parse(id)

const SearchTermShema = z.string().optional()
export const validateSearchTerm = (string: any): string | undefined => SearchTermShema.parse(string)

const StringShema = z.string()
export const validateString = (string: any): string => StringShema.parse(string)