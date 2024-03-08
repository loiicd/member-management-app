import { useEffect, useState } from 'react'
import Typography from '../components/base/typography'
import UserTable from '../components/userTable'
import StandardLayout from '../layout/standard'
import { getUsers } from '../services/user'
import { User } from '../types/user'
import { useParams } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { UserApiClient } from '../services/userApiClient'
import PageHead from '../components/pageHead'
import NewButton from '../components/newButtom'

const UsersPage = () => {
  const { accountId } = useParams()
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  const authParams = useAuthUser()()

  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)

  useEffect(() => {
    if (!accountId || !authParams) return
    userApiClient.getUsers(searchTerm)
      .then(data => setUsers(data))
  }, [accountId, searchTerm, authParams])

  if (!accountId) throw new Error('Account ID is required')
  if (!authParams) throw new Error('Auth Params is required')
  
  return (
    <StandardLayout accountId={accountId}>
      <PageHead title='Mitglieder'>
        <NewButton>Test</NewButton>
      </PageHead>
      <UserTable users={users} accountId={accountId} />
    </StandardLayout>
  )
}

export default UsersPage