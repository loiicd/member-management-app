import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

interface PaginationProps {
  currentPage: number
  totalEntries: number
  pageNumbers: number[]
  handleChangePagination: (page: number) => void
}

const Pagination: FunctionComponent<PaginationProps> = ({ currentPage, totalEntries, pageNumbers, handleChangePagination }) => {
  return (
    <ol className='flex justify-end gap-1 text-xs font-medium'>
      {currentPage === 1 ? 
            <li 
              className="inline-flex items-center justify-center rounded border border-gray-100 bg-gray-200 text-gray-900 rtl:rotate-180 w-8 h-8"
            >
              <span className="sr-only">Prev Page</span>
              <FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} className='w-3 h-3' />
            </li>
            :
            <li 
              onClick={() => handleChangePagination(currentPage - 1)}
              className="cursor-pointer inline-flex items-center justify-center rounded border hover:bg-gray-100 border-gray-100 bg-white text-gray-900 rtl:rotate-180 w-8 h-8"
            >
              <span className="sr-only">Prev Page</span>
              <FontAwesomeIcon icon={icon({ name: 'chevron-left', style: 'solid' })} className='w-3 h-3' />
            </li>
          }

          {pageNumbers.map((pageNumber) => (
            <li 
              onClick={() => handleChangePagination(pageNumber)}
              className={`cursor-pointer block rounded text-center leading-8 w-8 h-8 ${pageNumber === currentPage ? 'border-blue-600 bg-blue-600 text-white' : 'hover:bg-gray-100 border-gray-100 bg-white text-gray-900'}`}
            >
              {pageNumber}
            </li>
          ))}
    
          {currentPage === Math.ceil(totalEntries / 25) ? 
            <li 
              className="inline-flex items-center justify-center rounded border border-gray-100 bg-gray-200 text-gray-900 rtl:rotate-180 w-8 h-8"
            >
              <span className="sr-only">Next Page</span>
              <FontAwesomeIcon icon={icon({ name: 'chevron-right', style: 'solid' })} className='w-3 h-3' />
            </li>
            :
            <li 
              onClick={() => handleChangePagination(currentPage + 1)}
              className="cursor-pointer inline-flex items-center justify-center rounded border hover:bg-gray-100 border-gray-100 bg-white text-gray-900 rtl:rotate-180 w-8 h-8"
            >
              <span className="sr-only">Next Page</span>
              <FontAwesomeIcon icon={icon({ name: 'chevron-right', style: 'solid' })} className='w-3 h-3' />
            </li>
          }
    </ol>
  )
}

export default Pagination