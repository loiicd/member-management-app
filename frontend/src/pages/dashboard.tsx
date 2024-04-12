import { useParams } from 'react-router-dom'
import StandardLayout from '../layout/standard'
import { useEffect, useState } from 'react'
import { Account } from '../types/account'
import PageHead from '../components/pageHead'
import { AccountApiClient } from '../services/accountApiClient'

const DashboardPage = () => {
  const { accountId } = useParams()
  const [account, setAccount] = useState<Account | null>(null)

  if (!accountId) throw new Error('Account ID is required')

  useEffect(() => {
    const accountApiClient = new AccountApiClient('http://localhost:3002', undefined, accountId)
    accountApiClient.getAccount(accountId)
      .then(data => setAccount(data))
  }, [accountId])
  
  return (
    <StandardLayout accountId={accountId}>
      <PageHead title={`Dashboard - ${account?.organisation_name}`}></PageHead>
      <div className='h-screen'>
        <div className='border rounded'>
          <p>Hello</p>
        </div>
      </div>
    </StandardLayout>
  )
}

export default DashboardPage