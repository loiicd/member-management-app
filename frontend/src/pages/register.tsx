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
              <button type="submit" onClick={handleRegister} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrieren</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Breits ein Account? <a onClick={() => navigate('/login')} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Anmelden</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>


    // <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
    //   <div className="text-center">
    //     <Typography variant='h5'>Hier steht irgendwas</Typography>
    //     <Typography variant='h1'>Registrieren</Typography>
    //     <div className='grid gap-4 grid-cols-1 mt-4'> 
    //     <div>
    //       <label className='block text-sm font-medium leading-6 text-black dark:text-white'>Organisationsname</label>
    //       <input 
    //         ref={organisationsNameRef}
    //         className='bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500'
    //       />
    //     </div>

    //     <div>
    //       <label className='block text-sm font-medium leading-6 text-black dark:text-white'>E-Mail</label>
    //       <input 
    //         ref={emailInputRef}
    //         className={`bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
    //       />
    //     </div>

    //     <div>
    //       <label className='block text-sm font-medium leading-6 text-black dark:text-white'>Password</label>
    //       <input 
    //         type='password'
    //         ref={passwordInputRef}
    //         className={`bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
    //       />
    //     </div>

    //     </div>
    //     <div className="mt-10 flex items-center justify-center gap-x-6">
    //       <Button variant='contained' size='lg' onClick={handleRegister}>Registrieren</Button>
    //     </div>
    //   </div>
    // </main>
  )
}

export default RegisterPage