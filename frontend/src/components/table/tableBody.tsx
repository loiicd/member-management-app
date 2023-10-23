import { FC, ReactNode } from 'react'

interface TableBodyProps {
  children: ReactNode
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return ( 
    <tbody>
      {children}
    </tbody>
  )
}

export default TableBody