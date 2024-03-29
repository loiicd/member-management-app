import express, { Request, Response } from 'express'
import { QualificationEntityService } from '../../database/qualificationEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validatequalificationFormData, validateUUID } from '../validate'

const router = express.Router()
const qualificationEntityService = new QualificationEntityService

router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  console.log(req.query)
  const accountId = validateUUID(req.query.accountId)
  const qualifications = await qualificationEntityService.getAll(accountId)
  res.status(200).send(qualifications)
}))

router.post('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.params.accountId)
  const qualification = validatequalificationFormData(req.body.params.qualification)
  await qualificationEntityService.insert(accountId, qualification)
  res.status(200).send('Qualification created') 
}))

export default router