import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent } from 'react'

interface IconButtonProps {
  icon: IconDefinition
  onClick?: () => void
}

const IconButton: FunctionComponent<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <button className='h-8 w-8 rounded-md hover:bg-gray-200' onClick={onClick}>
      <FontAwesomeIcon className='w-4 h-4 text-slate-600' icon={icon} />
    </button>
  )
}

export default IconButton