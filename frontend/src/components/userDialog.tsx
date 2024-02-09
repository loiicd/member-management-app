import { ChangeEvent, FC, useEffect, useState } from 'react'
import Button from './base/button'
import Modal from './base/modal'
import { getUser, postUser, updateUser } from '../services/user'

type Test = {
  firstname?: string,
  lastname?: string,
  birthdate?: Date,
  address?: string,
  email?: string,
  phone?: string,
  webaccess: boolean
}

interface UserDialogProps {
  type: 'insert' | 'update'
  userId?: string
  accountId: string
}

const UserDialog: FC<UserDialogProps> = ({ type, userId, accountId }) => {
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
        postUser(accountId, formData)
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
        <div className='grid gap-4 mb-4 sm:grid-cols-2'>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vorname</label>
            <input type="text" value={formData.firstname} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange('firstname')} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nachname</label>
            <input type="text" value={formData.lastname} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange('lastname')} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geburtsdatum</label>
            <input type="date" value={formData.birthdate?.toString()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange('birthdate')} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
            <input type="text" value={formData.address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange('address')} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-Mail</label>
            <input type="text" value={formData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange('email')} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon</label>
            <input type="text" value={formData.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange('phone')} />
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={formData.webaccess} className="sr-only peer" onChange={handleWebaccessChange('webaccess')} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Online Zugang</span>
          </label>
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

export default UserDialog