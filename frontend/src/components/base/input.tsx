import { FC } from "react"

interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'date' | 'number'
  required?: boolean
  value?: string | number | Date | undefined
  error?: boolean
  onChange?: any //muss noch nachgebessert werden
}

const Input: FC<InputProps> = ({ label, placeholder, type = 'text', required = false, value, error = false, onChange }) => {
  return (
    <div>
      <label className='block text-sm font-medium leading-6 text-black dark:text-white'>{ label }</label>
      <input 
        type={type}
        value={typeof value === 'object' ? value.toString() : value} 
        placeholder={placeholder} 
        required={required} 
        onChange={onChange}
        className={`bg-zinc-100 border ${error ? 'border-red-500 dark:border-red-500' : 'border-zinc-200 dark:border-zinc-600'} hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
      />
    </div>
  )
}

export default Input