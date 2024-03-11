import { FC, useRef, useState } from 'react'
import Modal from './base/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { UserApiClient } from '../services/userApiClient'
import { useParams } from 'react-router-dom'
import NewButton from './newButton'

interface PasswordDialogProps {
  userId: string
}

const PasswordDialog: FC<PasswordDialogProps> = ({ userId }) => {
  const { accountId } = useParams()
  const [open, setOpen] = useState<boolean>(false)

  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)

  const password1InputRef = useRef<HTMLInputElement>(null)
  const password2InputRef = useRef<HTMLInputElement>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSave = async () => {
    const password1 = password1InputRef.current?.value
    const password2 = password2InputRef.current?.value

    if (password1 === undefined && password2 === undefined) {
      alert('keine Passwörter')
      return
    }
    if (password1 !== password2) {
      alert('ungleiche Passwörter')
      return
    }

    if (password1 === password2) {
      //@ts-ignore
      userApiClient.updatePassword(userId, password1)
      
      
      // await putPassword(userId, password1)

      handleClose()
      return
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className='px-2 text-gray-500 rounded-full hover:bg-zinc-700'
      >
        <FontAwesomeIcon icon={icon({ name: 'pen', style: 'solid' })}/>
      </button>
      <Modal open={open} onClose={handleClose} title='Passwort bearbeiten'>
        <div>
          <label className='block text-sm font-medium leading-6 text-black dark:text-white'>Passwort</label>
          <input 
            type='password'
            ref={password1InputRef}
            className={`bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
          />
        </div>

        <div>
          <label className='block text-sm font-medium leading-6 text-black dark:text-white'>Passwort wiederholen</label>
          <input 
            type='password'
            ref={password2InputRef}
            className={`bg-zinc-100 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-3 dark:bg-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500`}
          />
        </div>

        <div className='flex justify-center mt-4'>
          <NewButton onClick={handleSave}>Speichern</NewButton>
        </div>
      </Modal>
    </>
  )
}

export default PasswordDialog