import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, ReactNode } from 'react'

interface ButtonProps {
  startIcon?: IconDefinition
  endIcon?: IconDefinition
  variant?: 'contained' | 'transparent'
  children?: ReactNode
  onClick?: () => void
  loading?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({ startIcon, endIcon, variant = 'contained', children, onClick, loading = false }) => {
  return (
    <button 
      className={`-space-x-px overflow-hidden rounded-md ${variant === 'contained' ? 'border' : null} bg-white shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative`}
      onClick={onClick}
    >
      {loading ? <FontAwesomeIcon className='w-4 h-4 mr-2 animate-spin' icon={icon({ name: 'spinner', style: 'solid' })} /> : null}
      {startIcon && !loading ? <FontAwesomeIcon className='w-4 h-4 mr-2' icon={startIcon} /> : null}
      {children}
      {endIcon ? <FontAwesomeIcon className='w-4 h-4 ml-2' icon={endIcon} /> : null}
    </button>
  )
}

export default Button