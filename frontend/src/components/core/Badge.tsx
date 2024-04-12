import { ReactNode, FunctionComponent } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: string
}

const Badge: FunctionComponent<BadgeProps> = ({ children, color = '#fffff' }) => {
  return (
    <span 
      className='whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm' 
      style={{ backgroundColor: `rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, 0.1)`, color: color }}
    >
      {children}
    </span>
  )
}

export default Badge
