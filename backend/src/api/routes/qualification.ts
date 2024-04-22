import express, { Request, Response } from 'express'
import { QualificationEntityService } from '../../database/qualificationEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validatequalificationFormData, validateUUID } from '../validate'

const router = express.Router()
const qualificationEntityService = new QualificationEntityService

router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.query.accountId)
  const qualifications = await qualificationEntityService.getAll(accountId)
  res.status(200).send(qualifications)
}))

router.post('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.params.accountId)
  const qualification = validatequalificationFormData(req.body.params.qualification)
  await qualificationEntityService.createQualification(accountId, qualification)
  res.sendStatus(201)
}))

export default router