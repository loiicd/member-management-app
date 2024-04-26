import { FunctionComponent, useState } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

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
      <div className='grid grid-cols-8 gap-16 flex-grow'>
        <Sidebar accountId={accountId} />
        <main className='col-span-6 container mx-auto py-8'>
          { children }
        </main>
        <div></div>
      </div>
      <Footer />
    </div>
  )
}

export default StandardLayout