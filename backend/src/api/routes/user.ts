import express, { Request, Response } from 'express'
import { SortAttribute, SortDirection, UserEntityService } from '../../database/userEntityService'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { validateFilter, validatePageNumber, validateSearchTerm, validateSortAttribute, validateSortDirection, validateString, validateUUID, validateEmail, validateUser, validateUserFormData } from '../validate'
import { authMiddleware } from '../middleware/authMiddleware'
import { AccountEntityService } from '../../database/accountEntityService'

const router = express.Router()
const userEntityService = new UserEntityService
const accountEntityService = new AccountEntityService

// Get one by ID
router.get('/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = validateUUID(req.params.id)
  const user = await userEntityService.getOneById(userId)
  res.status(200).send(user)
}))

// Get all users
router.get('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const data = validateReqData(req)
  const users = await userEntityService.getAll(data.accountId, data.searchTerm, data.sortAttribute, data.sortDirection, data.filter, data.page)
  res.status(200).send(users)
}))

// Create new user
router.post('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const userFormData = validateUserFormData(req.body)
  const response = await userEntityService.insert(accountId, userFormData)
  res.status(200).send(response)
}))

// Update user
router.put('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const user = validateUser(req.body)
  await userEntityService.update(user)
  res.sendStatus(201)
}))

// Update password
router.put('/password/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = validateUUID(req.params.id)
  const password = validateString(req.body.newPassword)
  await userEntityService.updatePassword(userId, password)
  res.sendStatus(201)
}))

// Delete user
router.delete('/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  await userEntityService.delete(id)
  res.sendStatus(201)
}))

// Get accounts by user ID
router.get('/accounts/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  const accounts = await userEntityService.getAccounts(id)
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
  const user = await userEntityService.getOneByEmail(email)
  userEntityService.addAccountRelation(user.id, accountId)
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