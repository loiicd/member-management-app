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
import PageHead from '../components/pageHead'
import NewButton from '../components/newButtom'

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
      <PageHead title={`${user?.firstname} ${user?.lastname}`}>
        <div className='flex justify-end gap-2'>
          <UserDialog type='update' userId={user?.id} accountId={accountId}/>
          <NewButton onClick={handleClick}>Löschen</NewButton>
        </div>
      </PageHead>


      


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