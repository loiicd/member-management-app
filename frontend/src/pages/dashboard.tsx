import { useParams } from 'react-router-dom'
import Typography from '../components/base/typography'
import StandardLayout from '../layout/standard'
import { useEffect, useState } from 'react'
import { getAccount } from '../services/account'
import { Account } from '../types/account'

const DashboardPage = () => {
  const { accountId } = useParams()
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    if (!accountId) return
    getAccount(accountId)
      .then(data => setAccount(data))
  }, [accountId])

  if (!accountId) throw new Error('Account ID is required')
  
  return (
    <StandardLayout accountId={accountId}>
      <div className='h-screen mt-4'>
        <Typography variant='h3'>Dashboard</Typography>
        <Typography variant='h3'>{account?.organisation_name}</Typography>
      </div>
    </StandardLayout>
  )
}

export default DashboardPage