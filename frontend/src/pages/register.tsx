import { forwardRef, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authenticate'

interface InputElementProps {
  label: string,
  type: 'email' | 'password' | 'text',
  error?: boolean
}

const InputElement = forwardRef<HTMLInputElement, InputElementProps>(({label, type, error = false}, ref) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
    <input 
      ref={ref} 
      type={type} 
      className={`bg-gray-50 border ${error ? 'border-red-600' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 ${error ? 'dark:border-red-600' : 'dark:border-gray-600'} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
      required
    />
  </div>
))

const RegisterPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const [organisationsNameError, setOrganisationsNameError] = useState(false)
  const [emailInputError, setEmailInputError] = useState(false)
  const [passwordInputError, setpasswordInputError] = useState(false)

  const organisationsNameRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleRegister = async (): Promise<void> => {
    const organisationsName = organisationsNameRef.current?.value
    const email = emailInputRef.current?.value
    const password = passwordInputRef.current?.value

    if (!organisationsName) setOrganisationsNameError(true)
    if (!email) setEmailInputError(true)
    if (!password) setpasswordInputError(true)

    if (organisationsName) setOrganisationsNameError(false)
    if (email) setEmailInputError(false)
    if (password) setpasswordInputError(false)

    if (email && password && organisationsName) {
      try {
        await register(organisationsName, email, password)
        navigate('/login')
      } catch {
        setError(true)
      }
    }
  }

  return (
    <main className='bg-gray-50 dark:bg-gray-900'>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
          Member Management App    
        </p>
        <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registrieren
            </h1>
            <div className='space-y-4 md:space-y-6'>
              <InputElement label='Organisationsname' type='text' error={organisationsNameError} ref={organisationsNameRef} />
              <InputElement label='E-Mail' type='email' error={emailInputError} ref={emailInputRef} />
              <InputElement label='Passwort' type='password' error={passwordInputError} ref={passwordInputRef} />
              { error ? <p className='text-red-600'>Fehler beim Registrieren</p> : null }
              <button onClick={handleRegister} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrieren</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Breits ein Account? <a onClick={() => navigate('/login')} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Anmelden</a>
              </p>
            </div>
          </div>
        </div>
        <p className='pt-4 text-sm font-light text-center text-gray-500 dark:text-gray-400'>Impressum - Datenschutz</p>
      </div>
    </main>
  )
}

export default RegisterPage