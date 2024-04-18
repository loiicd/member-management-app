import { FunctionComponent, useState } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import NewSidebar from '../components/NewSidebar'

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
        <Header accountId={accountId} toogleSidebar={toogleSidebar} />
        <div className='container mx-auto'>
          <NewSidebar accountId={accountId} />
          { children }
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default StandardLayout