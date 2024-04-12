import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FunctionComponent, ReactNode } from "react"

interface ModalProps {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  title?: string
  children: ReactNode
}

const Modal: FunctionComponent<ModalProps> = ({ open, onClose, size = 'md', title, children }) => {
  return open ? (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto w-full bg-black bg-opacity-50'>
      <div className={`relative w-full max-w-${size} h-full md:h-auto`}>
        <div className='relative p-4 rounded-md border border-gray-100 bg-white'>
          <div className='flex justify-between items-center pb-2 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              { title }
            </h3>
            <button type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white' onClick={onClose}>
              <FontAwesomeIcon className='w-5 h-5' icon={icon({ name: 'xmark', style: 'solid' })} size='xl'/>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  ) : null
}

export default Modal