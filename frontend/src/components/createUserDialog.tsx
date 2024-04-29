import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react'
import { AxiosError } from 'axios'
import { UserApiClient } from '../services/userApiClient'
import { UserFormData } from '../types/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthHeader } from 'react-auth-kit'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Sheet from '@mui/joy/Sheet'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Divider from '@mui/joy/Divider'
import Input from '@mui/joy/Input'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Switch from '@mui/joy/Switch'
import Button from '@mui/joy/Button'

type InputErrorObject = {
  firstname: boolean
  lastname: boolean
}

type EmailStatus = 'initial' | 'loading' | 'success' | 'error'

type TestusUser = {
  firstname: string | null,
  lastname: string | null,
  birthdate: Date | null,
  address: string | null,
  email: string | null,
  phone: string | null,
  isOnlineUser: boolean,
  webaccess: boolean 
}

interface CreateUserDialogProps {
  isOpen: boolean
  close: () => void
  accountId: string
}

const CreateUserDialog: FunctionComponent<CreateUserDialogProps> = ({ isOpen, close, accountId }) => {
  const authToken = useAuthHeader()()
  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken])

  const [inputError, setInputError] = useState<InputErrorObject>({ firstname: false, lastname: false })
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('initial')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const [formData, setFormData] = useState<TestusUser>({
    firstname: null, 
    lastname: null, 
    birthdate: null, 
    address: null, 
    email: null, 
    phone: null, 
    isOnlineUser: true, 
    webaccess: false
  })

  const handleClose = () => {
    resetFormData()
    resetErrors()
    close()
  }

  const resetFormData = () => {
    setFormData({
      firstname: null, 
      lastname: null, 
      birthdate: null, 
      address: null, 
      email: null, 
      phone: null, 
      isOnlineUser: true, 
      webaccess: false
    })
  }

  const resetErrors = () => {
    setInputError({ firstname: false, lastname: false })
    setEmailStatus('initial')
    setErrorMessage(undefined)
  }

  const handleChange = (field: keyof UserFormData) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked, type } = event.target
    setFormData({ 
      ...formData, 
      [field]: type === 'checkbox' ? checked : value 
    })
  }

  const handleChangeIsOnlineUser = (isOnlineUser: boolean) => setFormData({ ...formData, isOnlineUser: isOnlineUser })

  const handleSave = async () => {
    const errors: InputErrorObject = { firstname: false, lastname: false }
    if (!formData.firstname) errors.firstname = true
    if (!formData.lastname) errors.lastname = true

    setInputError(errors)

    const hasInputErrors = Object.values(errors).some(error => error)
    if (!hasInputErrors) {
      try {
        const response = await userApiClient.createUser(formData)
        switch (response.type) {
          case 'userCreated':
            alert('User wurde erstellt!')
            break
          case 'mailExists':
            alert(`User ist bereits registriert! Wollen sie den User mit dem Account verknüpfen? - ${response.userId}`)
            break
          case 'relExists':
            alert(`User ist bereits mit dem Account verknüpft! - ${response.userId}`)
            break
        }
      } catch (error) {
        alert(error)
      }
    }
  }

  const handleCheckEmail = (event: ChangeEvent<HTMLInputElement>) => {
    if (typingTimeout) clearTimeout(typingTimeout)
    const timeout = setTimeout(() => {
      setEmailStatus('loading')
      if (event.target.value) {
        userApiClient.checkEMail(event.target.value)
          .then((emailExists) => {
            if (!emailExists) {
              setErrorMessage(undefined)  
              setEmailStatus('success')
            } else {
              setErrorMessage('E-Mail exestiert bereits!')
              setEmailStatus('error')  
            }
          })
          .catch((error: AxiosError) => {
            setErrorMessage(error.response?.statusText)
            setEmailStatus('error')
          })
      } else {
        setErrorMessage(undefined)
        setEmailStatus('initial')
      }
    }, 500)
    setTypingTimeout(timeout)
  }


  return (
    <Modal 
      open={isOpen}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet sx={{ width: 600, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          User erstellen
        </Typography>


        <div className='py-6 grid grid-cols-2 gap-4'>
          <div className={`col-span-1 border rounded-md p-4 cursor-pointer hover:bg-slate-50 ${formData.isOnlineUser ? 'border-blue-500' : null}`} onClick={() => handleChangeIsOnlineUser(true)}>
            <div className='text-center'>
              <FontAwesomeIcon icon={icon({ name: 'wifi', style: 'solid' })} className='rounded-full h-4 w-4 bg-lime-200 p-4' />
            </div>
            <div className='text-center'>
              Online User
            </div>
          </div>
          <div className={`col-span-1 border rounded-md p-4 cursor-pointer hover:bg-slate-50 ${!formData.isOnlineUser ? 'border-blue-500' : null}`} onClick={() => handleChangeIsOnlineUser(false)}>
            <div className='text-center'>
            <FontAwesomeIcon icon={icon({ name: 'user-lock', style: 'solid' })} className='rounded-full h-4 w-4 bg-blue-200 p-4' />
            </div>
            <div className='text-center'>
              Offline User
            </div>
          </div>
        </div>

        <Typography>Allgemein</Typography>
        <Divider />

        <form>
          <div className='grid gap-4 mb-4 sm:grid-cols-2 mt-4'>
            <FormControl>
              <FormLabel>Vorname</FormLabel>
              <Input id='firstnameInput' type='text' onChange={handleChange('firstname')} />
            </FormControl>
            <FormControl>
              <FormLabel>Nachname</FormLabel>
              <Input id='lastnameInput' type='text' onChange={handleChange('lastname')} />
            </FormControl>
            <FormControl>
              <FormLabel>Geburtsdatum</FormLabel>
              <Input id='birthdateInput' type='date' onChange={handleChange('birthdate')} />
            </FormControl>
            <FormControl>
              <FormLabel>Addresse</FormLabel>
              <Input id='addressInput' type='text' onChange={handleChange('address')} />
            </FormControl>
            <FormControl>
              <FormLabel>E-Mail</FormLabel>
              <Input id='emailInput' type='text' onChange={handleChange('email')} />
            </FormControl>
            <FormControl>
              <FormLabel>Telefon</FormLabel>
              <Input id='phoneInput' type='text' onChange={handleChange('phone')} />
            </FormControl>
            <FormControl
              orientation="horizontal"
              sx={{ justifyContent: 'space-between' }}
            >
              <FormLabel>Online Zugang</FormLabel>
              <Switch checked={formData.webaccess} onChange={handleChange('webaccess')} />
            </FormControl>
          </div>

          <Typography>Authentifizierung</Typography>
          <Divider />

          <div className='grid gap-4 mb-4 sm:grid-cols-2 mt-4'>
            <FormControl disabled={!formData.isOnlineUser}>
              <FormLabel>Account E-Mail</FormLabel>
              <Input id='accountEmailInput' type='text' />
            </FormControl>
            <FormControl disabled={!formData.isOnlineUser}>
              <FormLabel>Passwort</FormLabel>
              <Input id='passwortInput' type='text' />
            </FormControl>
          </div>
        </form>

        <div className='flex justify-end gap-4'>
          <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
          <Button variant='solid' onClick={handleSave}>Speichern</Button>
        </div>
      </Sheet>
    </Modal>
  )
}

export default CreateUserDialog