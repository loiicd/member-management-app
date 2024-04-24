import { UserEntityService } from '../database/userEntityService'
import { AccountEntityService } from '../database/accountEntityService'

const userEntityService = new UserEntityService
const accountEntityService = new AccountEntityService

export const deleteUserHandler = async (userId: string, accountId: string): Promise<string> => {
  const user = await userEntityService.getOneById(userId)
  if (!user) {
    throw new Error('User exestiert nicht')
  }

  const accounts = await userEntityService.getAccounts(userId)
  if (accounts.length > 1) {
    await accountEntityService.removeUserById(accountId, userId) 
    return 'User wurde aus Account entfernt'
  } else {
    await accountEntityService.removeUserById(accountId, userId)
    await userEntityService.delete(userId)
    return 'User wurde gelöscht'
  }
}