import { FunctionComponent, ReactNode } from 'react'

interface PageHeadProps {
  title: string
  children?: ReactNode
}

const PageHead: FunctionComponent<PageHeadProps> = ({ title, children }) => {
  return (
    <div className='border-b flex justify-between py-6 mb-6'>
      <h2 className='text-2xl'>{title}</h2>
      {children}
    </div>
  )
}

export default PageHead