import { FC } from 'react'

interface ButtonProps {
  children: string
  variant?: 'outlined' | 'contained' | 'text'
  size?: 'sm' | 'md' | 'lg'
  color?: 'green' | 'red' | 'gray'
  onClick?: any
}

const Button: FC<ButtonProps> = ({ children, variant, size = 'md', color = 'gray', onClick }) => {
  const colors = { green: 'bg-lime-600 text-white', red: 'bg-red-600 text-white', gray: 'bg-zinc-600 text-white'}
  const sizes = { sm: 'text-sm px-2 py-1', md: 'text-md px-4 py-1.5', lg: 'text-lg px-6 py-2' }

  switch (variant) {
    case 'contained':
      return <button type='button' className={`rounded-lg font-semibold ${sizes[size]} ${colors[color]} hover:bg-opacity-50`} onClick={onClick}>{children}</button>  
    case 'outlined':
      return <button type='button' className={`rounded-lg font-semibold border bg-zinc-850 border-zinc-600 hover:border-zinc-400 ${sizes[size]} text-zinc-200`} onClick={onClick}>{children}</button>
    default:
      return <button type='button' className={`rounded-lg font-semibold ${sizes[size]} text-zinc-200`} onClick={onClick}>{children}</button>
  }
}

export default Button