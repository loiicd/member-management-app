import * as React from 'react'
import GlobalStyles from '@mui/joy/GlobalStyles'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom'
import { useAuthUser, useSignOut } from 'react-auth-kit'

interface Test {
  accountId: string
}

const Sidebar: React.FunctionComponent<Test> = ({ accountId }) => {
  const navigate = useNavigate()
  const signOut = useSignOut()
  const authParams = useAuthUser()()

  console.log(authParams)

  const handleSignOut = () => {
    signOut()
    navigate('/login')  
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <FontAwesomeIcon icon={icon({ name: 'wifi', style: 'solid' })} />
        </IconButton>
        <Typography level="title-lg">Acme Co.</Typography>
      </Box>
      <Input size="sm" startDecorator={<FontAwesomeIcon icon={icon({ name: 'wifi', style: 'solid' })} />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem onClick={() => navigate(`/${accountId}/dashboard`)}>
            <ListItemButton>
              <FontAwesomeIcon icon={icon({ name: 'house', style: 'solid' })} />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => navigate(`/${accountId}/users`)}>
            <ListItemButton>
              <FontAwesomeIcon icon={icon({ name: 'users', style: 'solid' })} />
              <ListItemContent>
                <Typography level="title-sm">Mitglieder</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
          }}
        >
          <ListItem onClick={() => navigate(`/${accountId}/settings`)}>
            <ListItemButton>
              <FontAwesomeIcon icon={icon({ name: 'gear', style: 'solid' })} />
              Einstellungen
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar size='sm'>{authParams?.firstname[0]}{authParams?.lastname[0]}</Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{authParams?.firstname} {authParams?.lastname}</Typography>
          <Typography level="body-xs">{authParams?.email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={handleSignOut}>
          <FontAwesomeIcon icon={icon({ name: 'right-from-bracket', style: 'solid' })} />
        </IconButton>
      </Box>
    </Sheet>
  );
}

export default Sidebar