import { BaseService } from './baseService'
import { GroupFormDataType, GroupType } from '../models/groupShema'
import { GroupEntityService } from '../database/groupEntityService'
import { UserGroupRelEntityService } from '../database/userGroupRelEntityService'
import { UserEntityService } from '../database/userEntityService'
import { GroupFilterEntityService } from '../database/groupFilterEntityService'
import { UserQualificationRelEntityService } from '../database/userQualificationRelEntityService'
import { Client } from 'pg'
import { GroupFilterType } from '../models/groupFilterShema'
import { GroupFilterFormDataType } from '../models/groupFilterShema'

const groupEntityService = new GroupEntityService
const groupFilterEntityService = new GroupFilterEntityService
const userGroupRelEntityService = new UserGroupRelEntityService
const userQualificationRelEntityService = new UserQualificationRelEntityService
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
      switch (group.type) {
        case 'standard':
          this.insertStandardGroupRelations(client, group.users, groupId, accountId)
          break
        case 'intelligent':
          this. insertIntelligentGroupRelations(client, group.rules, groupId, accountId)
          break
      }
    })
  }

  private async insertStandardGroupRelations(client: Client, userIds: string[], groupId: string, accountId: string): Promise<void> {
    await Promise.all(userIds.map(async (userId) => {
      await userGroupRelEntityService.insertRelation(client, userId, groupId, accountId)
    }))
  }

  private async insertIntelligentGroupRelations(client: Client, rules: GroupFilterType[] | GroupFilterFormDataType[], groupId: string, accountId: string): Promise<void> {
    const users: Set<string> = new Set()
  
    await Promise.all(rules.map(async (groupFilter) => {
      await groupFilterEntityService.insertGroupFilter(client, groupId, groupFilter)
      const ruleUsers = await userQualificationRelEntityService.selectRelationsByRule(client, groupFilter)
      ruleUsers.forEach((user) => users.add(user))
    }))
  
    const uniqueUsers: string[] = Array.from(users)
    await Promise.all(uniqueUsers.map(async (userId) => {
      await userGroupRelEntityService.insertRelation(client, userId, groupId, accountId)
    }))
  }

  async updateGroup(group: GroupType): Promise<void> {
    return this.performTransaction(async (client) => {
      await groupEntityService.updateGroup(client, group)

      switch (group.type) {
        case 'standard':
          const userIds = await userGroupRelEntityService.getRelations(client, group.id)
          const addedUsers = group.users.filter((user) => !userIds.includes(user.id))
          await Promise.all(addedUsers.map(async user => {
            await userGroupRelEntityService.insertRelation(client, user.id, group.id, group.account_id)
          }))
          const removedUsers = userIds.filter((userId) => !group.users.map((user) => user.id).includes(userId))
          await Promise.all(removedUsers.map(async userId => {
            await userGroupRelEntityService.deleteRelation(client, userId, group.id, group.account_id)
          }))
          break
        case 'intelligent':
          const ruleRelations = await groupFilterEntityService.selectGroupFilters(client, group.id)
          const addedRules = group.rules.filter((rule) => !ruleRelations.map((rule) => rule.id).includes(rule.id))
          await Promise.all(addedRules.map(async rule => {
            await groupFilterEntityService.insertGroupFilter(client, group.id, rule)
          }))
          const removedRules = ruleRelations.filter((rule) => !group.rules.map((rule) => rule.id).includes(rule.id))
          await Promise.all(removedRules.map(async rule => {
            await groupFilterEntityService.deleteGroupFilter(client, rule.id)
          }))
          break
      }
    })
  }

  async deleteGroup(groupId: string, accountId: string): Promise<void> {
    return this.performTransaction(async (client) => {

      const userRelations = await userGroupRelEntityService.getRelations(client, groupId)
      if (userRelations.length !== 0) {
        await Promise.all(userRelations.map(async userId => {
          await userGroupRelEntityService.deleteRelation(client, userId, groupId, accountId)
        }))
      }

      const ruleRelations = await groupFilterEntityService.selectGroupFilters(client, groupId)
      if (ruleRelations.length !== 0) {
        await Promise.all(ruleRelations.map(async rule => {
          await groupFilterEntityService.deleteGroupFilter(client, rule.id)
        }))
      }

      await groupEntityService.deleteGroup(client, groupId) 
    })
  }
}