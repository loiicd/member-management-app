import { SessionService } from '../database/sessionService'
import { UserEntityService } from '../database/userEntityService'

const sessionService = new SessionService()
const userEntityService = new UserEntityService()

type WithAccountId = { type: 'WITH_ACCOUNTID', accountId: string }
type WithoutAccountId = { type: 'WITHOUT_ACCOUNTID' }

type ValidateUserAuthProps = {
  authToken: string
} & (WithAccountId | WithoutAccountId)

export const validateUserAuth = async (props: ValidateUserAuthProps): Promise<void> => {
  const splitAuthToken = props.authToken.split(' ')[1]
  
  const userId = await sessionService.getUserIdByToken(splitAuthToken)
  if (!userId) throw new Error('Unauthorized Access')

  const sessionIsValid = await sessionService.isSessionValid(splitAuthToken)
  if (!sessionIsValid) throw new Error('Unauthorized Access')

  if (props.type === 'WITH_ACCOUNTID') {
    const accounts = await userEntityService.getAccounts(userId)
    if (!accounts.find(account => account.id === props.accountId)) throw new Error('Unauthorized Access')
  }
}