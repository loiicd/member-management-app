import { FunctionComponent } from 'react'
import Modal from './base/modal'
import NewButton from './newButtom'

interface ApproveDialogProps {
  title: string
  open: boolean
  handleClose: () => void
  handleApprove: () => void
}

const ApproveDialog: FunctionComponent<ApproveDialogProps> = ({ title, open, handleClose, handleApprove }) => {
  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <div className='flex justify-end gap-2'>
        <NewButton onClick={handleClose}>Abbrechen</NewButton>
        <NewButton onClick={handleApprove}>Löschen</NewButton>
      </div>
    </Modal>
  )
}

export default ApproveDialog