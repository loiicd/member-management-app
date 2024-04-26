import { ChangeEvent, FunctionComponent, useState } from 'react'
import { QualificationApiClient } from '../services/qualificationApiClient'
import { useAuthHeader } from 'react-auth-kit'
import Modal from './core/Modal'
import Input from './core/Input'
import Button from './core/Button'

type Test = {
  name: string | undefined,
  abbreviation: string | undefined,
  color: string | undefined,
}

interface AddQualificationDialogProps {
  accountId: string
  addAlert: (color: string, message: string, timeout: number) => void
}

const AddQualificationDialog: FunctionComponent<AddQualificationDialogProps> = ({ accountId, addAlert }) => {
  const [open, setOpen] = useState<boolean>(false)
  const authToken = useAuthHeader()()

  const [formData, setFormData] = useState<Test>({ name: undefined, abbreviation: undefined, color: '#FF3B30' })

  const handleOpen = () =>  setOpen(true)
  const handleClose = () =>  setOpen(false)

  const handleChange = (field: keyof Test) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleColorChange = (color: string) => {
    setFormData({
      ...formData,
      color: color
    })
  }

  const handleSave = () => {
    if (formData.name) {
      const qualificationApiClient = new QualificationApiClient('http://localhost:3002', authToken, accountId)
      qualificationApiClient.postQualification(formData)
        .then(() => {
          addAlert('success', 'Qualifikation erstellt', 3000)
          handleClose()
        })
        .catch((error) => alert(error))
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>{'+ Neu'}</Button>
      <Modal open={open} onClose={handleClose} title={'Insert Qualification'} size='xl' >
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-1'>
            <Input type='text' label='Name' value={formData.name} required={true} onChange={handleChange('name')} />
          </div>
          <div className='col-1'>
            <Input type='text' label='Abkürzung' value={formData.abbreviation} required={false} onChange={handleChange('abbreviation')} />
          </div>
        </div>
        <div className='my-4'>
          <div className='flex justify-start gap-2'>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#FF3B30' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FF3B30')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FF3B30'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#FF9500' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FF9500')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FF9500'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#FFCC00' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FFCC00')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FFCC00'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#34C759' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#34C759')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#34C759'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#00C7BE' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#00C7BE')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#00C7BE'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#30B0C7' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#30B0C7')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#30B0C7'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#32ADE6' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#32ADE6')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#32ADE6'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#007AFF' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#007AFF')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#007AFF'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#5856D6' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#5856D6')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#5856D6'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#AF52DE' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#AF52DE')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#AF52DE'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#FF2D55' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#FF2D55')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#FF2D55'}}></div>
            </div>
            <div className={`w-8 h-8 p-0.5 border-2 ${formData.color === '#A2845E' ? 'border-slate-400' : 'border-transparent'} rounded-full flex justify-center cursor-pointer`} onClick={() => handleColorChange('#A2845E')}>
              <div className='w-full h-full rounded-full' style={{ backgroundColor: '#A2845E'}}></div>
            </div>
          </div>
        </div>
        <Button onClick={handleSave}>Speichern</Button>
      </Modal>
    </>
  )
}

export default AddQualificationDialog