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
    <main className='min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900'>
      <div>
        <Header toogleSidebar={toogleSidebar} />
        <div className='grid grid-cols-12 gap-4'>
          { openSidebar && <div className='col-span-2'><Sidebar accountId={accountId} /></div> }
          <div className={`${openSidebar ? 'col-span-10' : 'col-span-12'}`}>
            <div className='container mx-auto'>
              { children }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default StandardLayout