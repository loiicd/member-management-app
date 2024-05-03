import { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react'
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
import { User } from '../types/user'
import { UserApiClient } from '../services/userApiClient'
import { Accordion, Option, AccordionDetails, AccordionGroup, AccordionSummary, Select, Autocomplete, Textarea } from '@mui/joy'

interface CreateGroupDialogProps {
  open: boolean
  handleClose: () => void
  addAlert: (color: string, message: string, timeout: number) => void
}

const CreateGroupDialog: FunctionComponent<CreateGroupDialogProps> = ({ open, handleClose, addAlert }) => {
  const { accountId } = useParams<{ accountId: string }>()
  const authToken = useAuthHeader()()
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<GroupFormData>({ name: undefined, color: '#FF3B30', users: [] })
  const [nameInputError, setNameInputError] = useState<boolean>(false)

  if (!accountId) throw new Error('Account ID required!')

  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken]) 

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string | null>(null)

  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const [groupType, setGroupType] = useState<'standard' | 'intelligent'>('standard')

  useEffect(() => {
    userApiClient.getUsers(searchTerm, null, null, null, null)
      .then(response => setUsers(response.data))
      .catch(error => alert(error))
  }, [userApiClient, searchTerm])

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
        <Sheet sx={{ maxWidth: 600, width: 520, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
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
          <div className='flex flex-col gap-4 mb-8'>
            <div className='grid grid-cols-2 gap-2'>
              <FormControl error={nameInputError}>
                <FormLabel>Name</FormLabel>
                <Input value={formData.name} required onChange={handleChange('name')} />
                {nameInputError ? <FormHelperText>Name muss ausgefüllt sein!</FormHelperText> : null}
              </FormControl>
              <FormControl>
                <FormLabel>Typ</FormLabel>
                <Select value={groupType} onChange={(event, value) => setGroupType(value ? value : 'standard')}>
                  <Option value='standard'>Standard</Option>
                  <Option value='intelligent'>Intelligent</Option>
                </Select>
              </FormControl>
            </div>
            <FormControl>
              <FormLabel>Beschreibung</FormLabel>
              <Textarea minRows={3} />
            </FormControl>
            <ColorPicker color={formData.color} handleColorChange={handleColorChange} />
            <AccordionGroup>
              <Accordion disabled={groupType === 'intelligent'}>
                <AccordionSummary>Mitglieder</AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    disableClearable
                    options={users}
                    getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                    onChange={(event, value) => setFormData({ ...formData, users: value.map((item) => item.id) })}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion disabled={groupType === 'standard'}>
                <AccordionSummary>Filter</AccordionSummary>
                <AccordionDetails>
                  <div className='flex justify-between gap-2'>
                    <Select defaultValue={0} className='flex-grow'>
                      <Option value={0}>Qualifikation</Option>
                      <Option value={1}>Rolle</Option>
                    </Select>
                    <Select defaultValue={0} className='flex-grow'>
                      <Option value={0}>ist</Option>
                      <Option value={1}>ist nicht</Option>
                      <Option value={2}>enthält</Option>
                    </Select>
                    <Select defaultValue={0} className='flex-grow'>
                      <Option value={0}>Gruppenführer</Option>
                      <Option value={1}>Maschinist</Option>
                      <Option value={2}>Truppmann</Option>
                    </Select>
                  </div>
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
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