import { ChangeEvent, FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import { AxiosError } from 'axios'
import { UserApiClient } from '../services/userApiClient'
import { User, UserFormData } from '../types/user'
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
import Autocomplete from '@mui/joy/Autocomplete'
import CircularProgress from '@mui/joy/CircularProgress'
import { QualificationApiClient } from '../services/qualificationApiClient'
import { Qualification } from '../types/qualification'
import Snackbar from '@mui/joy/Snackbar'

type InputErrorObject = {
  firstname: boolean
  lastname: boolean
}

interface UpdateUserDialogProps {
  isOpen: boolean
  accountId: string
  userId: string
  close: () => void
}

const UpdateUserDialog: FunctionComponent<UpdateUserDialogProps> = ({ isOpen, accountId, userId, close }) => {
  const authToken = useAuthHeader()()
  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken])
  const qualifcationApiClient = useMemo(() => new QualificationApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken])

  // const [inputError, setInputError] = useState<InputErrorObject>({ firstname: false, lastname: false })
  // const [emailStatus, setEmailStatus] = useState<EmailStatus>('initial')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  // const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [alerts, setAlerts] = useState<{id: number, color: any, message: string, timeout: number}[]>([])

  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false)

  const [isLoadingQualifications, setIsLoadingQualifications] = useState<boolean>(false)
  const [qualifications, setQualifications] = useState<Qualification[]>([])

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    userApiClient.getUser(userId)
      .then(user => setUser(user))
      .catch(error => alert(error))
  }, [userApiClient, userId])


  // const addAlert = (color: string, message: string, timeout: number) => {
  //   const id = Date.now() as number
  //   setAlerts([ ...alerts, { id, color, message, timeout }])
  //   setTimeout(() => removeAlert(id), timeout)
  // }

  // const removeAlert = (id: number) => {
  //   setAlerts(alerts.filter((alert) => alert.id !== id))
  // }

  const handleClose = () => {
    resetErrors()
    close()
  }

  const loadQualifications = () => {
    if (qualifications.length === 0) {
      setIsLoadingQualifications(true)
      qualifcationApiClient.getQualifications(accountId)
        .then((data) => setQualifications(data))
        .finally(() => setIsLoadingQualifications(false))
    }
  }

  const resetErrors = () => {
    // setInputError({ firstname: false, lastname: false })
    // setEmailStatus('initial')
    // setErrorMessage(undefined)
    return
  }

  const handleChange = (field: keyof UserFormData) => (event: ChangeEvent<HTMLInputElement>) => {
    if (!user) return
    const { value, checked, type } = event.target
    setUser({ 
      ...user, 
      [field]: type === 'checkbox' ? checked : value 
    })
  }

  console.log(user)

  const handleChangeis_online_user = (is_online_user: boolean) => {
    if (!user) return
    setUser({ ...user, is_online_user: is_online_user })
  }

  const handleSave = async () => {
    if (!user) return
    setIsCreatingUser(true)
    const errors: InputErrorObject = { firstname: false, lastname: false }
    if (!user.firstname) errors.firstname = true
    if (!user.lastname) errors.lastname = true

    // setInputError(errors)

    const hasInputErrors = Object.values(errors).some(error => error)
    if (!hasInputErrors) { 
      userApiClient.updateUser(user)
        .then(() => close())
        .catch(error => alert(error))
    }
    setIsCreatingUser(false)
  }

  // const handleCheckEmail = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (typingTimeout) clearTimeout(typingTimeout)
  //   const timeout = setTimeout(() => {
  //     setEmailStatus('loading')
  //     if (event.target.value) {
  //       userApiClient.checkEMail(event.target.value)
  //         .then((emailExists) => {
  //           if (!emailExists) {
  //             setErrorMessage(undefined)  
  //             setEmailStatus('success')
  //           } else {
  //             setErrorMessage('E-Mail exestiert bereits!')
  //             setEmailStatus('error')  
  //           }
  //         })
  //         .catch((error: AxiosError) => {
  //           setErrorMessage(error.response?.statusText)
  //           setEmailStatus('error')
  //         })
  //     } else {
  //       setErrorMessage(undefined)
  //       setEmailStatus('initial')
  //     }
  //   }, 500)
  //   setTypingTimeout(timeout)
  // }


  return user ? (
    <>
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
            User bearbeiten
          </Typography>

          <div className='py-6 grid grid-cols-2 gap-4'>
            <div className={`col-span-1 border rounded-md p-4 cursor-pointer hover:bg-slate-50 ${user.is_online_user ? 'border-blue-500' : null}`} onClick={() => handleChangeis_online_user(true)}>
              <div className='text-center'>
                <FontAwesomeIcon icon={icon({ name: 'wifi', style: 'solid' })} className='rounded-full h-4 w-4 bg-lime-200 p-4' />
              </div>
              <div className='text-center'>
                Online User
              </div>
            </div>
            <div className={`col-span-1 border rounded-md p-4 cursor-pointer hover:bg-slate-50 ${!user.is_online_user ? 'border-blue-500' : null}`} onClick={() => handleChangeis_online_user(false)}>
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
                <Input 
                  id='firstnameInput' 
                  type='text'
                  value={user.firstname}
                  onChange={handleChange('firstname')}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nachname</FormLabel>
                <Input id='lastnameInput' type='text' value={user.lastname} onChange={handleChange('lastname')} />
              </FormControl>
              <FormControl>
                <FormLabel>Geburtsdatum</FormLabel>
                <Input id='birthdateInput' type='date' value={user.birthdate?.toISOString().split('T')[0]} onChange={handleChange('birthdate')} />
              </FormControl>
              <FormControl>
                <FormLabel>Addresse</FormLabel>
                <Input id='addressInput' type='text' value={user.address} onChange={handleChange('address')} />
              </FormControl>
              <FormControl>
                <FormLabel>E-Mail</FormLabel>
                <Input id='emailInput' type='text' value={user.email} onChange={handleChange('email')} />
              </FormControl>
              <FormControl>
                <FormLabel>Telefon</FormLabel>
                <Input id='phoneInput' type='text' value={user.phone} onChange={handleChange('phone')} />
              </FormControl>
              <FormControl
                orientation="horizontal"
                sx={{ justifyContent: 'space-between' }}
              >
                <FormLabel>Online Zugang</FormLabel>
                <Switch checked={user.webaccess} onChange={handleChange('webaccess')} />
              </FormControl>

            </div>

            <FormControl className='mb-4'>
              <FormLabel>Qualifikationen</FormLabel>
              <Autocomplete
                multiple
                value={user.qualifications}
                onOpen={loadQualifications}
                loading={isLoadingQualifications}
                options={qualifications}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newQualifications) => {
                  setUser({ 
                    ...user, 
                    qualifications: newQualifications
                  })
                }}
                endDecorator={
                  isLoadingQualifications ? (
                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                  ) : null
                }
              />
            </FormControl>

            <Typography>Authentifizierung</Typography>
            <Divider />

            <div className='grid gap-4 mb-4 sm:grid-cols-2 mt-4'>
              <FormControl disabled={!user.is_online_user}>
                <FormLabel>Account E-Mail</FormLabel>
                <Input id='accountEmailInput' type='text' />
              </FormControl>
              <FormControl disabled={!user.is_online_user}>
                <FormLabel>Passwort</FormLabel>
                <Input id='passwortInput' type='text' />
              </FormControl>
            </div>
          </form>

          <div className='flex justify-end gap-4'>
            <Button variant='outlined' disabled={isCreatingUser} onClick={handleClose}>Abbrechen</Button>
            <Button variant='solid' loading={isCreatingUser} onClick={handleSave}>Speichern</Button>
          </div>
        </Sheet>
      </Modal>
      {alerts.map((alert) => (
        <Snackbar 
          open 
          variant='soft' 
          color={alert.color}
          autoHideDuration={alert.timeout}
        >
          {alert.message}
        </Snackbar>
      ))}
    </>
  ) : null
}

export default UpdateUserDialog