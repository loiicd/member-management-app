import { ReactNode, FunctionComponent } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: string
}

const Badge: FunctionComponent<BadgeProps> = ({ children, color }) => {
  return (
    <span 
      className='whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm' 
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  )
}

export default Badge
