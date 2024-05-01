import { useEffect, useMemo, useState } from 'react'
import { User } from '../types/user'
import { useNavigate, useParams } from 'react-router-dom'
import UserDialog from '../components/userDialog'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import PasswordDialog from '../components/passwordDialog'
import StandardLayout from '../layout/standard'
import PageHead from '../components/pageHead'
import Button from '../components/core/Button'
import ApproveDialog from '../components/approveDialog'
import { UserApiClient } from '../services/userApiClient'
import { useAuthHeader } from 'react-auth-kit'
import Tabs from '@mui/joy/Tabs'
import TabPanel from '@mui/joy/TabPanel'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UpdateUserDialog from '../components/updateUserDialog'

const UserPage = () => {
  const navigate = useNavigate()
  const { accountId, id } = useParams()
  const authToken = useAuthHeader()()

  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken])

  const [user, setUser] = useState<User | null>(null)
  const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false)
  const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false)

  const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState<boolean>(false)

  if (!accountId) throw new Error('Account ID is required')
  if (!id) throw new Error('User ID is required')

  useEffect(() => {
    userApiClient.getUser(id)
      .then(data => setUser(data))
  }, [id, userApiClient])

  const handleDeleteClick = () => setOpenApproveDialog(true)

  const handleDeleteApprove = () => {
    setIsDeletingUser(true)
    userApiClient.deleteUser(id)
      .then(() => {
        navigate(`/${accountId}/users`)
        setOpenApproveDialog(false)
      })
      .catch(error => alert(error))
      .finally(() => setIsDeletingUser(false))
  }

  return (
    <StandardLayout accountId={accountId}>
      <PageHead title={`${user?.firstname} ${user?.lastname}`}> 
        <div className='flex justify-end gap-2'>
          <UserDialog type='update' userId={user?.id} accountId={accountId} />
          <Button onClick={() => setOpenUpdateUserDialog(true)}>Bearbeiten 2</Button>
          <Button onClick={handleDeleteClick}>Löschen</Button>
        </div>
      </PageHead>

      <Tabs>
        <TabList>
          <Tab>
            <FontAwesomeIcon icon={icon({ name: 'sliders', style: 'solid' })} />
              Allgemein
            </Tab>
          <Tab>
            <FontAwesomeIcon icon={icon({ name: 'user-graduate', style: 'solid' })} />
            Qualifikationen
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <h2 className='text-2xl'>Allgemein</h2>
          <div className="flow-root mt-4">
            <dl className="-my-3 divide-y divide-gray-300 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.firstname} {user?.lastname}</dd>
                <dt className="font-medium text-gray-900">Geburtsdatum</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</dd>
                <dt className="font-medium text-gray-900">Adresse</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.address}</dd>
                <dt className="font-medium text-gray-900">Online Zugang</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.webaccess ? 'Ja' : 'Nein'}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">E-Mail</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.email}</dd>
                <dt className="font-medium text-gray-900">Telefon</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.phone}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Passwort</dt>
                <dd className="text-gray-700 sm:col-span-2">*********** { user ? <PasswordDialog userId={user?.id} /> : null}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Erstellt am</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.created_at.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' })} Uhr</dd>
                <dt className="font-medium text-gray-900">Zuletzt geändert am</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.updated_at.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' })} Uhr</dd>
              </div>
            </dl>
          </div>
        </TabPanel>
        <TabPanel value={1}>
          <h2 className='text-2xl'>Einsatzqualifikationen</h2>
          {user?.qualifications.map((qualifiaction) => (
            <p className='text-base'>{qualifiaction.name}</p>  
          ))}
        </TabPanel>
      </Tabs>

      <ApproveDialog 
        title='User wirklich löschen?' 
        open={openApproveDialog} 
        loading={isDeletingUser} 
        handleClose={() => setOpenApproveDialog(false)} 
        handleApprove={handleDeleteApprove}
      />

      {openUpdateUserDialog ? <UpdateUserDialog isOpen={openUpdateUserDialog} accountId={accountId} userId={user!.id} close={() => setOpenUpdateUserDialog(false)} /> : null}
    </StandardLayout>
  )
}

export default UserPage