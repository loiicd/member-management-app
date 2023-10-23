import express, { Request, Response } from 'express'
import { UserEntityService } from '../../database/userEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateUUID, validateUser } from '../validate'

const router = express.Router()
const userEntityService = new UserEntityService

router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const users = await userEntityService.getAll()
  res.status(200).send(users)
}))

router.get('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  const user = await userEntityService.getOneById(id)
  res.status(200).send(user)
}))

router.post('/',tryCatchMiddleware(async (req: Request, res: Response) => {
  await userEntityService.insert(req.body)
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