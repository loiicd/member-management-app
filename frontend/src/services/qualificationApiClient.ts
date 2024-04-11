import { Qualification } from '../types/qualification'
import { BaseApiClient } from './baseApiClient'

export class QualificationApiClient extends BaseApiClient {

  async getQualifications(accountId: string): Promise<Qualification[]> {
    return (await this.axiosInstance.get('qualification', { params: { accountId }})).data
  }

  async postQualification(accountId: string, qualification: any): Promise<void> {
    await this.axiosInstance.post('qualification', { accountId, qualification })
  }
}