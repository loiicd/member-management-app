import { FunctionComponent, ReactNode, useState } from 'react'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import NewButton from './newButton'

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
      <NewButton endIcon={icon({ name: 'caret-down', style: 'solid' })} onClick={toogleDropdown}>{text} {counter && <span className='bg-slate-200 rounded-full px-1 text-sm'>{counter}</span>}</NewButton>
      {open && <div className='absolute bg-white mt-2 z-50 rounded-lg shadow'>{children}</div>}
    </div>
  )
}

export default Dropwdown