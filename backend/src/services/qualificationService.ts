import { QualificationEntityService } from '../database/qualificationEntityService'
import { QualificationFormDataType, QualificationType } from '../models/qualificationShema'
import { BaseService } from './baseService'

const qualificationEntityService = new QualificationEntityService

export class QualificationService extends BaseService {
  async getAll(accountId: string): Promise<QualificationType[]> {
    return this.performTransaction(async (client) => {
      return await qualificationEntityService.selectQualifications(client, accountId)
    })
  }

  async createQualification(accountId: string, qualification: QualificationFormDataType): Promise<void> {
    this.performTransaction(async (client) => {
      await qualificationEntityService.insertQualification(client, accountId, qualification)
    })
  }
}