import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import Modal from './base/modal'
import Input from './base/input'
import { postqualification } from '../services/qualification'
import Button from './core/Button'

type Test = {
  name: string | undefined,
  abbreviation: string | undefined,
}

interface qualificationDialogProps {
  type: 'insert' | 'update'
  qualificationId?: string
  accountId: string
}

const QualificationDialog: FunctionComponent<qualificationDialogProps> = ({ type, qualificationId, accountId }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [formData, setFormData] = useState<Test>({name: undefined, abbreviation: undefined})

  useEffect(() => {
    if (type === 'update' && qualificationId) {
      // @ts-ignore
      // getUser(qualificationId)
      //   .then((data) => {
      //     setFormData(data)
      //   })
      //   .catch((error) => alert(error))
    }
  }, [type, qualificationId])

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
        postqualification(accountId, formData)
          .then(handleClose)
          .catch((error) => alert(error))
      } else {
        // if (qualificationId) {
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
      <Button onClick={handleOpen}>{type === 'insert' ? '+ Neu' : 'Bearbeiten'}</Button>
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

export default QualificationDialog