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
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'>
      <div className='relative w-96 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg'>
        <p className='text-xl text-black dark:text-white'>{title}</p>
        <button
          onClick={onClose}
          className='absolute top-6 right-6 text-gray-500 hover:text-gray-700 focus:outline-none'
        >
          <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} size='xl'/>
        </button>
        {children}
      </div>
    </div>
  ) : null
}

export default Modal