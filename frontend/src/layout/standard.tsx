import { FunctionComponent, useState } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/Sidebar'

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
      <div className='flex justify-between'>
        <Sidebar accountId={accountId} />
        <main className='container mx-auto py-8'>
          { children }
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default StandardLayout