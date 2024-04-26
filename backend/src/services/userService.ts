import { UserEntityService } from '../database/userEntityService'
import { AccountEntityService } from '../database/accountEntityService'
import { AccountType } from '../models/accountShema'
import { UserFormDataType, UserType } from '../models/userShema'
import { v4 as uuidv4 } from 'uuid'
import { ApiResponse } from '../types/apiResponse'
import { BaseService } from './baseService'
import { DataBaseResponse } from '../types/DataBaseResponse'
import bcryptjs from 'bcryptjs'

const userEntityService = new UserEntityService
const accountEntityService = new AccountEntityService

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
          // const salt = bcryptjs.genSaltSync()
          // userFormData.password = bcryptjs.hashSync(userFormData.password+salt)
          // userFormData.passwordsalt = salt
        }
        await userEntityService.insertUser(client, userId, userFormData)
        if (accountId) {
          await accountEntityService.insertUserRel(client, userId, accountId)
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

  async deleteUser(userId: string, accountId: string): Promise<string> {
    return this.performTransaction(async (client) => {
      const user = await userEntityService.getOneById(client, userId)
      if (!user) {
        throw new Error('User exestiert nicht')
      }

      const accounts = await userEntityService.getAccounts(client, accountId)
      if (accounts.length > 1) {
        await accountEntityService.deleteUserRel(client, accountId, userId)
        return 'User wurde aus Account entfernt'
      } else {
        await accountEntityService.deleteUserRel(client, accountId, userId)
        await userEntityService.removeQualifications(client, userId)
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
    this.performTransaction(async (client) => {
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