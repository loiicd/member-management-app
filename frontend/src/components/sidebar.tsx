import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { FunctionComponent } from 'react'
import { logout } from '../services/authenticate'
import Divider from '@mui/joy/Divider'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'

interface SidebarProps {
  accountId: string
}

const Sidebar: FunctionComponent<SidebarProps> = ({ accountId }) => {
  const navigate = useNavigate()
  const signOut = useSignOut()

  const authParams = useAuthUser()()

  const handleSignOut = () => {
    signOut()
    if (authParams) {
      logout(authParams.id)
    }
    navigate('/login')  
  }

  return (
    <div className="flex flex-col justify-between border-e bg-white">
      <List>
        <ListItem onClick={() => navigate(`/${accountId}/dashboard`)}>
          <ListItemButton>
            <ListItemDecorator><FontAwesomeIcon icon={icon({ name: 'home', style: 'solid' })} /></ListItemDecorator>
            <ListItemContent>Dashboard</ListItemContent>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem onClick={() => navigate(`/${accountId}/users`)}>
          <ListItemButton>
            <ListItemDecorator><FontAwesomeIcon icon={icon({ name: 'users', style: 'solid' })} /></ListItemDecorator>
            <ListItemContent>Mitglieder</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => navigate(`/${accountId}/settings/general`)}>
          <ListItemButton>
            <ListItemDecorator><FontAwesomeIcon icon={icon({ name: 'gear', style: 'solid' })} /></ListItemDecorator>
            <ListItemContent>Einstellungen</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <button
          onClick={handleSignOut}
          className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
        <FontAwesomeIcon icon={icon({ name: 'right-from-bracket', style: 'solid' })} />
          <span
            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
          >
            Abmelden
          </span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar