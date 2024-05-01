import { ChangeEvent, FunctionComponent, useState } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { useParams } from 'react-router-dom'
import ColorPicker from './ColorPicker'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'
import { GroupFormData } from '../types/group'
import { GroupApiClient } from '../services/groupApiClient'

interface CreateGroupDialogProps {
  open: boolean
  handleClose: () => void
  addAlert: (color: string, message: string, timeout: number) => void
}

const CreateGroupDialog: FunctionComponent<CreateGroupDialogProps> = ({ open, handleClose, addAlert }) => {
  const { accountId } = useParams<{ accountId: string }>()
  const authToken = useAuthHeader()()
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<GroupFormData>({ name: undefined, color: '#FF3B30' })
  const [nameInputError, setNameInputError] = useState<boolean>(false)

  const handleChange = (field: keyof GroupFormData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleColorChange = (color: string) => {
    setFormData({
      ...formData,
      color: color
    })
  }

  const handleSave = () => {
    if (formData.name) {
      setLoading(true)
      const groupApiClient = new GroupApiClient('http://localhost:3002', authToken, accountId)
      groupApiClient.postGroup(formData)
        .then(() => {
          addAlert('success', 'Gruppe erstellt', 3000)
          handleClose()
        })
        .catch((error) => alert(error))
        .finally(() => setLoading(false))
    } else {
      setNameInputError(true)
    }
  }

  return (
    <>
      <Modal 
        open={open}
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
            Gruppe erstellen
          </Typography>
          <div className='grid grid-cols-2 gap-2'>
            <div className='col-1'>
              <FormControl error={nameInputError}>
                <FormLabel>Name</FormLabel>
                <Input variant='outlined' value={formData.name} required onChange={handleChange('name')} />
                {nameInputError ? <FormHelperText>Name muss ausgefüllt sein!</FormHelperText> : null}
              </FormControl>
            </div>
          </div>
          <div className='my-4'>
            <ColorPicker color={formData.color} handleColorChange={handleColorChange} />
          </div>
          <div className='flex justify-end gap-4'>
            <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
            <Button variant='solid' loading={loading} onClick={handleSave}>Speichern</Button>
          </div>
        </Sheet>
      </Modal>
    </>
  )
}

export default CreateGroupDialog