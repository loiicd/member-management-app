import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import { getUser, deleteUser } from '../services/user'
import Button from '../components/base/button'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const UserPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((data: User) => setUser(data))
    }
  }, [id])

  const handleClick = () => {
    if (id) {
      deleteUser(id)
        .then(() => navigate('/'))
        .catch((error) => alert(error))
    }
  }

  return (
    <>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <div className='flex space-x-2'>
            <button
              onClick={() => navigate('/dashboard')}
              className='px-3 text-gray-500 rounded-full hover:bg-zinc-700'
            >
              <FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} size='xl'/>
            </button>
            <Typography variant='h3'>{user?.firstname} {user?.lastname}</Typography>
          </div>
          <div className='flex space-x-2'>
            <UserDialog type='update' userId={user?.id} />
            <Button onClick={handleClick} variant='outlined'>Löschen</Button>
          </div>
        </div>

        <div className='border rounded-lg border-zinc-600 mt-2 p-4'>
          <div className='grid gap-2 grid-cols-4'>
            <Typography variant='text'>Geburstdatum:</Typography>
            <Typography variant='text'>{user?.birthdate?.toLocaleString()}</Typography>
          </div>
          <div className='grid gap-2 grid-cols-4'>
            <Typography variant='text'>Addresse:</Typography>
            <Typography variant='text'>{user?.address}</Typography>
          </div>
          <div className='grid gap-2 grid-cols-4'>
            <Typography variant='text'>Email:</Typography>
            <Typography variant='text'>{user?.email}</Typography>
          </div>
          <div className='grid gap-2 grid-cols-4'>
            <Typography variant='text'>Telefon:</Typography>
            <Typography variant='text'>{user?.phone}</Typography>
          </div>
          <div className='grid gap-2 grid-cols-4'>
            <Typography variant='text'>Online Zugang:</Typography>
            <Typography variant='text'>{user?.webaccess ? 'Ja' : 'Nein'}</Typography>
          </div>
        </div>

      </div>
    </>
  )
}

export default UserPage