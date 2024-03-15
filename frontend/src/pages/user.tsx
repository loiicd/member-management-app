import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../services/user'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import PasswordDialog from '../components/passwordDialog'
import StandardLayout from '../layout/standard'
import PageHead from '../components/pageHead'
import Button from '../components/core/Button'
import ApproveDialog from '../components/approveDialog'
import { UserApiClient } from '../services/userApiClient'

const UserPage = () => {
  const navigate = useNavigate()
  const { accountId, id } = useParams()
  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)

  const [user, setUser] = useState<User | null>(null)
  const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false)
  const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false)

  const [tab, setTab] = useState<'general' | 'qualifications'>('general')

  if (!accountId) throw new Error('Account ID is required')
  if (!id) throw new Error('User ID is required')

  useEffect(() => {
    getUser(id).then((data) => setUser(data))
  }, [id])

  const handleDeleteClick = () => setOpenApproveDialog(true)

  const handleDeleteApprove = () => {
    setIsDeletingUser(true)
    userApiClient.deleteUser(id)
      .then(() => {
        navigate('/44484414-a4db-4717-8507-26f5296409dd/users')
        setOpenApproveDialog(false)
      }) //  HardCoded URL ACCOUNT
      .catch((error) => alert(error))
      .finally(() => setIsDeletingUser(false))
  }

  return (
    <StandardLayout accountId={accountId}>
      <PageHead title={`${user?.firstname} ${user?.lastname}`}>
        <div className='flex justify-end gap-2'>
          <UserDialog type='update' userId={user?.id} accountId={accountId}/>
          <Button onClick={handleDeleteClick}>Löschen</Button>
        </div>
      </PageHead>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-2'>
          <ul>
            <li className={`px-3 py-2 rounded-lg cursor-pointer text-sm ${tab === 'general' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-200 text-slate-500'}`} onClick={() => setTab('general')}>
              <FontAwesomeIcon icon={icon({ name: 'table', style: 'solid' })} className='pe-2' />
              Allgemein
            </li>
            <li className={`px-3 py-2 rounded-lg cursor-pointer text-sm ${tab === 'qualifications' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-200 text-slate-500'}`} onClick={() => setTab('qualifications')}>
              <FontAwesomeIcon icon={icon({ name: 'user-graduate', style: 'solid' })} className='pe-2' />
              Qualifikationen
            </li>
          </ul>
        </div>

        {tab === 'general' ? 
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
        : null}

        {tab === 'qualifications' ? 
          <div className='col-span-8'>
            <h2 className='text-2xl'>Einsatzqualifikationen</h2>
            {user?.qualifications.map((qualifiaction) => (
              <p className='text-base'>{qualifiaction.name}</p>  
            ))}
          </div>
        : null}
      </div>

      <ApproveDialog 
        title='User wirklich löschen?' 
        open={openApproveDialog} 
        loading={isDeletingUser} 
        handleClose={() => setOpenApproveDialog(false)} 
        handleApprove={handleDeleteApprove}
      />
    </StandardLayout>
  )
}

export default UserPage