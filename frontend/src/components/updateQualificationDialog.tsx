import { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Qualification } from '../types/qualification'
import { QualificationApiClient } from '../services/qualificationApiClient'
import { useParams } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import ColorPicker from './ColorPicker'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import ModalClose from '@mui/joy/ModalClose'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Button from '@mui/joy/Button'

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
    <Modal 
      open 
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet sx={{ maxWidth: 600, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Qualifikation Bearbeiten
        </Typography>
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-1'>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input variant='outlined' value={qualification?.name} required onChange={handleChange('name')} />
            </FormControl>
          </div>
          <div className='col-1'>
            <FormControl>
              <FormLabel>Abkürzung</FormLabel>
              <Input variant='outlined' value={qualification?.abbreviation} required onChange={handleChange('name')}  />
            </FormControl>
          </div>
        </div>
        <div className='my-4'>
          <ColorPicker color={qualification?.color} handleColorChange={handleColorChange} />
        </div>
        <div className='flex justify-end gap-4'>
        <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
          <Button variant='solid' onClick={handleUpdate}>Speichern</Button>
        </div>
      </Sheet>
    </Modal>
  ) : null
}

export default UpdateQualificationDialog