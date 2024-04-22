import { useNavigate } from 'react-router-dom'
import { useAuthHeader, useAuthUser, useSignOut } from 'react-auth-kit'
import { useEffect, useMemo, useState } from 'react'
import { UserApiClient } from '../services/userApiClient'

const LandingPage = () => {
  const navigate = useNavigate()
  const signOut = useSignOut()

  const authToken = useAuthHeader()()
  const [accounts, setAccounts] = useState<any>([])
  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, undefined), [authToken])

  const authParams = useAuthUser()()
  
  useEffect(() => {
    if (authParams) {
      userApiClient.getUserAccounts(authParams.id)
        .then((data) => setAccounts(data))
    }
  }, [authParams, userApiClient])

  const handleSignOut = () => {
    signOut()
    navigate('/login')
  }

  return (
    <main className='bg-gray-50 dark:bg-gray-900'>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
          Member Management App
        </p>
        {accounts.map((account: any) => (
          <div id='organizationCard' className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4 cursor-pointer hover:bg-gray-700" onClick={() => navigate(`/${account.id}/dashboard`)}>
            <div className="p-4 space-y-4 md:space-y-4 sm:p-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {account.organisation_name}
              </h1>
            </div>
          </div>
        ))}
        {accounts.length === 0 && (
          <div className="w-full md:mt-4 sm:max-w-md xl:p-0 mb-4" >
            <div className="p-4 space-y-4 md:space-y-4 sm:p-4">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-lg text-center text-gray-500">Du gehörst keiner Organisation an oder hast keinen Online Zugriff</p>
                <button className='mt-4' onClick={handleSignOut}>Abmelden</button>
              </div>
            </div>
          </div>
        )}
        <button
          id='registerButton'
          className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
          onClick={() => navigate('/register/account')}
        >
          Organisation erstellen
        </button>
        <p className='pt-4 text-sm font-light text-center text-gray-500 dark:text-gray-400'>Impressum - Datenschutz</p>
      </div>
    </main>
  )
}

export default LandingPage