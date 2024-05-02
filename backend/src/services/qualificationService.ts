import { UserQualificationRelEntityService } from '../database/userQualificationRelEntityService'
import { QualificationEntityService } from '../database/qualificationEntityService'
import { QualificationFormDataType, QualificationType } from '../models/qualificationShema'
import { BaseService } from './baseService'

const qualificationEntityService = new QualificationEntityService
const userQualificationRelEntityService = new UserQualificationRelEntityService

export class QualificationService extends BaseService {
  async getOne(qualificationId: string): Promise<QualificationType> {
    return this.performTransaction(async (client) => {
      const qualification = await qualificationEntityService.selectQualification(client, qualificationId)
      if (!qualification) {
        throw new Error('Da fehlt was')
      }
      return qualification
    })
  }

  async getAll(accountId: string): Promise<QualificationType[]> {
    return this.performTransaction(async (client) => {
      return await qualificationEntityService.selectQualifications(client, accountId)
    })
  }

  async createQualification(accountId: string, qualification: QualificationFormDataType): Promise<void> {
    return this.performTransaction(async (client) => {
      await qualificationEntityService.insertQualification(client, accountId, qualification)
    })
  }

  async updateQualification(qualification: QualificationType): Promise<void> {
    return this.performTransaction(async (client) => {
      await qualificationEntityService.updateQualification(client, qualification)
    })
  }

  async deleteQualification(qualificationId: string): Promise<void> {
    return this.performTransaction(async (client) => {
      const relations = await userQualificationRelEntityService.selectRelationsByQualification(client, qualificationId)

      if (relations.length != 0) {
        throw new Error('Kann nicht gelöscht werden da noch relation!')
      } else {
        await qualificationEntityService.deleteQualification(client, qualificationId) 
      }
    })
  }
}