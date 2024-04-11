import { FunctionComponent, ReactNode, useState } from 'react'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Button from './core/Button'
import Menu from './core/Menu'

interface DropwdownProps {
  text: string
  counter?: number
  children: ReactNode
}

const Dropwdown: FunctionComponent<DropwdownProps> = ({ text, counter, children }) => {
  const [open, setOpen] = useState<boolean>(false)

  const toogleDropdown = () => setOpen(!open)

  return (
    <div>
      <Button 
        endIcon={icon({ name: 'caret-down', style: 'solid' })} 
        onClick={toogleDropdown}
      >
        {text} {counter && <span className='bg-slate-200 rounded-full px-1 text-sm'>{counter}</span>}
      </Button>
      {open ? 
        <div className='absolute z-10 mt-2 rounded-md border border-gray-100 bg-white shadow-lg'>
          {children}
        </div>
      : null}
    </div>
  )
}

export default Dropwdown