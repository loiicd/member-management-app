import { FC } from 'react'

interface TableCellProps {
  children?: string
}

const TableCell: FC<TableCellProps> = ({ children }) => {
  return (
    <td className='px-6 py-3'>
      {children}
    </td>
  )
}

export default TableCell