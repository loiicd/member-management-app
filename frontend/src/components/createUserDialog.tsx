import { ChangeEvent, FunctionComponent, useState } from 'react'
import { AxiosError } from 'axios'
import { UserApiClient } from '../services/userApiClient'
import { UserFormData } from '../types/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Button from './core/Button'
import Input from './core/Input'
import Modal from './base/modal'

type InputErrorObject = {
  firstname: boolean
  lastname: boolean
}

type EmailStatus = 'initial' | 'loading' | 'success' | 'error'

interface CreateUserDialogProps {
  accountId: string
}

const CreateUserDialog: FunctionComponent<CreateUserDialogProps> = ({ accountId }) => {
  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)

  const [open, setOpen] = useState<boolean>(false)
  const [inputError, setInputError] = useState<InputErrorObject>({ firstname: false, lastname: false })
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('initial')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState<UserFormData>({
    firstname: undefined, 
    lastname: undefined, 
    birthdate: undefined, 
    address: undefined, 
    email: undefined, 
    phone: undefined, 
    isOnlineUser: true, 
    webaccess: false
  })

  const handleClose = () => {
    resetFormData()
    resetErrors()
    setOpen(false)
  }

  const resetFormData = () => {
    setFormData({
      firstname: undefined, 
      lastname: undefined, 
      birthdate: undefined, 
      address: undefined, 
      email: undefined, 
      phone: undefined, 
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
    <>
      <Button onClick={() => setOpen(true)}>++++ Neu</Button>
      <Modal open={open} onClose={handleClose} title='Neuen User erstellen'>
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
        <div className='grid gap-4 mb-4 sm:grid-cols-2'>
          <Input type='text' value={formData.firstname} label='Vorname' onChange={handleChange('firstname')} error={inputError.firstname} />
          <Input type='text' value={formData.lastname} label='Nachname' onChange={handleChange('lastname')} error={inputError.lastname} />
          <Input type='date' value={formData.birthdate?.toISOString().split('T')[0]} label='Geburtsdatum' onChange={handleChange('birthdate')} />
          <Input type='text' value={formData.address} label='Adresse' onChange={handleChange('address')} />
          <Input type='text' value={formData.email} label='E-Mail' onChange={handleChange('email')} />
          <Input type='text' value={formData.phone} label='Telefon' onChange={handleChange('phone')} />
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={formData.webaccess} className="sr-only peer" onChange={handleChange('webaccess')} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Online Zugang</span>
          </label>
        </div>
        <h2 className='pt-4'>Authentifizierung</h2>
        <div className='border-b mb-4 mt-2' />
        <div className='grid gap-4 mb-4 sm:grid-cols-2'>
          <div className={`${!formData.isOnlineUser ? 'blur-sm' : null}`}>
            <label className={`block mb-2 text-sm font-medium dark:text-white ${formData.isOnlineUser ? 'text-gray-900' : 'text-gray-400'}`}>Account E-Mail</label>
            <Input 
              spinningEndIcon={emailStatus === 'loading' ? true : false} 
              endIcon={emailStatus === 'loading' ? icon({ name: 'spinner', style: 'solid' }) : emailStatus === 'success' ? icon({ name: 'check', style: 'solid' }) : emailStatus === 'error' ? icon({ name: 'circle-exclamation', style: 'solid' }) : undefined}
              error={emailStatus === 'error' ? true : false}
              errorMessage={errorMessage ? errorMessage : undefined}
              onChange={handleCheckEmail} 
              disabled={formData.isOnlineUser ? false : true}
            />
          </div>
          <div className={`${!formData.isOnlineUser ? 'blur-sm' : null}`}>
            <label className={`block mb-2 text-sm font-medium dark:text-white ${formData.isOnlineUser ? 'text-gray-900' : 'text-gray-400'}`}>Passwort</label>
            <input type='password' disabled={formData.isOnlineUser ? false : true} className="bg-slate-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div className='col-span-2 text-base text-gray-600'>Diese Daten sind erforderlich, damit sich der User selbständig anmelden kann</div>
        </div>
        <div className="flex items-center space-x-4">
          <button type="button" className="text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900" onClick={handleSave}>
            Speichern
          </button>
        </div>
      </Modal>
    </>
  )
}

export default CreateUserDialog