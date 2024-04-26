import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { validatequalificationFormData, validateUUID } from '../validate'
import { authMiddleware } from '../middleware/authMiddleware'
import { QualificationService } from '../../services/qualificationService'

const router = express.Router()
const qualificationService = new QualificationService

router.get('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.query.accountId)
  const qualifications = await qualificationService.getAll(accountId)
  res.status(200).send(qualifications)
}))

router.post('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.headers.accountid)
  const qualification = validatequalificationFormData(req.body.qualification)
  await qualificationService.createQualification(accountId, qualification)
  res.sendStatus(201)
}))

router.delete('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const qualificationId = validateUUID(req.query.qualificationId)
  await qualificationService.deleteQualification(qualificationId)
  res.sendStatus(201)
}))

export default router