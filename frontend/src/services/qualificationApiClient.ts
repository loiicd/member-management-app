import { Qualification } from '../types/qualification'
import { BaseApiClient } from './baseApiClient'

export class QualificationApiClient extends BaseApiClient {

  async getQualifications(accountId: string): Promise<Qualification[]> {
    return (await this.axiosInstance.get('qualification', { params: { accountId }})).data
  }

  async postQualification(qualification: any): Promise<void> {
    await this.axiosInstance.post('qualification', { qualification })
  }

  async deleteQualification(qualificationId: string): Promise<void> {
    await this.axiosInstance.delete('qualification', { params: { qualificationId } })
  }
}