import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { validateUUID } from '../validate'
import { authMiddleware } from '../middleware/authMiddleware'
import { GroupService } from '../../services/groupService'
import { GroupFormDataShema, GroupShema } from '../../models/groupShema'

const router = express.Router()
const groupService = new GroupService

router.get('/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const groupId = validateUUID(req.params.id)
  const group = await groupService.getOne(groupId)
  res.status(200).send(group)
}))

router.get('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.query.accountId)
  const groups = await groupService.getAll(accountId)
  res.status(200).send(groups)
}))

router.post('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const group = GroupFormDataShema.parse(req.body.group)
  await groupService.createGroup(accountId, group)
  res.sendStatus(201)
}))

router.put('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const group = GroupShema.parse(req.body.group)
  await groupService.updateGroup(group)
  res.sendStatus(201)
}))

router.delete('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const groupId = validateUUID(req.query.groupId)
  await groupService.deleteGroup(groupId)
  res.sendStatus(201)
}))

export default router