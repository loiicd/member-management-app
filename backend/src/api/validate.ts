import { z } from 'zod'
import { UserShema, UserFormDataShema, UserLoginShema, UserFormDataType, UserLoginType, UserType } from '../models/userShema'
import { QualificationFormDataShema, QualificationFormDataType } from '../models/qualificationShema'
import { SortAttribute, SortDirection } from '../database/userEntityService'

export const validateUser = (user: any): UserType => UserShema.parse(user)
export const validateUserFormData = (formData: any): UserFormDataType => UserFormDataShema.parse(formData)
export const validateUserLogin = (data: any): UserLoginType => UserLoginShema.parse(data)

export const validatequalificationFormData = (data: any): QualificationFormDataType => QualificationFormDataShema.parse(data)

// const IDShema = z.string().uuid()   (Sollte normaler Weise UUID checken, aber das funktioniert nicht?!)
const IDShema = z.string()
export const validateUUID = (id: any): string => IDShema.parse(id)

const IDsShema = z.array(
  z.string()
)
export const validateUUIDs = (ids: any): string[] => IDsShema.parse(ids)

const SearchTermShema = z.string().optional()
export const validateSearchTerm = (string: any): string | undefined => SearchTermShema.parse(string)

const StringShema = z.string()
export const validateString = (string: any): string => StringShema.parse(string)

const SortAttributeShema = z.enum(['firstname', 'lastname', 'birthdate', 'address', 'webaccess']).default('firstname')
export const validateSortAttribute = (string: any): SortAttribute => SortAttributeShema.parse(string)

const SortDirectionShema = z.enum(['ASC', 'DESC']).default('ASC')
export const validateSortDirection = (string: any): SortDirection => SortDirectionShema.parse(string)

export const validatePageNumber = (string: any) => z.coerce.number().default(1).parse(string)

const FilterShema = z.string().transform((val) => val.split('%'))
export const validateFilter = (string: any): string[] => {
  try {
    return FilterShema.parse(string)
  } catch {
    return []
  }
}