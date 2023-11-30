import { FC } from 'react'

interface ButtonProps {
  children: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'green' | 'red' | 'gray'
  onClick?: any
}

const Button: FC<ButtonProps> = ({ children, size = 'md', color = 'gray', onClick }) => {
  const colors = { green: 'bg-lime-600 text-white', red: 'bg-red-600 text-white', gray: 'bg-zinc-600 text-white'}
  const sizes = { sm: 'text-sm px-2 py-1', md: 'text-md px-4 py-1.5', lg: 'text-lg px-6 py-2' }

  return (
    <button type='button' className={`rounded-lg font-semibold ${sizes[size]} ${colors[color]} hover:bg-opacity-50`} onClick={onClick}>{children}</button>
  )
}

export default Button