import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FC, ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ open, onClose, title, children }) => {
  return open ? (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto w-full bg-black bg-opacity-50'>
      <div className='relative p-4 w-full max-w-2xl h-full md:h-auto'>
        <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
          <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              { title }
            </h3>
            <button type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white' onClick={onClose}>
              <FontAwesomeIcon className='w-5 h-5' icon={icon({ name: 'xmark', style: 'solid' })} size='xl'/>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          { children }
        </div>
      </div>
    </div>
  ) : null
}

export default Modal