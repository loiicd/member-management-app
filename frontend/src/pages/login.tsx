import { useRef } from "react"
import Button from "../components/base/button"
import Typography from "../components/base/typography"
import { login } from "../services/authenticate"
import { useNavigate } from "react-router-dom"
import { useSignIn } from 'react-auth-kit'

const LoginPage = () => {
  const navigate = useNavigate()
  const signIn = useSignIn()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleLogin = async () => {
    const email = emailInputRef.current?.value
    const password = passwordInputRef.current?.value

    if (email && password) {
      const response = await login(email, password)
      console.log(response.status)
      if (response.status === 200) {
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { email: response.data.email }
        })
        navigate('/dashboard')
      } else {
        alert('Nicht Authorisiert')
      }
    } else {
      alert('Bitte füllen Sie alle Felder aus')
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Typography variant='h5'>Hier steht irgendwas</Typography>
        <Typography variant='h1'>Login</Typography>
        <div className='grid gap-4 grid-cols-1 mt-4'> 
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
          <Button variant='contained' size='lg' onClick={handleLogin}>Anmelden</Button>
        </div>
      </div>
    </main>
  )
}

export default LoginPage