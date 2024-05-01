import { BaseService } from './baseService'
import { GroupFormDataType, GroupType } from '../models/groupShema'
import { GroupEntityService } from '../database/groupEntityService'

const groupEntityService = new GroupEntityService()

export class GroupService extends BaseService {
  async getOne(groupId: string): Promise<GroupType> {
    return this.performTransaction(async (client) => {
      const group = await groupEntityService.selectGroup(client, groupId)
      if (!group) {
        throw new Error('Da fehlt was')
      }
      return group
    })
  }

  async getAll(accountId: string): Promise<GroupType[]> {
    return this.performTransaction(async (client) => {
      return await groupEntityService.selectGroups(client, accountId)
    })
  }

  async createGroup(accountId: string, group: GroupFormDataType): Promise<void> {
    return this.performTransaction(async (client) => {
      await groupEntityService.insertGroup(client, accountId, group)
    })
  }

  async updateGroup(group: GroupType): Promise<void> {
    return this.performTransaction(async (client) => {
      await groupEntityService.updateGroup(client, group)
    })
  }

  async deleteGroup(groupId: string): Promise<void> {
    return this.performTransaction(async (client) => {
      // const relations = await groupEntityService.selectUserRelations(client, groupId)

      // if (relations.length != 0) {
      //   throw new Error('Kann nicht gelöscht werden da noch relation!')
      // } else {
        await groupEntityService.deleteGroup(client, groupId) 
      // }
    })
  }
}