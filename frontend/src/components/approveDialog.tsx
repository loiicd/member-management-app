import { FunctionComponent } from 'react'
import Modal from './base/modal'
import Button from './Button'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

interface ApproveDialogProps {
  title: string
  open: boolean
  loading: boolean
  handleClose: () => void
  handleApprove: () => void
}

const ApproveDialog: FunctionComponent<ApproveDialogProps> = ({ title, open, loading, handleClose, handleApprove }) => {
  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <div className='flex justify-end gap-2'>
        <Button onClick={handleClose}>Abbrechen</Button>
        <Button loading={loading} startIcon={icon({ name: 'trash', style: 'solid' })} onClick={handleApprove}>Löschen</Button>
      </div>
    </Modal>
  )
}

export default ApproveDialog