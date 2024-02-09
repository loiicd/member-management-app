import { FunctionComponent, forwardRef, useRef, useState } from 'react'
import AuthenticateLayout from '../layout/authenticate'
import { UserApiClient } from '../services/userApiClient'
import { useNavigate, useParams } from 'react-router-dom'

interface InputElementProps {
  label: string,
  type: 'email' | 'password',
  error: boolean
}

const InputElement = forwardRef<HTMLInputElement, InputElementProps>(({label, type, error}, ref) => (
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

const SetPasswordPage: FunctionComponent = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState<boolean>(false)
  const password1InputRef = useRef<HTMLInputElement>(null)
  const password2InputRef = useRef<HTMLInputElement>(null)

  const userApiClient = new UserApiClient('http://localhost:3002', undefined, undefined)

  const handleSetPassword = () => {
    if (!userId) return

    const password1 = password1InputRef.current?.value
    const password2 = password2InputRef.current?.value

    if (password1 !== password2) {
      setError(true)
      if (password1InputRef.current) password1InputRef.current.value = ''
      if (password2InputRef.current) password2InputRef.current.value = ''
    } else {
      userApiClient.updatePassword(userId, password1 as string)
      setError(false) 
      navigate('/login')
    }
  }

  return (
    <AuthenticateLayout>
       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Passwort setzen
        </h1>
        <div className='space-y-4 md:space-y-6'>
          <InputElement label='Passwort' type='password' error={false} ref={password1InputRef} />
          <InputElement label='Passwort wiederholen' type='password' error={false} ref={password2InputRef} />
          { error ? <p className='text-sm text-red-600'>Passwörter stimmen nicht überein!</p> : null }         
          <button onClick={handleSetPassword} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Speichern</button>
        </div>
      </div>
    </AuthenticateLayout>
  )
}

export default SetPasswordPage