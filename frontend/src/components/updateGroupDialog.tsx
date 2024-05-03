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
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import { GroupApiClient } from '../services/groupApiClient'
import { UserApiClient } from '../services/userApiClient'
import { Group } from '../types/group'
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Checkbox, Avatar, ListItemContent, Skeleton, List, ListItem, ListItemButton, ListItemDecorator, IconButton } from '@mui/joy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { User } from '../types/user'

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
  const [searchTerm, setSearchTerm] = useState<string | null>(null)

  if (!accountId) throw new Error('AccountID required!')

  const [users, setUsers] = useState<User[]>([])
  const userApiClient = useMemo(() => new UserApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken]) 

  useEffect(() => {
    groupApiClient.getGroup(groupId)
      .then((group) => setGroup(group))
      .catch((error) => {
        handleClose()
        addAlert('danger', error.response.data.message, 3000)
      })
  }, [groupApiClient, groupId, addAlert, handleClose])

  const loadUser = () => {
    setLoadingUsers(true)
    userApiClient.getUsers(searchTerm, null, null, null, null)
      .then(response => setUsers(response.data))
      .catch(error => alert(error))
      .finally(() => setLoadingUsers(false))
  }

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

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectUser = (user: User) => {
    if (group) {
      if (group.users.some(data => data.id === user.id)) {
        setGroup({ ...group, users: group.users.filter(data => data.id !== user.id) })
      } else {
        setGroup({ ...group, users: [...group.users, user] })
      }
    }
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
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input variant='outlined' value={group?.name} required onChange={handleChange('name')} />
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
          <ColorPicker color={group?.color} handleColorChange={handleColorChange} />
        </div>
        <div className='my-4'>
          <AccordionGroup>
            <Accordion onChange={loadUser}>
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
                <Input 
                  disabled={loadingUsers}
                  placeholder='Suche ...'
                  startDecorator={<FontAwesomeIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} className='w-4 h-4' />}
                  value={searchTerm ? searchTerm : undefined} 
                  onChange={handleChangeSearchTerm} 
                  className='my-2' 
                />
                <div className='grid grid-cols-2 gap-1'>
                  {users.map((user) => (
                    <div>
                      <Checkbox checked={group.users.some(data => data.id === user.id)} label={user.firstname + ' ' + user.lastname} onChange={() => handleSelectUser(user)}/>
                    </div>
                  ))}
                  {loadingUsers ? 
                    <>
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                      <Skeleton animation="wave" variant="text" sx={{ width: '100%' }} />
                    </>
                    : null
                  }
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion disabled>
              <AccordionSummary>
                <Avatar color='neutral'>
                  <FontAwesomeIcon icon={icon({ name: 'user-graduate', style: 'solid' })} className='w-4 h-4' />
                </Avatar>
                <ListItemContent>
                  <Typography level="title-md" color='neutral'>Qualifikationen</Typography>
                  <Typography level="body-sm">
                    Wähle die Qualifikationen aus
                  </Typography>
                </ListItemContent>
              </AccordionSummary>
              <AccordionDetails>Content</AccordionDetails>
            </Accordion>
          </AccordionGroup>
          <List>
            <ListItem>
              <Avatar>FA</Avatar>
              <ListItemContent>
                <Typography level="title-md">Firstname Lastname</Typography>
                <Typography level="body-sm">
                  email@example.com
                </Typography>
              </ListItemContent>
              <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
            </ListItem>
            <ListItem
               endAction={
                <IconButton size="sm">
                  <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
                </IconButton>
              }
            >
              <Avatar>FA</Avatar>
              <ListItemContent>
                <Typography level="title-md">Firstname Lastname</Typography>
                <Typography level="body-sm">
                  email@example.com
                </Typography>
              </ListItemContent>
            </ListItem>
          </List>
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