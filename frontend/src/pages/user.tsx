import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, deleteUser } from '../services/user'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import PasswordDialog from '../components/passwordDialog'
import StandardLayout from '../layout/standard'
import PageHead from '../components/pageHead'
import NewButton from '../components/newButtom'
import ApproveDialog from '../components/approveDialog'

const UserPage = () => {
  const navigate = useNavigate()
  const { accountId, id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((data) => setUser(data))
    }
  }, [id])

  const handleDeleteClick = () => {
    setOpenApproveDialog(true)
  }

  const handleDeleteApprove = () => {
    if (id) {
      deleteUser(id)
        .then(() => navigate('/44484414-a4db-4717-8507-26f5296409dd/users')) //  HardCoded URL ACCOUNT
        .catch((error) => alert(error))
        .finally(() => setOpenApproveDialog(false))
    }
  }

  if (!accountId) throw new Error('Account ID is required')

  return (
    <StandardLayout accountId={accountId}>
      <PageHead title={`${user?.firstname} ${user?.lastname}`}>
        <div className='flex justify-end gap-2'>
          <UserDialog type='update' userId={user?.id} accountId={accountId}/>
          <NewButton onClick={handleDeleteClick}>Löschen</NewButton>
        </div>
      </PageHead>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-2'>
          <ul>
            <li className='px-3 py-2 rounded-lg cursor-pointer bg-gray-200 text-sm font-semibold'>
              <FontAwesomeIcon icon={icon({ name: 'table', style: 'solid' })} className='pe-2' />
              Allgemein
            </li>
            <li className='px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 text-sm text-slate-500'>
              <FontAwesomeIcon icon={icon({ name: 'user-graduate', style: 'solid' })} className='pe-2' />
              Qualifikationen
            </li>
          </ul>
        </div>
        <div className='col-span-8'>
          <h2 className='text-2xl'>Allgemein</h2>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>
              <p className='text-base'>Name:</p>  
              <p className='text-base'>Geburtsdatum:</p>
              <p className='text-base'>Online Zugang:</p>
            </div>  
            <div className='col-span-1'>
              <p className='text-base'>{user?.firstname} {user?.lastname}</p>
              <p className='text-base'>{user?.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
              <p className='text-base'>{user?.webaccess ? 'Ja' : 'Nein'}</p>
            </div>
          </div>
          <div className='border-b my-4'></div>
          <h3 className='text-xl'>Kontaktdaten</h3>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>
              <p className='text-base'>E-Mail:</p>
              <p className='text-base'>Telefon:</p>
            </div>  
            <div className='col-span-1'>
              <p className='text-base'>{user?.email}</p>
              <p className='text-base'>{user?.phone}</p>
            </div>
          </div>
          <div className='border-b my-4'></div>
          <h3 className='text-xl'>Secruity</h3>
          <div className='grid grid-cols-4'>
            <div className='col-span-1'>
              <p className='text-base'>Passwort:</p>
            </div>  
            <div className='col-span-1'>
              <p className='text-base'>*********** { user ? <PasswordDialog userId={user?.id} /> : null}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='border rounded-lg border-zinc-600 mt-2 p-4'>
        <Typography variant='h4'>Einsatzqualifikationen</Typography>
        {user?.qualifications.map((qualification) => (
          <Typography variant='text'>{qualification.name}</Typography>
        ))}
      </div>
      <ApproveDialog title='User wirklich löschen?' open={openApproveDialog} handleClose={() => setOpenApproveDialog(false)} handleApprove={handleDeleteApprove} />
    </StandardLayout>
  )
}

export default UserPage