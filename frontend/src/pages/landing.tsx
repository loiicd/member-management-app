import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import { getUserAccounts } from '../services/user'

const LandingPage = () => {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState<any>([])

  const authParams = useAuthUser()()

  console.log('AuthParams', authParams)
  
  useEffect(() => {
    if (authParams) {
      getUserAccounts(authParams.id)
        .then((data) => setAccounts(data))
    }
  }, [authParams])

  return (
    <main className='bg-gray-50 dark:bg-gray-900'>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
        Member Management App
      </p>
      {accounts.map((account: any) => (
        <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4 cursor-pointer hover:bg-gray-700" onClick={() => navigate(`/${account.id}/dashboard`)}>
          <div className="p-4 space-y-4 md:space-y-4 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {account.organisation_name}
            </h1>
          </div>
        </div>
      ))}
      {accounts.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-lg text-gray-500">Du gehörst keiner Organisation an</p>
        </div>
      )}
      <p className='pt-4 text-sm font-light text-center text-gray-500 dark:text-gray-400'>Impressum - Datenschutz</p>
    </div>
  </main>
  )
}

export default LandingPage