import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { UserFormDataType, UserRegistrationShema } from '../../models/userShema'
import { UserService } from '../../services/userService'

const router = express.Router()

const userService = new UserService

router.post('/user/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const user = UserRegistrationShema.parse(req.body)
  const formData: UserFormDataType = {
    firstname: user.firstname,
    lastname: user.lastname,
    birthdate: null,
    address: null,
    email: user.loginEmail, 
    phone: null,
    login_email: user.loginEmail,
    is_online_user: true,
    webaccess: true,
    password: user.password,
    passwordsalt: null
  }
  await userService.createUser(undefined, formData)
  res.sendStatus(201)
}))

export default router