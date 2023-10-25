import { ChangeEvent, useState } from 'react'
import Button from './base/button'
import Modal from './base/modal'
import Input from './base/input'
import { postUser } from '../services/postUser'

type Test = {
  firstname: string | null,
  lastname: string | null
}

const UserDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  const [formData, setFormData] = useState<Test>({firstname: null, lastname: null})

  const [firstnameInputError, setFirstnameInputError] = useState<boolean>(false)
  const [lastnameInputError, setLastnameInputError] = useState<boolean>(false)

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
      // @ts-ignore
      postUser(formData)
        .then(handleClose)
        .catch((error) => alert(error))
    } else {
      if (formData.firstname == null) { setFirstnameInputError(true) }
      if (formData.lastname == null) { setLastnameInputError(true) } 
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>Neu</Button>
      <Modal open={open} onClose={handleClose}>
        <h2 className="text-xl font-semibold">Neuer User</h2>
        <div className='grid grid-cols-2'>
          <div className='col-1'>
            <Input placeholder='Vorname' error={firstnameInputError} required={false} onChange={handleChange('firstname')} />
          </div>
          <div className='col-1'>
            <Input placeholder='Nachname' error={lastnameInputError} required={false} onChange={handleChange('lastname')} />
          </div>
        </div>
        <button onClick={handleSave}>Speichern</button>
      </Modal>
    </>
  )
}

export default UserDialog