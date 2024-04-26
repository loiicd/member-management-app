import { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Qualification } from '../types/qualification'
import { QualificationApiClient } from '../services/qualificationApiClient'
import { useParams } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import Modal from './core/Modal'
import Input from './core/Input'
import Button from './core/Button'
import ColorPicker from './ColorPicker'

interface ComponentProps {
  open: boolean
  qualifcationId: string
  addAlert: (color: string, message: string, timeout: number) => void
  handleClose: () => void
}

const UpdateQualificationDialog: FunctionComponent<ComponentProps> = ({ open, qualifcationId, addAlert, handleClose }) => {
  const { accountId } = useParams<{ accountId: string }>()
  const authToken = useAuthHeader()()
  const qualificationApiClient = useMemo(() => new QualificationApiClient('http://localhost:3002', authToken, accountId), [authToken, accountId])
  const [qualification, setQualification] = useState<Qualification | undefined>(undefined)

  if (!accountId) throw new Error('AccountID required!')

  useEffect(() => {
    qualificationApiClient.getQualification(qualifcationId)
      .then((qualification) => setQualification(qualification))
      .catch((error) => {
        handleClose()
        addAlert('danger', error.response.data.message, 3000)
      })
  }, [qualificationApiClient, qualifcationId, addAlert, handleClose])

  // if (!qualification) return null

  const handleChange = (field: keyof Qualification) => (event: ChangeEvent<HTMLInputElement>) => {
    setQualification({
      ...qualification!,
      [field]: event.target.value,
    })
  }

  const handleColorChange = (color: string) => {
    setQualification({
      ...qualification!,
      color: color
    })
  }

  const handleUpdate = () => {
    qualificationApiClient.putQualification(qualification!)
      .then(handleClose)
      .catch((error) => alert(error))
  }

  return qualification ? (
    <Modal open={open} onClose={handleClose} title='Update Qualification' size='xl' >
      <div className='grid grid-cols-2 gap-2'>
        <div className='col-1'>
          <Input type='text' label='Name' value={qualification?.name} required={true} onChange={handleChange('name')} />
        </div>
        <div className='col-1'>
          <Input type='text' label='Abkürzung' value={qualification?.abbreviation} required={false} onChange={handleChange('abbreviation')} />
        </div>
      </div>
      <div className='my-4'>
        <ColorPicker color={qualification?.color} handleColorChange={handleColorChange} />
      </div>
      <Button onClick={handleUpdate}>Speichern</Button>
    </Modal>
  ) : null
}

export default UpdateQualificationDialog