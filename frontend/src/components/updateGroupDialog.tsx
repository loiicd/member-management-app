import { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react'
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
import { GroupApiClient } from '../services/groupApiClient'
import { Group } from '../types/group'

interface ComponentProps {
  open: boolean
  groupId: string
  addAlert: (color: string, message: string, timeout: number) => void
  handleClose: () => void
}

const UpdateGroupDialog: FunctionComponent<ComponentProps> = ({ open, groupId, addAlert, handleClose }) => {
  const { accountId } = useParams<{ accountId: string }>()
  const authToken = useAuthHeader()()
  const groupApiClient = useMemo(() => new GroupApiClient('http://localhost:3002', authToken, accountId), [authToken, accountId])
  const [group, setGroup] = useState<Group | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  if (!accountId) throw new Error('AccountID required!')

  useEffect(() => {
    groupApiClient.getGroup(groupId)
      .then((group) => setGroup(group))
      .catch((error) => {
        handleClose()
        addAlert('danger', error.response.data.message, 3000)
      })
  }, [groupApiClient, groupId, addAlert, handleClose])

  const handleChange = (field: keyof Group) => (event: ChangeEvent<HTMLInputElement>) => {
    setGroup({
      ...group!,
      [field]: event.target.value,
    })
  }

  const handleColorChange = (color: string) => {
    setGroup({
      ...group!,
      color: color
    })
  }

  const handleUpdate = () => {
    setLoading(true)
    groupApiClient.putGroup(group!)
      .then(handleClose)
      .catch((error) => alert(error))
      .finally(() => setLoading(false))
  }

  return group ? (
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
          Gruppe bearbeiten
        </Typography>
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-1'>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input variant='outlined' value={group?.name} required onChange={handleChange('name')} />
            </FormControl>
          </div>
        </div>
        <div className='my-4'>
          <ColorPicker color={group?.color} handleColorChange={handleColorChange} />
        </div>
        <div className='flex justify-end gap-4'>
          <Button variant='outlined' onClick={handleClose}>Abbrechen</Button>
          <Button variant='solid' loading={loading} onClick={handleUpdate}>Speichern</Button>
        </div>
      </Sheet>
    </Modal>
  ) : null
}

export default UpdateGroupDialog