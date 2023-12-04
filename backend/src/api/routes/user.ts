import express, { Request, Response } from 'express'
import { UserEntityService } from '../../database/userEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateSearchTerm, validateString, validateUUID, validateUser, validateUserFormData } from '../validate'

const router = express.Router()
const userEntityService = new UserEntityService

router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const searchTerm = validateSearchTerm(req.query.searchTerm)
  const users = await userEntityService.getAll(searchTerm)
  res.status(200).send(users)
}))

router.get('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  const user = await userEntityService.getOneById(id)
  res.status(200).send(user)
}))

router.post('/',tryCatchMiddleware(async (req: Request, res: Response) => {
  const userFormData = validateUserFormData(req.body)
  await userEntityService.insert(userFormData)
  res.status(200).send('User created')
}))

router.put('/',tryCatchMiddleware(async (req: Request, res: Response) => {
  const user = validateUser(req.body)
  await userEntityService.update(user)
  res.status(200).send('User updated')
}))

router.put('/password/:id',tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = validateUUID(req.params.id)
  const password = validateString(req.query.password)
  await userEntityService.updatePassword(userId, password)
  res.status(200).send('Password updated')
}))

router.delete('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  await userEntityService.delete(id)
  res.status(200).send('User deleted')
}))

export default router