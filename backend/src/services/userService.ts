import { UserEntityService } from '../database/userEntityService'
import { AccountType } from '../models/accountShema'
import { UserFormDataType, UserType } from '../models/userShema'
import { v4 as uuidv4 } from 'uuid'
import { ApiResponse } from '../types/apiResponse'
import { BaseService } from './baseService'
import { DataBaseResponse } from '../types/DataBaseResponse'
import { UserQualificationRelEntityService } from '../database/userQualificationRelEntityService'
import { UserAccountRelEntityService } from '../database/userAccountRelEntityService'
import bcryptjs from 'bcryptjs'

const userEntityService = new UserEntityService
const userQualificationRelEntityService = new UserQualificationRelEntityService
const userAccountRelEntityService = new UserAccountRelEntityService

export type SortAttribute = 'firstname' | 'lastname' | 'birthdate' | 'address' | 'webaccess'
export type SortDirection = 'ASC' | 'DESC'

export class UserService extends BaseService {
  async createUser(accountId: string | undefined, userFormData: UserFormDataType): Promise<ApiResponse> {
    return this.performTransaction(async (client) => {
      const user = await userEntityService.getOneByMail(client, userFormData.login_email)
      if (user) {
        const accounts = await userEntityService.getAccounts(client, user.id) 
        const accountRelExists = accounts.some(account => account.id === accountId)
        if (accountRelExists) {
          return { type: 'relExists', userId: user.id }
        } else {
          return { type: 'mailExists', userId: user.id}
        }
      } else {
        const userId = uuidv4()
        if (userFormData.password) {
          this.hashPassword(userFormData)
        }
        await userEntityService.insertUser(client, userId, userFormData)

        userFormData.qualifications.map(async qualificationId => {
          await userQualificationRelEntityService.insertRelation(client, userId, qualificationId, accountId)
        })

        if (accountId) {
          await userAccountRelEntityService.insertRelation(client, userId, accountId)
        }
        return { type: 'userCreated' }
      }
    })
  }

  private hashPassword(userFormData: UserFormDataType): void {
    const salt = bcryptjs.genSaltSync()
    userFormData.password = bcryptjs.hashSync(userFormData.password+salt)
    userFormData.passwordsalt = salt
  }

  async updateUser(user: UserType, accountId: string): Promise<void> {
    return this.performTransaction(async (client) => {

      // validate 
      await userEntityService.updateUser(client, user)

      const qualifications = await userEntityService.getQualifications(client, user.id)

      const addedQualifications = user.qualifications.filter(qualification => !qualifications.some(qual => qual.id === qualification.id))
      const removedQualifications = qualifications.filter(qualification => !user.qualifications.some(qual => qual.id === qualification.id))

      addedQualifications.map(async qualification => {
        await userQualificationRelEntityService.insertRelation(client, user.id, qualification.id, accountId)
      })

      removedQualifications.map(async qualification => {
        await userQualificationRelEntityService.deleteRelation(client, user.id, qualification.id, accountId)
      })
    })
  }

  async deleteUser(userId: string, accountId: string): Promise<string> {
    return this.performTransaction(async (client) => {
      const user = await userEntityService.getOneById(client, userId)
      if (!user) {
        throw new Error('User exestiert nicht')
      }

      const accounts = await userEntityService.getAccounts(client, accountId)
      if (accounts.length > 1) {
        await userAccountRelEntityService.deleteRelation(client, accountId, userId)
        return 'User wurde aus Account entfernt'
      } else {
        await userAccountRelEntityService.deleteRelation(client, accountId, userId)
        await userQualificationRelEntityService.deleteAllRelations(client, userId)
        await userEntityService.deleteUser(client, userId)
        return 'User wurde gelöscht'
      }
    })
  }

  async getUsers(accountId: string, searchTerm: string | undefined, sortAttribute: SortAttribute, sortDirection: SortDirection, filter: string[], page: number): Promise<DataBaseResponse> {
    return this.performTransaction(async (client) => {
      let users: UserType[] = []
      let totalEntries: number
      if (searchTerm) {
        searchTerm.trim().split(' ').join(':* & ')
        users = await userEntityService.getAllWithSearch(client, accountId, searchTerm, sortAttribute, sortDirection, filter, page)
        totalEntries = await userEntityService.getTotalEntriesCount(client, accountId, filter)
      } else {
        users = await userEntityService.getAll(client, accountId, sortAttribute, sortDirection, filter, page)
        totalEntries = await userEntityService.getTotalEntriesCount(client, accountId, filter)
      }
      users.forEach(async (user) => {
        user.qualifications = await userEntityService.getQualifications(client, user.id)
      })

      return { page: page, total: totalEntries, data: users}
    })
  }

  async getUserById(userId: string): Promise<UserType[]> {
    return this.performTransaction(async (client) => {
      const user = await userEntityService.getOneById(client, userId)
      user.qualifications = await userEntityService.getQualifications(client, userId)
      return user
    })
  }

  async getAccounts(userId: string): Promise<AccountType[]> {
    return this.performTransaction(async (client) => {
      return await userEntityService.getAccounts(client, userId)
    })
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    return this.performTransaction(async (client) => {
      const salt = bcryptjs.genSaltSync()
      const hashedPassword = bcryptjs.hashSync(password+salt)  
      await userEntityService.updatePassword(client, userId, hashedPassword, salt)
    })
  }

  async getLoginDataByMail(email: string): Promise<any> {
    return this.performTransaction(async (client) => {
      return await userEntityService.getLoginDataByMail(client, email)
    })
  }
}