import { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useAuthHeader } from 'react-auth-kit'
import { useParams } from 'react-router-dom'
import { GroupFormData } from '../types/group'
import { GroupApiClient } from '../services/groupApiClient'
import { User } from '../types/user'
import { UserApiClient } from '../services/userApiClient'
import { GroupFilterFormData } from '../types/groupFilter'
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
import GroupFilterSelect from './createGroupDialog/groupFilterSelect'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Textarea from '@mui/joy/Textarea'
import AccordionGroup from '@mui/joy/AccordionGroup'
import Accordion from '@mui/joy/Accordion'
import AccordionSummary from '@mui/joy/AccordionSummary'
import AccordionDetails from '@mui/joy/AccordionDetails'
import Autocomplete from '@mui/joy/Autocomplete'
import Chip from '@mui/joy/Chip'

interface CreateGroupDialogProps {
  open: boolean
  handleClose: () => void
  addAlert: (color: string, message: string, timeout: number) => void
}

const CreateGroupDialog: FunctionComponent<CreateGroupDialogProps> = ({ open, handleClose, addAlert }) => {
  const { accountId } = useParams<{ accountId: string }>()
  const authToken = useAuthHeader()()

  if (!accountId) throw new Error('Account ID required!')

  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken]) 
  const groupApiClient = useMemo(() => new GroupApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken])

  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<GroupFormData>({ name: undefined, color: '#FF3B30', users: [], type: 'standard' })
  const [nameInputError, setNameInputError] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [rules, setRules] = useState<GroupFilterFormData[]>([]) 
  const [accordionIndex, setAccordionIndex] = useState<number | null>(0)

  useEffect(() => {
    userApiClient.getUsers(null, null, null, null, null)
      .then(response => setUsers(response.data))
      .catch(error => alert(error))
  }, [userApiClient, accountId])

  useEffect(() => {
    setAccordionIndex(null)
  }, [formData.type])

  const handleChange = (field: keyof GroupFormData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (formData.type === 'intelligent') {
        formData.rules = rules
      }
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
                <Select value={formData.type} onChange={(event, value) => setFormData({ ...formData, type: value ? value : 'standard', rules: [], users: [] })}>
                  <Option value='standard'>Standard</Option>
                  <Option value='intelligent'>Intelligent</Option>
                </Select>
              </FormControl>
            </div>
            <FormControl>
              <FormLabel>Beschreibung</FormLabel>
              <Textarea 
                minRows={3} 
                value={formData.description} 
                onChange={handleChange('description')} 
              />
            </FormControl>
            <ColorPicker color={formData.color} handleColorChange={handleColorChange} />
            <AccordionGroup>
              <Accordion 
                disabled={formData.type === 'intelligent'} 
                expanded={accordionIndex === 0}
                onChange={(event, expanded) => {
                  setAccordionIndex(expanded ? 0 : null);
                }}
              >
                <AccordionSummary>
                  <div className='flex justify-between w-full'>
                    <span>Mitglieder</span>
                    <Chip 
                      disabled={formData.type === 'intelligent'}
                    >
                      {formData.type === 'intelligent' ? '-' : formData.users.length}
                    </Chip>
                  </div>
                </AccordionSummary>
                {formData.type === 'standard' ? 
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
                  : null
                }
              </Accordion>
              <Accordion 
                disabled={formData.type === 'standard'} 
                expanded={accordionIndex === 1}
                onChange={(event, expanded) => {
                  setAccordionIndex(expanded ? 1 : null);
                }}
              >
                <AccordionSummary>
                  <div className='flex justify-between w-full'>
                    <span>Filter</span>
                    <Chip disabled={formData.type === 'standard'}>{formData.type === 'standard' ? '-' : rules.length}</Chip>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <GroupFilterSelect<GroupFilterFormData> rules={rules} handleRulesChange={setRules} />
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