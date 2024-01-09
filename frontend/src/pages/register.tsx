import { useRef } from 'react'
import Button from '../components/base/button'
import Typography from '../components/base/typography'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authenticate'

const RegisterPage = () => {
  const navigate = useNavigate()
  const organisationsNameRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleRegister = async () => {
    const organisationsName = organisationsNameRef.current?.value
    const email = emailInputRef.current?.value
    const password = passwordInputRef.current?.value

    if (email && password && organisationsName) {
      const response = await register(organisationsName, email, password)
      if (response.status === 200) {
        navigate('/login')
      } else {
        alert('Fehlgeschlagen')
      }
    } else {
      alert('Bitte füllen Sie alle Felder aus')
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Typography variant='h5'>Hier steht irgendwas</Typography>
        <Typography variant='h1'>Registrieren</Typography>
        <div className='grid gap-4 grid-cols-1 mt-4'> 
        <div>
          <label className='block text-sm font-medium leading-6 text-black dark:text-white'>Organisationsname</label>
          <input 
            ref={organisationsNameRef}
            className='bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium leading-6 text-black dark:text-white'>E-Mail</label>
          <input 
            ref={emailInputRef}
            className={`bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
          />
        </div>

        <div>
          <label className='block text-sm font-medium leading-6 text-black dark:text-white'>Password</label>
          <input 
            type='password'
            ref={passwordInputRef}
            className={`bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
          />
        </div>

        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button variant='contained' size='lg' onClick={handleRegister}>Registrieren</Button>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage