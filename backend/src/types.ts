import { UserShema, UserFormDataShema } from './models/userShema'
import { z } from 'zod'

export type UserType = z.infer<typeof UserShema>
export type UserFormDataType = z.infer<typeof UserFormDataShema>