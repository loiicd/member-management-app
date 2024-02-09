import express, { Request, Response } from 'express'
import { UserEntityService } from '../../database/userEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateSearchTerm, validateString, validateUUID, validateUser, validateUserFormData } from '../validate'

const router = express.Router()
const userEntityService = new UserEntityService

// Get one by ID
router.get('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = validateUUID(req.params.id)
  const user = await userEntityService.getOneById(userId)
  res.status(200).send(user)
}))

// Get all users
router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const searchTerm = validateSearchTerm(req.query.searchTerm)
  const users = await userEntityService.getAll(accountId, searchTerm)
  res.status(200).send(users)
}))

// Create new user
router.post('/',tryCatchMiddleware(async (req: Request, res: Response) => {
  const userFormData = validateUserFormData(req.body)
  await userEntityService.insert(userFormData)
  res.status(200).send('User created')
}))

// Update user
router.put('/',tryCatchMiddleware(async (req: Request, res: Response) => {
  const user = validateUser(req.body)
  await userEntityService.update(user)
  res.status(200).send('User updated')
}))

// Update password
router.put('/password/:id',tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = validateUUID(req.params.id)
  const password = validateString(req.body.newPassword)
  await userEntityService.updatePassword(userId, password)
  res.status(200).send('Password updated')
}))

// Delete user
router.delete('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  await userEntityService.delete(id)
  res.status(200).send('User deleted')
}))

// Get accounts by user ID
router.get('/accounts/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  const accounts = await userEntityService.getAccounts(id)
  res.status(200).send(accounts)
}))

export default router