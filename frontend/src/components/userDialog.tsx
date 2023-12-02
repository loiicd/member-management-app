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
}

interface UserDialogProps {
  type: 'insert' | 'update'
  userId?: string
}

const UserDialog: FC<UserDialogProps> = ({ type, userId }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [formData, setFormData] = useState<Test>({firstname: undefined, lastname: undefined, birthdate: undefined, address: undefined, email: undefined, phone: undefined})

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
        </div>
        <Button onClick={handleSave}>Speichern</Button>
      </Modal>
    </>
  )
}

export default UserDialog