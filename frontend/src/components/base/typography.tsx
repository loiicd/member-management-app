import { FC } from 'react'

interface TypographyProps {
  children: any
  variant: 'text' | 'header'
}

const Typography: FC<TypographyProps> = ({ variant, children }) => {
  switch(variant) {
    case 'text':
      return (<p className='text-sm text-black dark:text-white'>{children}</p>)
    case 'header':
      return (<p className='text-2xl text-black dark:text-white'>{children}</p>)
  }
}

export default Typography