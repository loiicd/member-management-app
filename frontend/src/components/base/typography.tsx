import { FC } from 'react'

interface TypographyProps {
  children?: any
  variant?: 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

const Typography: FC<TypographyProps> = ({ variant = 'text', children }) => {
  const variants = { text: 'text-sm', h1: 'text-5xl', h2: 'text-4xl', h3: 'text-3xl', h4: 'text-2xl', h5: 'text-1xl' }
  return <p className={`text-black dark:text-white ${variants[variant]}`}>{children}</p>
}

export default Typography