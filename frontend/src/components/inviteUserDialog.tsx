import { FunctionComponent, useRef, useState } from 'react'
import { AccountApiClient } from '../services/accountApiClient'
import Input from './core/Input'
import Modal from './core/Modal'
import Button from './core/Button'
import { AxiosError } from 'axios'

interface InviteUserDialogProps {
  isOpen: boolean
  close: () => void
  accountId: string
}

const InviteUserDialog: FunctionComponent<InviteUserDialogProps> = ({ isOpen, close, accountId }) => {
  const accountApiClient = new AccountApiClient('http://localhost:3002', undefined, accountId)
  const [showError, setShowError] = useState<false | any>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => close()

  const handleTest = () => {
    setIsLoading(true)
    const email = emailInputRef.current?.value
    if (!email) {
      setShowError('E-Mail darf nicht leer sein')
      setIsLoading(false)
      return
    } 
    accountApiClient.addUser(accountId, email)
      .catch(error => setShowError(error.response.data.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal open={isOpen} onClose={handleClose} title='User hinzufügen' size='sm'>
      <div className='flex flex-col justify-between gap-4'>
        <Input type='text' label='E-Mail' ref={emailInputRef} />
        {showError ? <div className='text-red-600'>{showError}</div> : null}
        <Button onClick={handleTest} loading={isLoading}>Einladen</Button>
      </div>
    </Modal>
  )
}

export default InviteUserDialog