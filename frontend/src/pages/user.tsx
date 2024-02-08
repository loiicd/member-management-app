import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, deleteUser } from '../services/user'
import Button from '../components/base/button'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import PasswordDialog from '../components/passwordDialog'
import StandardLayout from '../layout/standard'

const UserPage = () => {
  const navigate = useNavigate()
  const { accountId, id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((data) => setUser(data))
    }
  }, [id])

  const handleClick = () => {
    if (id) {
      deleteUser(id)
        .then(() => navigate('/44484414-a4db-4717-8507-26f5296409dd/users')) //  HardCoded URL ACCOUNT
        .catch((error) => alert(error))
    }
  }

  if (!accountId) throw new Error('Account ID is required')

  return (
    <StandardLayout accountId={accountId}>
      <div className='flex justify-between'>
        <div className='flex space-x-2'>
          <button
            onClick={() => navigate('/44484414-a4db-4717-8507-26f5296409dd/users')}
            className='px-3 text-gray-500 rounded-full hover:bg-zinc-700'
          >  {/* HardCoded URL ACCOUNT */}
            <FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} size='xl'/>
          </button>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
          {user?.firstname} {user?.lastname}
          </h3>
          {/* <Typography variant='h3'>{user?.firstname} {user?.lastname}</Typography> */}
        </div>
        <div className='flex space-x-2'>
          <UserDialog type='update' userId={user?.id} />
          <Button onClick={handleClick} variant='outlined'>Löschen</Button>
        </div>
      </div>

      <div className='border rounded-lg border-zinc-600 mt-2 p-4'>
        <div className='grid gap-2 grid-cols-4'>
          <Typography variant='text'>Geburstdatum:</Typography>
          <Typography variant='text'>{user?.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography>
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
        <div className='grid gap-2 grid-cols-4'>
          <Typography variant='text'>Passwort:</Typography>
          <Typography variant='text'>********** { user ? <PasswordDialog userId={user?.id} /> : null}</Typography>
        </div>
      </div>

      <div className='border rounded-lg border-zinc-600 mt-2 p-4'>
        <Typography variant='h4'>Einsatzqualifikationen</Typography>
        {user?.qualifications.map((qualification) => (
          <Typography variant='text'>{qualification.name}</Typography>
        ))}
      </div>
    </StandardLayout>
  )
}

export default UserPage