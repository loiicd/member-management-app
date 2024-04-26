import { Qualification } from '../types/qualification'
import { BaseApiClient } from './baseApiClient'

export class QualificationApiClient extends BaseApiClient {

  async getQualifications(accountId: string): Promise<Qualification[]> {
    return (await this.axiosInstance.get('qualification', { params: { accountId }})).data
  }

  async getQualification(qualificationId: string): Promise<Qualification> {
    return (await this.axiosInstance.get(`qualification/${qualificationId}`)).data
  }

  async postQualification(qualification: any): Promise<void> {
    await this.axiosInstance.post('qualification', { qualification })
  }

  async putQualification(qualification: Qualification): Promise<void> {
    await this.axiosInstance.put('qualification', { qualification })
  }

  async deleteQualification(qualificationId: string): Promise<void> {
    await this.axiosInstance.delete('qualification', { params: { qualificationId } })
  }
}