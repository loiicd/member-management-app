import express, { Request, Response } from 'express'
import { SortAttribute, SortDirection, UserEntityService } from '../../database/userEntityService'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { validateFilter, validatePageNumber, validateSearchTerm, validateSortAttribute, validateSortDirection, validateString, validateUUID, validateEmail, validateUser, validateUserFormData } from '../validate'
import { authMiddleware } from '../middleware/authMiddleware'
import { UserService } from '../../services/userService'
import { AccountService } from '../../services/accountService'

const router = express.Router()
const userEntityService = new UserEntityService

const userService = new UserService
const accountService = new AccountService

// Get one by ID
router.get('/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = validateUUID(req.params.id)
  const user = await userService.getUserById(userId)
  res.status(200).send(user)
}))

// Get all users
router.get('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const data = validateReqData(req)
  const users = await userService.getUsers(data.accountId, data.searchTerm, data.sortAttribute, data.sortDirection, data.filter, data.page)
  res.status(200).send(users)
}))

// Create new user
router.post('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const userFormData = validateUserFormData(req.body)
  const response = await userService.createUser(accountId, userFormData)
  res.status(200).send(response)
}))

// Update user
router.put('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const user = validateUser(req.body)
  await userService.updateUser(user, accountId)
  res.sendStatus(201)
}))

// Update password
router.put('/password/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = validateUUID(req.params.id)
  const password = validateString(req.body.newPassword)
  await userService.updatePassword(userId, password)
  res.sendStatus(201)
}))

// Delete user
router.delete('/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const userId = validateUUID(req.params.id)
  const response = await userService.deleteUser(userId, accountId)
  res.status(200).send(response)
}))

// Get accounts by user ID
router.get('/accounts/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  const accounts = await userService.getAccounts(id)
  res.status(200).send(accounts)
}))

// Check E-Mail
router.get('/email/:email', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const email = validateEmail(req.params.email)
  const emailExists = await userEntityService.checkEmail(email)
  res.status(200).send({ emailExists })
}))

router.post('/orgrel/:email', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const email = validateEmail(req.params.email)
  await accountService.addUserByMail(email, accountId)
  res.sendStatus(201)
}))

export default router

interface RequestData {
  accountId: string 
  searchTerm: string
  sortAttribute: SortAttribute
  sortDirection: SortDirection
  page: number
  filter: string[]
}

const validateReqData = (req: Request): RequestData => {
  const accountId = validateUUID(req.headers.accountid)
  const searchTerm = validateSearchTerm(req.query.searchTerm)
  const sortAttribute = validateSortAttribute(req.query.sortAttribute)
  const sortDirection = validateSortDirection(req.query.sortDirection)
  const page = validatePageNumber(req.query.page)
  const filter = validateFilter(req.query.filter)
  return { accountId, searchTerm, sortAttribute, sortDirection, page, filter }
}