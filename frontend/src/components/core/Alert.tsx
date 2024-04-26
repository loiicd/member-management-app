import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, useEffect, useState } from 'react'

interface AlertProps {
  type: 'error' | 'success' | 'info' | 'warning'
  message: string
  timeout: number
}

const Alert: FunctionComponent<AlertProps> = ({ type, message, timeout }) => {
  const [open, setOpen] = useState<boolean>(true)
  const [remainingTime, setRemainingTime] = useState<number>(timeout)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000)
      if (remainingTime <= 0) {
        handleClose()
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [remainingTime])

  const handleClose = () => {
    setOpen(false)
  }

  return open ? (
    <div role="alert" className="fixed bottom-4 right-4 rounded-xl border border-gray-100 bg-white">
      <span className="block rounded-full bg-gray-200 mx-2">
        {type === 'error' ? <span className="block h-1 rounded-full bg-red-600" style={{ width: (remainingTime / timeout) * 100 + '%' }}></span> : null}
        {type === 'success' ? <span className="block h-1 rounded-full bg-green-600" style={{ width: (remainingTime / timeout) * 100 + '%' }}></span> : null}
        {type === 'info' ? <span className="block h-1 rounded-full bg-cyan-600" style={{ width: (remainingTime / timeout) * 100 + '%' }}></span> : null}
        {type === 'warning' ? <span className="block h-1 rounded-full bg-amber-600" style={{ width: (remainingTime / timeout) * 100 + '%' }}></span> : null}
      </span>

      <div className='p-4'>
        <div className="flex items-start gap-4">
          {type === 'error' ? 
            <span className="text-red-600">
              <FontAwesomeIcon icon={icon({ name: 'circle-exclamation', style: 'solid' })} className='w-6 h-6' />
            </span> 
            : null
          }
          {type === 'success' ? 
            <span className="text-green-600">
              <FontAwesomeIcon icon={icon({ name: 'circle-check', style: 'solid' })} className='w-6 h-6' />
            </span> 
            : null
          }
          {type === 'info' ? 
            <span className="text-cyan-600">
              <FontAwesomeIcon icon={icon({ name: 'circle-info', style: 'solid' })} className='w-6 h-6' />
            </span> 
            : null
          }
          {type === 'warning' ? 
            <span className="text-amber-600">
              <FontAwesomeIcon icon={icon({ name: 'triangle-exclamation', style: 'solid' })} className='w-6 h-6' />
            </span> 
            : null
          }


          <div className="flex-1">
            {/* <strong className="block font-medium text-gray-900">{message}</strong> */}

            <p className="mt-1 text-sm text-gray-700">{message}</p>
          </div>

          <button className="text-gray-500 transition hover:text-gray-600" onClick={handleClose}>
            <span className="sr-only">Dismiss popup</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : null
}

export default Alert