import { FC, ReactNode } from 'react'

interface TableHeadProps {
  children: ReactNode
}

const TableHead: FC<TableHeadProps> = ({ children }) => {
  return (
    <thead className='text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-gray-400'>
      {children}
    </thead>
  )
}

export default TableHead