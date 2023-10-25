import { FC } from 'react'

interface ButtonProps {
  children: string
  onClick: any
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button type='button' className='border rounded-xl px-4 bg-slate-500' onClick={onClick}>{children}</button>
  )
}

export default Button