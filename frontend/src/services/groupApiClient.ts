import { Group, GroupFormData } from '../types/group'
import { BaseApiClient } from './baseApiClient'

export class GroupApiClient extends BaseApiClient {

  async getGroups(accountId: string): Promise<Group[]> {
    return (await this.axiosInstance.get('group', { params: { accountId }})).data
  }

  async getGroup(groupId: string): Promise<Group> {
    return (await this.axiosInstance.get(`group/${groupId}`)).data
  }

  async postGroup(group: GroupFormData): Promise<void> {
    await this.axiosInstance.post('group', { group })
  }

  async putGroup(group: Group): Promise<void> {
    await this.axiosInstance.put('group', { group })
  }

  async deleteGroup(groupId: string): Promise<void> {
    await this.axiosInstance.delete('group', { params: { groupId } })
  }
}