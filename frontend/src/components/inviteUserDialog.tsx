import { FunctionComponent, useRef, useState } from 'react'
import Input from './core/Input'
import Modal from './core/Modal'
import Button from './core/Button'
import { AccountApiClient } from '../services/accountApiClient'

interface InviteUserDialogProps {
  isOpen: boolean
  close: () => void
  accountId: string
}

const InviteUserDialog: FunctionComponent<InviteUserDialogProps> = ({ isOpen, close, accountId }) => {
  const accountApiClient = new AccountApiClient('http://localhost:3002', undefined, accountId)

  const [showError, setShowError] = useState<false | any>(false)

  const emailInputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    close()
  }

  const handleTest = () => {
    const email = emailInputRef.current?.value
    if (!email) return
    try {
      accountApiClient.addUser(accountId, email)
    } catch (error) {
      setShowError(error)
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose} title='User hinzufügen' size='sm'>
      <div className='flex flex-col justify-between gap-4'>
        <Input type='text' label='E-Mail' ref={emailInputRef} />
        <Button onClick={handleTest}>Einladen</Button>
      </div>
      {showError && <div className='text-red-600'>{showError}</div>}
    </Modal>
  )
}

export default InviteUserDialog