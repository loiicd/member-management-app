import { FC } from "react"

interface InputProps {
  placeholder?: string
  required: boolean
  value: string | number | undefined
  error: boolean
  onChange: any //muss noch nachgebessert werden
}

const Input: FC<InputProps> = ({ placeholder, required, value, error, onChange }) => {

  const styleOne = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
  const styleTwo = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'

  return (
    <input type='text' value={value} className={ error ? styleTwo : styleOne} placeholder={placeholder} required={required} onChange={onChange} />
  )
}

export default Input