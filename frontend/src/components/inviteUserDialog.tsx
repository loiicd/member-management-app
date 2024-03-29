import { FunctionComponent, useRef } from 'react'
import { UserApiClient } from '../services/userApiClient'
import Input from './core/Input'
import Modal from './base/modal'
import Button from './core/Button'
import { AccountApiClient } from '../services/accountApiClient'

interface InviteUserDialogProps {
  isOpen: boolean
  close: () => void
  accountId: string
}

const InviteUserDialog: FunctionComponent<InviteUserDialogProps> = ({ isOpen, close, accountId }) => {
  const userApiClient = new UserApiClient('http://localhost:3002', undefined, accountId)
  const accountApiClient = new AccountApiClient('http://localhost:3002', undefined, accountId)

  const emailInputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    close()
  }

  const handleTest = () => {
    const email = emailInputRef.current?.value
    if (!email) return
    // userApiClient.createUserOrgRel(email)
    try {
      accountApiClient.addUser(accountId, email)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose} title='User hinzufügen'>
      <div className='flex justify-between align-bottom'>
        <Input type='text' label='E-Mail' ref={emailInputRef} />
        <Button onClick={handleTest}>Einladen</Button>
      </div>
    </Modal>
  )
}

export default InviteUserDialog