import { FunctionComponent, useState } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Box from '@mui/joy/Box'

interface StandardLayoutProps {
  accountId: string
  children: React.ReactNode
}

const StandardLayout: FunctionComponent<StandardLayoutProps> = ({ accountId, children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const toogleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  return (
    <div className='min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900'>
      <Header accountId={accountId} toogleSidebar={toogleSidebar} />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar accountId={accountId} />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            minHeight: '100dvh',
            gap: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </div>
  )
}

export default StandardLayout