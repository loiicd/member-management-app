import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, ReactNode } from 'react'

interface NewButtonProps {
  startIcon?: IconDefinition
  endIcon?: IconDefinition
  variant?: 'contained' | 'transparent'
  children?: ReactNode
  onClick?: () => void
}

const NewButton: FunctionComponent<NewButtonProps> = ({ startIcon, endIcon, variant = 'contained', children, onClick }) => {
  return (
    <button className={`px-3 h-8 rounded-md ${variant === 'contained' ? 'border' : null} hover:bg-gray-200`} onClick={onClick}>
      {startIcon ? <FontAwesomeIcon className='w-4 h-4 pr-2' icon={startIcon} /> : null}
      {children}
      {endIcon ? <FontAwesomeIcon className='w-4 h-4 pl-2' icon={endIcon} /> : null}
    </button>
  )
}

export default NewButton