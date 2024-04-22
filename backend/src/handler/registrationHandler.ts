import { ValidateError } from '../database/validateError'
import { UserEntityService } from '../database/userEntityService'
import { UserFormDataType, UserRegistrationType } from '../models/userShema'
import bcryptjs from 'bcryptjs'

const userEntityService = new UserEntityService()

export const registrationHandler = async (user: UserRegistrationType) => {
  const emailExists = await userEntityService.checkEmail(user.loginEmail)

  if (emailExists) {
    throw new ValidateError('EMAIL_ALREADY_EXISTS', 'E-Mail exestiert bereits')
  }

  const salt = bcryptjs.genSaltSync()
  const hashedPassword = bcryptjs.hashSync(user.password+salt)

  const formData: UserFormDataType = {
    firstname: user.firstname,
    lastname: user.lastname,
    birthdate: null,
    address: null,
    email: user.loginEmail, 
    phone: null,
    login_email: user.loginEmail,
    isOnlineUser: true,
    webaccess: true,
    password: hashedPassword,
    passwordsalt: salt
  }

  await userEntityService.createUser(formData)
}