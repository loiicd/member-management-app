import { FunctionComponent } from 'react'
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

interface HeaderProps {
  accountId: string
  toogleSidebar: () => void
}

const Header: FunctionComponent<HeaderProps> = ({ accountId, toogleSidebar }) => {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <FontAwesomeIcon icon={icon({ name: 'wifi', style: 'solid' })} />
      </IconButton>
    </Sheet>
  )
}

export default Header