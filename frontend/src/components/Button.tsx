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
    <button className={`px-3 h-8 rounded-md ${variant === 'contained' ? 'border' : null} hover:bg-gray-200`} onClick={onClick}>
      {loading ? <FontAwesomeIcon className='w-4 h-4 mr-2 animate-spin' icon={icon({ name: 'spinner', style: 'solid' })} /> : null}
      {startIcon && !loading ? <FontAwesomeIcon className='w-4 h-4 mr-2' icon={startIcon} /> : null}
      {children}
      {endIcon ? <FontAwesomeIcon className='w-4 h-4 ml-2' icon={endIcon} /> : null}
    </button>
  )
}

export default Button