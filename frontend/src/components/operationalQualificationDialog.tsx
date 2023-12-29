import { ChangeEvent, FC, useEffect, useState } from 'react'
import Button from './base/button'
import Modal from './base/modal'
import Input from './base/input'
import { postOperationalQualification } from '../services/operationalQualification'

type Test = {
  name: string | undefined,
  abbreviation: string | undefined,
}

interface OperationalQualificationDialogProps {
  type: 'insert' | 'update'
  operationalQualificationId?: string
}

const OperationalQualificationDialog: FC<OperationalQualificationDialogProps> = ({ type, operationalQualificationId }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [formData, setFormData] = useState<Test>({name: undefined, abbreviation: undefined})

  useEffect(() => {
    if (type === 'update' && operationalQualificationId) {
      // @ts-ignore
      // getUser(operationalQualificationId)
      //   .then((data) => {
      //     setFormData(data)
      //   })
      //   .catch((error) => alert(error))
    }
  }, [type, operationalQualificationId])

  const handleOpen = () =>  setOpen(true)
  const handleClose = () =>  setOpen(false)

  const handleChange = (field: keyof Test) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleSave = () => {
    if (formData.name) {
      if (type === 'insert') {
        // @ts-ignore
        console.log('Form Data', formData)
        postOperationalQualification(formData)
          .then(handleClose)
          .catch((error) => alert(error))
      } else {
        // if (operationalQualificationId) {
        //   // @ts-ignore
        //   updateUser({id: userId, ...formData})
        //     .then(handleClose)
        //     .catch((error) => alert(error))
        // }
      }
    }
  }

  return (
    <>
      <Button onClick={handleOpen} variant='contained' color={type === 'insert' ? 'green' : 'gray'}>{type === 'insert' ? '+ Neu' : 'Bearbeiten'}</Button>
      <Modal open={open} onClose={handleClose} title={type === 'insert' ? 'Insert Qualification' : 'Update Qualification'}>
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-1'>
            <Input type='text' label='Name' value={formData.name} required={true} onChange={handleChange('name')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Abkürzung' value={formData.abbreviation} required={false} onChange={handleChange('abbreviation')} />
          </div>
        </div>
        <Button onClick={handleSave}>Speichern</Button>
      </Modal>
    </>
  )
}

export default OperationalQualificationDialog