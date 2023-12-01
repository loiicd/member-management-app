import express, { Request, Response } from 'express'
import { UserEntityService } from '../../database/userEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateSearchTerm, validateUUID, validateUser } from '../validate'

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
  const { firstname, lastname, birthdate, address } = req.body
  const user = { firstname, lastname, birthdate, address }
  await userEntityService.insert(user)
  res.status(200).send('User created')
}))

router.put('/',tryCatchMiddleware(async (req: Request, res: Response) => {
  const user = validateUser(req.body)
  await userEntityService.update(user)
  res.status(200).send('User updated')
}))

router.delete('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  await userEntityService.delete(id)
  res.status(200).send('User deleted')
}))

export default router