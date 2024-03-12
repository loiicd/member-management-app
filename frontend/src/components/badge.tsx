import { FunctionComponent, ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: string
}

const Badge: FunctionComponent<BadgeProps> = ({ children, color }) => {
  return (
    <span className='px-2 text-xs border rounded-full text-center' style={{ backgroundColor: color }}>
      {children}
    </span>
  )
}

export default Badge