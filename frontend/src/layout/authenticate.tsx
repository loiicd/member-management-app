import { FunctionComponent } from 'react'

interface AuthenticateLayoutProps {
  children: React.ReactNode
}

const AuthenticateLayout: FunctionComponent<AuthenticateLayoutProps> = ({ children }) => {
  return (
    <main className='bg-gray-50 dark:bg-gray-900'>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
          Member Management App    
        </p>
        <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {children}
        </div>
        <p className='pt-4 text-sm font-light text-center text-gray-500 dark:text-gray-400'>Impressum - Datenschutz</p>
      </div>
    </main>
  )
}

export default AuthenticateLayout