import { ChangeEvent, FunctionComponent, useState } from 'react'
import { QualificationApiClient } from '../services/qualificationApiClient'
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

type Test = {
  name: string | undefined,
  abbreviation: string | undefined,
  color: string | undefined,
}

interface AddQualificationDialogProps {
  open: boolean
  handleClose: () => void
  addAlert: (color: string, message: string, timeout: number) => void
}

const AddQualificationDialog: FunctionComponent<AddQualificationDialogProps> = ({ open, handleClose, addAlert }) => {
  const { accountId } = useParams<{ accountId: string }>()
  const authToken = useAuthHeader()()
  // const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<Test>({ name: undefined, abbreviation: undefined, color: '#FF3B30' })
  const [nameInputError, setNameInputError] = useState<boolean>(false)

  // const handleOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  const handleChange = (field: keyof Test) => (event: ChangeEvent<HTMLInputElement>) => {
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
      const qualificationApiClient = new QualificationApiClient('http://localhost:3002', authToken, accountId)
      qualificationApiClient.postQualification(formData)
        .then(() => {
          addAlert('success', 'Qualifikation erstellt', 3000)
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
      {/* <Button onClick={handleOpen}>{'+ Neu'}</Button> */}
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
            Qualifikation erstellen
          </Typography>
          <div className='grid grid-cols-2 gap-2'>
            <div className='col-1'>
              <FormControl error={nameInputError}>
                <FormLabel>Name</FormLabel>
                <Input variant='outlined' value={formData.name} required onChange={handleChange('name')} />
                {nameInputError ? <FormHelperText>Name muss ausgefüllt sein!</FormHelperText> : null}
              </FormControl>
            </div>
            <div className='col-1'>
              <FormControl>
                <FormLabel>Abkürzung</FormLabel>
                <Input variant='outlined' value={formData.abbreviation} required onChange={handleChange('abbreviation')} />
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

export default AddQualificationDialog