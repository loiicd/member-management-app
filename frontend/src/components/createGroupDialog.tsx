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
import { Accordion, Option, AccordionDetails, AccordionGroup, AccordionSummary, Checkbox, Select, Avatar, ListItemContent, List, ListItem, IconButton, Autocomplete } from '@mui/joy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

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

  const [test, setTest] = useState<User | undefined>(undefined)

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

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleAddUser = (user: User) => {
    if (!formData.users.some(data => data.id === user.id)) {
      setFormData({ ...formData, users: [...formData.users, user] })
    }
  }

  const handleRemoveUser = (user: User) => {
    setFormData({ ...formData, users: formData.users.filter(data => data.id !== user.id) })
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
            <FormControl error={nameInputError}>
              <FormLabel>Name</FormLabel>
              <Input variant='outlined' value={formData.name} required onChange={handleChange('name')} />
              {nameInputError ? <FormHelperText>Name muss ausgefüllt sein!</FormHelperText> : null}
            </FormControl>
            <FormControl disabled>
              <FormLabel>Typ</FormLabel>
              <Select defaultValue='standard'>
                <Option value='standard'>Standard</Option>
                <Option value='intelligent'>Intelligent</Option>
              </Select>
            </FormControl>
          </div>
          <div className='my-4'>
            <ColorPicker color={formData.color} handleColorChange={handleColorChange} />
          </div>
          <div className='my-4'>
            <AccordionGroup>
              <Accordion>
                <AccordionSummary>
                  <Avatar color='primary'>
                    <FontAwesomeIcon icon={icon({ name: 'users', style: 'solid' })} className='w-4 h-4' />
                  </Avatar>
                  <ListItemContent>
                    <Typography level="title-md">Mitglieder</Typography>
                    <Typography level="body-sm">
                      Wähle die Mitglieder aus
                    </Typography>
                  </ListItemContent>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <Input 
                    placeholder='Suche ...'
                    startDecorator={<FontAwesomeIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} className='w-4 h-4' />}
                    value={searchTerm ? searchTerm : undefined} 
                    onChange={handleChangeSearchTerm} 
                    className='my-2' 
                  /> */}
                  <Autocomplete
                    value={test}
                    variant='soft'
                    placeholder='Suche ...'
                    disableClearable
                    options={users}
                    getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                    onChange={(event, value) => { 
                      if (value) {
                        handleAddUser(value)
                        setTest(undefined)
                      }
                    }}
                    endDecorator={
                      <Button>
                        Submit
                      </Button>
                    }
                  />
                  <List>
                    {formData.users.map((user) => (
                      <ListItem
                        endAction={
                          <IconButton size="sm" onClick={() => handleRemoveUser(user)}>
                            <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
                          </IconButton>
                        }
                      >
                        <Avatar>{user.firstname[0]}{user.lastname[0]}</Avatar>
                        <ListItemContent>
                          <Typography level="title-md">{user.firstname} {user.lastname}</Typography>
                          <Typography level="body-sm">{user.email}</Typography>
                        </ListItemContent>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion disabled>
                <AccordionSummary>
                  <Avatar color='danger'>
                    <FontAwesomeIcon icon={icon({ name: 'user-graduate', style: 'solid' })} className='w-4 h-4' />
                  </Avatar>
                  <ListItemContent>
                    <Typography level="title-md">Qualifikationen</Typography>
                    <Typography level="body-sm">
                      Wähle die Qualifikationen aus
                    </Typography>
                  </ListItemContent>
                </AccordionSummary>
                <AccordionDetails>Content</AccordionDetails>
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