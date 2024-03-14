import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FunctionComponent } from "react"

interface InputProps {
  label?: string
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'date' | 'number'
  required?: boolean
  value?: string | number | Date | undefined
  error?: boolean
  errorMessage?: string
  onChange?: any
  startIcon?: IconDefinition
  spinningStartIcon?: boolean
  endIcon?: IconDefinition
  spinningEndIcon?: boolean
}

const Input: FunctionComponent<InputProps> = ({ label, placeholder, disabled = false, type = 'text', required = false, value, error = false, errorMessage, onChange, startIcon, endIcon, spinningStartIcon = false, spinningEndIcon = false }) => {
  return (
    <div>
      {label ? <label className='block text-sm font-medium leading-6 text-black dark:text-white'>{ label }</label> : null}
      <div className='relative'>
        {startIcon ? 
          <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
            <FontAwesomeIcon icon={startIcon} className={`w-4 h-4 text-gray-900 ${spinningStartIcon ? 'animate-spin' : null}`} />
          </div> 
          : null
        }
        <input 
          type={type}
          value={value === null ? undefined : typeof value === 'object' ? value.toString() : value} 
          placeholder={placeholder} 
          required={required} 
          onChange={onChange}
          disabled={disabled}
          className={`bg-slate-50 h-8 border ${startIcon ? 'ps-10' : null} ${endIcon ? 'pe-10' : null} ${error ? 'border-red-500 dark:border-red-500' : 'border-zinc-200 dark:border-zinc-600'} hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
        />
        {endIcon ? 
          <div className='absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none'>
            <FontAwesomeIcon icon={endIcon} className={`w-4 h-4 text-gray-900 ${spinningEndIcon ? 'animate-spin' : null}`} />
          </div> 
          : null
        }
        {errorMessage ? <div className='text-sm text-red-500 pt-2'>{errorMessage}</div> : null}
      </div>
    </div>
  )
}

export default Input