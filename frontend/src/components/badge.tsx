import { FunctionComponent, ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
}

const Badge: FunctionComponent<BadgeProps> = ({ children }) => {
  return (
    <span className='px-2 text-xs border rounded-full text-center'>
      {children}
    </span>
  )
}

export default Badge