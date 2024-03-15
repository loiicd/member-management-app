import { FunctionComponent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkEmail, registerUser } from '../services/authenticate'
import AuthenticateLayout from '../layout/authenticate'
import Input from '../components/core/Input'
import { Axios, AxiosError } from 'axios'

type ErrorObject = {
  email: string | undefined
  password: string | undefined
  firstname: string | undefined
  lastname: string | undefined
}

const RegisterUserPage: FunctionComponent = () => {
  const navigate = useNavigate()

  const [registerState, setRegisterState] = useState<'email' | 'password' | 'personal'>('email')

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const firstnameInputRef = useRef<HTMLInputElement>(null)
  const lastnameInputRef = useRef<HTMLInputElement>(null)

  const [errors, setErrors] = useState<ErrorObject>({ email: undefined, password: undefined, firstname: undefined, lastname: undefined})

  const handleSubmit = async () => {
    switch(registerState) {
      case 'email':
        handleEmailSubmit()
        break
      case 'password':
        handlePasswordSubmit()
        break
      case 'personal':
        handlePersonalSubmit()
    }
  }

  const handleEmailSubmit = async () => {
    const email = emailInputRef.current?.value
    if (!email) return setErrors({ ...errors, email: 'Bitte E-Mail eingeben' })
    checkEmail(email)
      .then((response) => {
        if (response) {
          setErrors({ ...errors, email: 'E-Mail exestiert bereits!' })
        } else {
          setErrors({ ...errors, email: undefined })
          setRegisterState('password')
        }
      })
      .catch((error: AxiosError) => {
        setErrors({ ...errors, email: error.response?.statusText })
      })
  }

  const handlePasswordSubmit = () => {
    const password = passwordInputRef.current?.value
    if (!password) return setErrors({ ...errors, password: 'Bitte Passwort eingeben' })
    setErrors({ ...errors, password: undefined })
    setRegisterState('personal')
  }

  const handlePersonalSubmit = () => {
    const email = emailInputRef.current?.value
    const password = passwordInputRef.current?.value
    const firstname = firstnameInputRef.current?.value
    const lastname = lastnameInputRef.current?.value

    if (!email || !password || !firstname || !lastname) return
    
    registerUser(email, password, firstname, lastname)
      .then(() => navigate('/login'))
      .catch((error: AxiosError) => alert(error))
  }

  return (
    <AuthenticateLayout>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Registrieren
        </h1>
        <div className='space-y-4 md:space-y-6'>
          <Input label='E-Mail' type='text' ref={emailInputRef} error={errors.email ? true : false} errorMessage={errors.email} disabled={registerState === 'personal' || registerState === 'password'} />
          {registerState === 'password' || registerState === 'personal' ? 
            <Input label='Password' type='password' ref={passwordInputRef} error={errors.password ? true : false} errorMessage={errors.password} disabled={registerState === 'personal'} />
            : null
          }
          {registerState === 'personal' ? 
            <>
              <Input label='Vorname' type='text' error={errors.firstname ? true : false} ref={firstnameInputRef} />
              <Input label='Nachname' type='text' error={errors.lastname ? true : false} ref={lastnameInputRef} />
            </>
            : null
          }
          <button onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Weiter</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Breits ein Account? <p onClick={() => navigate('/login')} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Anmelden</p>
          </p>
        </div>
      </div>
    </AuthenticateLayout>
  )
}

export default RegisterUserPage