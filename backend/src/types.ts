import { UserShema, UserFormDataShema, UserLoginShema } from './models/userShema'
import { z } from 'zod'

export type UserType = z.infer<typeof UserShema>
export type UserFormDataType = z.infer<typeof UserFormDataShema>
export type UserLoginType = z.infer<typeof UserLoginShema>