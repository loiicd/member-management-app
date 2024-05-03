import { BaseService } from './baseService'
import { GroupFormDataType, GroupType } from '../models/groupShema'
import { GroupEntityService } from '../database/groupEntityService'
import { UserGroupRelEntityService } from '../database/userGroupRelEntityService'
import { UserEntityService } from '../database/userEntityService'
import { GroupFilterEntityService } from '../database/groupFilterEntityService'

const groupEntityService = new GroupEntityService
const groupFilterEntityService = new GroupFilterEntityService
const userGroupRelEntityService = new UserGroupRelEntityService
const userEntityService = new UserEntityService

export class GroupService extends BaseService {

  async getOne(groupId: string): Promise<GroupType> {
    return this.performTransaction(async (client) => {
      const group = await groupEntityService.selectGroup(client, groupId)
      group.rules = await groupFilterEntityService.selectGroupFilters(client, groupId)
      const userIds = await userGroupRelEntityService.getRelations(client, groupId)
      group.users = await Promise.all(userIds.map(async (userId) => await userEntityService.getOneById(client, userId)))
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
      const groupId = await groupEntityService.insertGroup(client, accountId, group)
      await Promise.all(group.rules.map(async (groupFilter) => {
        await groupFilterEntityService.insertGroupFilter(client, groupId, groupFilter)
      }))
      await Promise.all(group.users.map(async (userId) => {
        await userGroupRelEntityService.insertRelation(client, userId, groupId, accountId)
      }))
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