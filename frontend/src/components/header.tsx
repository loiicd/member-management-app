import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className='bg-zinc-100 dark:bg-zinc-800 border-b dark:border-zinc-600 mb-4'>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <button className='text-sm font-semibold leading-6 text-black dark:text-white' onClick={() => navigate('/')}>Dashboard</button>
          <button className='text-sm font-semibold leading-6 text-black dark:text-white' onClick={() => navigate('/')}>User</button>
          <button className='text-sm font-semibold leading-6 text-black dark:text-white' onClick={() => navigate('/')}>Einstellungen</button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></button>
        </div>
      </nav>
    </header>
  )
}

export default Header