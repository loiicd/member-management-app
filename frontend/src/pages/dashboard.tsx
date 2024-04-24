import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Account } from '../types/account'
import { AccountApiClient } from '../services/accountApiClient'
import { useAuthHeader } from 'react-auth-kit'
import PageHead from '../components/pageHead'
import StandardLayout from '../layout/standard'

const DashboardPage = () => {
  const { accountId } = useParams()
  const authToken = useAuthHeader()()
  const [account, setAccount] = useState<Account | null>(null)

  if (!accountId) throw new Error('Account ID is required')

  useEffect(() => {
    const accountApiClient = new AccountApiClient('http://localhost:3002', authToken, accountId)
    accountApiClient.getAccount(accountId)
      .then(data => setAccount(data))
  }, [accountId, authToken])
  
  return (
    <StandardLayout accountId={accountId}>
      <PageHead title={`Dashboard - ${account?.organisation_name}`}></PageHead>
      <div className='grid grid-cols-3 gap-4'>
        <div className='rounded-lg bg-white h-60 border'></div>
        <div className='rounded-lg bg-white h-60 border'></div>
        <div className='rounded-lg bg-white h-60 border p-4'>
          <p className='font-semibold'>Offene Aufgaben</p>
        </div>
        <div className='rounded-lg bg-white h-60 border'></div>
        <div className='rounded-lg bg-white h-60 border'></div>
        <div className='rounded-lg bg-white h-60 border'></div>
      </div>
    </StandardLayout>
  )
}

export default DashboardPage