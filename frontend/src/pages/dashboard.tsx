import { useParams } from 'react-router-dom'
import Typography from '../components/base/typography'
import StandardLayout from '../layout/standard'
import { useEffect, useState } from 'react'
import { getAccount } from '../services/account'
import { Account } from '../types/account'
import PageHead from '../components/pageHead'

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
      <PageHead title={`Dashboard - ${account?.organisation_name}`}></PageHead>
      <div className='h-screen'></div>
    </StandardLayout>
  )
}

export default DashboardPage