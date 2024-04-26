import { FunctionComponent, useMemo, useRef, useState } from 'react'
import { AccountApiClient } from '../services/accountApiClient'
import { useAuthHeader } from 'react-auth-kit'
import Alert from './core/Alert'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import Sheet from '@mui/joy/Sheet'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'

interface InviteUserDialogProps {
  isOpen: boolean
  close: () => void
  accountId: string
}

const InviteUserDialog: FunctionComponent<InviteUserDialogProps> = ({ isOpen, close, accountId }) => {
  const authToken = useAuthHeader()()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const accountApiClient = useMemo(() => new AccountApiClient('http://localhost:3002', authToken, accountId), [authToken, accountId])
  const [showError, setShowError] = useState<false | any>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const handleInvite = () => {
    setIsLoading(true)
    const email = emailInputRef.current?.value
    if (!email) {
      handleEmptyEmail()
      return
    } 
    accountApiClient.addUser(accountId, email)
      .catch(error => setShowError(error.response.data.message))
      .finally(() => {
        setIsLoading(false)
        close()
        setShowAlert(true)
      })
  }

  const handleEmptyEmail = () => {
    setShowError('E-Mail darf nicht leer sein')
    setIsLoading(false)
  }

  return (
    <>
      <Modal 
        open={isOpen}
        onClose={close}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet sx={{ width: 300, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            User einladen
          </Typography>
          <div className='flex flex-col justify-between gap-4'>
            <FormControl error={showError ? true : false}>
              <FormLabel>E-Mail</FormLabel>
              <Input type='text' variant='outlined' required ref={emailInputRef} />
              <FormHelperText>{showError}</FormHelperText>
            </FormControl>
            <Button onClick={handleInvite} loading={isLoading}>Einladen</Button>
          </div>
        </Sheet>
      </Modal>
      {showAlert ? <Alert type='success' message='User wurde eingeladen' timeout={3000} /> : null}
    </>
  )
}

export default InviteUserDialog