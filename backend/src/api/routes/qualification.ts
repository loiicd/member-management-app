import express, { Request, Response } from 'express'
import { QualificationEntityService } from '../../database/qualificationEntityService'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { validatequalificationFormData, validateUUID } from '../validate'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()
const qualificationEntityService = new QualificationEntityService

router.get('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.query.accountId)
  const qualifications = await qualificationEntityService.getAll(accountId)
  res.status(200).send(qualifications)
}))

router.post('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.params.accountId)
  const qualification = validatequalificationFormData(req.body.params.qualification)
  await qualificationEntityService.createQualification(accountId, qualification)
  res.sendStatus(201)
}))

export default router