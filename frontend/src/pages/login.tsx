import { forwardRef, useRef, useState } from 'react'
import { login } from '../services/authenticate'
import { useNavigate } from "react-router-dom"
import { useSignIn } from 'react-auth-kit'

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

const LoginPage = () => {
  const navigate = useNavigate()
  const signIn = useSignIn()
  const [error, setError] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleLogin = async () => {
    const email = emailInputRef.current?.value
    const password = passwordInputRef.current?.value
    try {
      const response = await login(email, password)
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: { email: response.data.email }
      })
      navigate('/dashboard')
    } catch {
      setError(true)
      if (passwordInputRef.current) passwordInputRef.current.value = ''
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
              Anmelden
            </h1>
            <div className='space-y-4 md:space-y-6'>
              <InputElement label='E-Mail' type='email' error={error} ref={emailInputRef} />
              <InputElement label='Passwort' type='password' error={error} ref={passwordInputRef} />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required></input>
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">Angemeldet bleiben</label>
                  </div>
                </div>
                <p className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => alert('Nicht implementiert!')}>Passwort vergessen?</p>
              </div>
              <button type="submit" onClick={handleLogin} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Anmelden</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Kein Account? <a onClick={() => navigate('/register')} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrieren</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage