import { FC, ReactNode } from 'react'

interface TableBodyProps {
  children: ReactNode
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return ( 
    <tbody className='hover:cursor-pointer'>
      {children}
    </tbody>
  )
}

export default TableBody