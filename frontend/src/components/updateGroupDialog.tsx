import { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import { GroupApiClient } from '../services/groupApiClient'
import { UserApiClient } from '../services/userApiClient'
import { Group } from '../types/group'
import { User } from '../types/user'
import { GroupFilter } from '../types/groupFilter'
import ColorPicker from './ColorPicker'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import ModalClose from '@mui/joy/ModalClose'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Button from '@mui/joy/Button'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import GroupFilterSelect from './createGroupDialog/groupFilterSelect'
import AccordionGroup from '@mui/joy/AccordionGroup'
import Accordion from '@mui/joy/Accordion'
import AccordionSummary from '@mui/joy/AccordionSummary'
import AccordionDetails from '@mui/joy/AccordionDetails'
import Autocomplete from '@mui/joy/Autocomplete'
import CircularProgress from '@mui/joy/CircularProgress'
import Textarea from '@mui/joy/Textarea'

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
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false)
  const [accordionIndex, setAccordionIndex] = useState<number | null>(0)

  const [rules, setRules] = useState<GroupFilter[]>([])

  if (!accountId) throw new Error('AccountID required!')

  const [users, setUsers] = useState<User[]>([])
  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken]) 

  useEffect(() => {
    groupApiClient.getGroup(groupId)
      .then((group) => {
        setGroup(group)
        if (group.type === 'intelligent') {
          setRules(group.rules)
        }
      })
      .catch((error) => {
        handleClose()
        addAlert('danger', error.response.data.message, 3000)
      })
  }, [groupApiClient, groupId, addAlert, handleClose])

  useEffect(() => {
    setAccordionIndex(null)
  }, [group?.type])

  const loadUser = () => {
    setLoadingUsers(true)
    userApiClient.getUsers(null, null, null, null, null)
      .then(response => setUsers(response.data))
      .catch(error => alert(error))
      .finally(() => setLoadingUsers(false))
  }

  const handleChange = (field: keyof Group) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (group?.type === 'intelligent') {
      group.rules = rules
    }
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
        <div className='flex flex-col gap-4 mb-8'>
          <div className='grid grid-cols-2 gap-2'>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input variant='outlined' value={group?.name} required onChange={handleChange('name')} />
            </FormControl>
            <FormControl>
              <FormLabel>Typ</FormLabel>
              <Select value={group?.type} onChange={(event, value) => setGroup({ ...group, type: value ? value : 'standard', rules: [], users: [] })}>
                <Option value='standard'>Standard</Option>
                <Option value='intelligent'>Intelligent</Option>
              </Select>
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Beschreibung</FormLabel>
            <Textarea 
              minRows={3} 
              value={group?.description} 
              onChange={handleChange('description')} 
            />
          </FormControl>
          <ColorPicker color={group?.color} handleColorChange={handleColorChange} />
          <AccordionGroup>
            <Accordion 
              disabled={group.type === 'intelligent'} 
              expanded={accordionIndex === 0}
              onChange={(event, expanded) => {
                setAccordionIndex(expanded ? 0 : null);
              }}
            >
              <AccordionSummary>Mitglieder</AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  disableClearable
                  value={group.users}
                  options={users}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                  getOptionKey={(option) => option.id}
                  onOpen={loadUser}
                  onChange={(event, value) => setGroup({ ...group, users: value })}
                  loading={loadingUsers}
                  endDecorator={
                    loadingUsers ? (
                      <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                    ) : null
                  }
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              disabled={group.type === 'standard'} 
              expanded={accordionIndex === 1}
              onChange={(event, expanded) => {
                setAccordionIndex(expanded ? 1 : null);
              }}
            >
              <AccordionSummary>Filter</AccordionSummary>
              <AccordionDetails>
                <GroupFilterSelect<GroupFilter> rules={rules} handleRulesChange={setRules} />
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
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