import Button from "../components/base/button"
import Input from "../components/base/input"
import Typography from "../components/base/typography"

const LoginPage = () => {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Typography variant='h5'>Hier steht irgendwas</Typography>
        <Typography variant='h1'>Login</Typography>
        <div className='grid gap-4 grid-cols-1 mt-4'> 
        <Input label='E-Mail' />
        <Input label='Passwort' />
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button variant='contained' size='lg'>Anmelden</Button>
        </div>
      </div>
    </main>
  )
}

export default LoginPage