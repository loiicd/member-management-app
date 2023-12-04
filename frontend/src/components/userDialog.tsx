import { ChangeEvent, FC, useEffect, useState } from 'react'
import Button from './base/button'
import Modal from './base/modal'
import Input from './base/input'
import { getUser, postUser, updateUser } from '../services/user'

type Test = {
  firstname: string | undefined,
  lastname: string | undefined,
  birthdate: Date | undefined,
  address: string | undefined,
  email: string | undefined,
  phone: string | undefined,
  webaccess: boolean
}

interface UserDialogProps {
  type: 'insert' | 'update'
  userId?: string
}

const UserDialog: FC<UserDialogProps> = ({ type, userId }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [formData, setFormData] = useState<Test>({firstname: undefined, lastname: undefined, birthdate: undefined, address: undefined, email: undefined, phone: undefined, webaccess: false})

  const [firstnameInputError, setFirstnameInputError] = useState<boolean>(false)
  const [lastnameInputError, setLastnameInputError] = useState<boolean>(false)

  useEffect(() => {
    if (type === 'update' && userId) {
      // @ts-ignore
      getUser(userId)
        .then((data) => {
          setFormData(data)
        })
        .catch((error) => alert(error))
    }
  }, [type, userId])

  const handleOpen = () =>  setOpen(true)
  const handleClose = () =>  setOpen(false)

  const handleChange = (field: keyof Test) => (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleWebaccessChange = (field: keyof Test) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.checked,
    })
  }

  const handleSave = () => {
    if (formData.firstname && formData.lastname) {
      if (type === 'insert') {
        // @ts-ignore
        postUser(formData)
          .then(handleClose)
          .catch((error) => alert(error))
      } else {
        if (userId) {
          // @ts-ignore
          updateUser({id: userId, ...formData})
            .then(handleClose)
            .catch((error) => alert(error))
        }
      }
    } else {
      if (!formData.firstname) { setFirstnameInputError(true) }
      if (!formData.lastname) { setLastnameInputError(true) } 
    }
  }

  return (
    <>
      <Button onClick={handleOpen} variant='contained' color={type === 'insert' ? 'green' : 'gray'}>{type === 'insert' ? '+ Neu' : 'Bearbeiten'}</Button>
      <Modal open={open} onClose={handleClose} title={type === 'insert' ? 'Insert User' : 'Update User'}>
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-1'>
            <Input type='text' label='Vorname' value={formData.firstname} error={firstnameInputError} required={false} onChange={handleChange('firstname')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Nachname' value={formData.lastname} error={lastnameInputError} required={false} onChange={handleChange('lastname')} />
          </div>
          <div className='col-1'>
            <Input type='date' label='Geburtstag' value={formData.birthdate} error={firstnameInputError} required={false} onChange={handleChange('birthdate')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Adresse' value={formData.address} error={lastnameInputError} required={false} onChange={handleChange('address')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Email' value={formData.email} error={lastnameInputError} required={false} onChange={handleChange('email')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Telefon' value={formData.phone} error={lastnameInputError} required={false} onChange={handleChange('phone')} />
          </div>
          <div className='col-1'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={formData.webaccess} className="sr-only peer" onChange={handleWebaccessChange('webaccess')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Online Zugang</span>
            </label>
          </div>
        </div>
        <Button onClick={handleSave}>Speichern</Button>
      </Modal>
    </>
  )
}

export default UserDialog