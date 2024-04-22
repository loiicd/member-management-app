import { SessionService } from '../database/sessionService'
import { UserEntityService } from '../database/userEntityService'

const sessionService = new SessionService()
const userEntityService = new UserEntityService()

export const validateUserAuth = async (authToken: string, accountId: string) => {
  const splitAuthToken = authToken.split(' ')[1]
  
  const userId = await sessionService.getUserIdByToken(splitAuthToken)
  const sessionIsValid = await sessionService.isSessionValid(splitAuthToken)
  const accounts = await userEntityService.getAccounts(userId)

  if (accounts.find(account => account.id === accountId) && sessionIsValid) {
    return true
  } else {
    return false
  }
}