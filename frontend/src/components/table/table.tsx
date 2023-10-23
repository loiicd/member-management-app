import { FC, ReactNode } from 'react'

interface TableProps {
  children: ReactNode
}

const Table: FC<TableProps> = ({ children }) => (
  <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
    {children}
  </table>
)

export default Table