
import { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type MenuItem = {
  name: string
  active: boolean
  icon?: IconDefinition
  onClick?: () => void
}

interface MenuProps {
  items: MenuItem[]
}

const Menu: FunctionComponent<MenuProps> = ({ items }) => {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li 
          className={`block rounded-lg px-4 py-2 text-sm font-medium cursor-pointer ${item.active ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          onClick={item.onClick}
        >
          {item.icon ? <FontAwesomeIcon icon={item.icon} className='pe-2' /> : null}
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default Menu