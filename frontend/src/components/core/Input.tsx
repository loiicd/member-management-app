import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"

interface InputProps {
  id?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'date' | 'number' | 'password'
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

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, label, placeholder, disabled = false, type = 'text', required = false, value, error = false, errorMessage, onChange, startIcon, endIcon, spinningStartIcon = false, spinningEndIcon = false }, ref) => (
  <div>
    {label ? <label className='block text-sm font-medium leading-6 text-black dark:text-white'>{ label }</label> : null}
    <div className='relative'>
      {startIcon ? 
        <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none sm:text-sm '>
          <FontAwesomeIcon icon={startIcon} className={`w-4 h-4 text-gray-900 ${spinningStartIcon ? 'animate-spin' : null}`} />
        </div> 
        : null
      }
      <input 
        id={id}
        ref={ref}
        type={type}
        value={value === null ? undefined : typeof value === 'object' ? value.toString() : value} 
        placeholder={placeholder} 
        required={required} 
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-md border-gray-200 shadow-sm sm:text-sm ${startIcon ? 'ps-10' : null} ${endIcon ? 'pe-10' : null}`}
      />
      {endIcon ? 
        <div className='absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none sm:text-sm'>
          <FontAwesomeIcon icon={endIcon} className={`w-4 h-4 text-gray-900 ${spinningEndIcon ? 'animate-spin' : null}`} />
        </div> 
        : null
      }
    </div>
    {errorMessage ? <div className='text-sm text-red-500 pt-2 '>{errorMessage}</div> : null}
    </div>
))

export default Input