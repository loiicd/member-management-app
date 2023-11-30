import { ChangeEvent, FC, useEffect, useState } from 'react'
import Button from './base/button'
import Modal from './base/modal'
import Input from './base/input'
import { postUser } from '../services/postUser'
import { updateUser } from '../services/updateUser'
import { getUser } from '../services/getUser'

type Test = {
  firstname: string | null,
  lastname: string | null,
  birthdate: Date | null,
  address: string | null
}

interface UserDialogProps {
  type: 'insert' | 'update'
  userId?: string
}

const UserDialog: FC<UserDialogProps> = ({ type, userId }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [formData, setFormData] = useState<Test>({firstname: null, lastname: null, birthdate: null, address: null})

  const [firstnameInputError, setFirstnameInputError] = useState<boolean>(false)
  const [lastnameInputError, setLastnameInputError] = useState<boolean>(false)

  useEffect(() => {
    if (type === 'update' && userId) {
      // @ts-ignore
      getUser(userId)
        .then((data) => {
          console.log(data)
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
    if (formData.firstname != null && formData.lastname !== null) {
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
      if (formData.firstname == null) { setFirstnameInputError(true) }
      if (formData.lastname == null) { setLastnameInputError(true) } 
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>{type === 'insert' ? 'Neu' : 'Bearbeiten'}</Button>
      <Modal open={open} onClose={handleClose} title={type === 'insert' ? 'Insert User' : 'Update User'}>
        {/* <h2 className="text-xl font-semibold">{type === 'insert' ? 'Insert User' : 'Update User'}</h2> */}
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-1'>
            <Input type='text' label='Vorname' value={formData.firstname === null ? undefined : formData.firstname} error={firstnameInputError} required={false} onChange={handleChange('firstname')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Nachname' value={formData.lastname === null ? undefined : formData.lastname} error={lastnameInputError} required={false} onChange={handleChange('lastname')} />
          </div>
          <div className='col-1'>
            <Input type='date' label='Geburtstag' value={formData.birthdate === null ? undefined : formData.birthdate} error={firstnameInputError} required={false} onChange={handleChange('birthdate')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Adresse' value={formData.address === null ? undefined : formData.address} error={lastnameInputError} required={false} onChange={handleChange('address')} />
          </div>
        </div>
        <Button onClick={handleSave}>Speichern</Button>
      </Modal>
    </>
  )
}

export default UserDialog