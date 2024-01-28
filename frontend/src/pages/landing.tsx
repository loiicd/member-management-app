import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <main className='bg-gray-50 dark:bg-gray-900'>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
        Member Management App    
      </p>
      <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4 cursor-pointer hover:bg-gray-700" onClick={() => navigate('/dashboard')}>
        <div className="p-4 space-y-4 md:space-y-4 sm:p-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Organisation XY
          </h1>
        </div>
      </div>
      <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4 cursor-pointer hover:bg-gray-700" onClick={() => navigate('/dashboard')}>
        <div className="p-4 space-y-4 md:space-y-4 sm:p-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Organisation XY
          </h1>
        </div>
      </div>
      <p className='pt-4 text-sm font-light text-center text-gray-500 dark:text-gray-400'>Impressum - Datenschutz</p>
    </div>
  </main>
  )
}

export default LandingPage