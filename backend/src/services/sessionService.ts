import { SessionEntityService } from '../database/sessionEntityService'
import { BaseService } from './baseService'

const sessionEntityService = new SessionEntityService

export class SessionService extends BaseService {
  async createSession(userId: string, token: string, expiresAt: Date): Promise<void> {
    this.performTransaction(async (client) => {
      await sessionEntityService.insertSession(client, userId, token, expiresAt)
    })
  }

  async deleteSession(userId: string): Promise<void> {
    this.performTransaction(async (client) => {
      await sessionEntityService.deleteSession(client, userId)
    })
  }

  async isSessionValid(token: string): Promise<boolean> {
    return this.performTransaction(async (client) => {
      return await sessionEntityService.selectSessionValidation(client, token)
    })
  }

  async getUserId(token: string): Promise<string> {
    return this.performTransaction(async (client) => {
      return await sessionEntityService.selectUserId(client, token)
    })
  }
}