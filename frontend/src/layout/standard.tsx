import { FunctionComponent, useState } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

interface StandardLayoutProps {
  children: React.ReactNode
}

const StandardLayout: FunctionComponent<StandardLayoutProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const toogleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  return (
    <main className='min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900'>
      <div>
        <Header toogleSidebar={toogleSidebar} />
        { openSidebar && <Sidebar /> }
        <div className='container mx-auto ml-72'>
          { children }
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default StandardLayout