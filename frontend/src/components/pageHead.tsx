import { FunctionComponent, ReactNode } from 'react'

interface PageHeadProps {
  title: string
  subTitle?: string
  children?: ReactNode
}

const PageHead: FunctionComponent<PageHeadProps> = ({ title, subTitle, children }) => {
  return (
    <div className="mx-auto max-w-screen-xl py-2">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
          <p className="mt-1.5 text-sm text-gray-500">{subTitle}</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageHead