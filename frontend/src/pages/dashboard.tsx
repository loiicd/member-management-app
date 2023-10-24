import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import { getUsers } from '../services/getUsers'
import { postUser } from '../services/postUser'
import Table from '../components/table/table'
import TableHead from '../components/table/tableHead'
import TableBody from '../components/table/tableBody'
import TableCell from '../components/table/tableCell'
import Header from '../components/header'
import Modal from '../components/modal'
import Input from '../components/input'

type Test = {
  firstname: string | null,
  lastname: string | null
}

const DashboardPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers()
      .then((result) => setUsers(result) ) 
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const [formData, setFormData] = useState<Test>({firstname: null, lastname: null})

  const handleChange = (field: keyof Test) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleSave = () => {
    if (formData.firstname != null && formData.lastname !== null) {
      // @ts-ignore
      postUser(formData)
        .then(closeModal)
        .catch((error) => alert(error))
    } else {
      alert('Da fehlt noch was!')
    }
  }

  return (
    <div>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <p className='text-sm'>User</p>
          <button type='button' onClick={openModal}>Neu</button>
        </div>
        <Table>
          <TableHead>
            <tr>
              <TableCell>Vorname</TableCell>
              <TableCell>Nachname</TableCell>
            </tr>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <tr key={user.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' onClick={() => navigate(`/user/${user.id}`)}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
              </tr> 
            ))}
          </TableBody>
        </Table>
        <Modal open={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-semibold">Neuer User</h2>
          <div className='grid grid-cols-2'>
            <div className='col-1'>
              <Input placeholder='Vorname' error={false} required={false} onChange={handleChange('firstname')} />
            </div>
            <div className='col-1'>
              <Input placeholder='Nachname' error={false} required={false} onChange={handleChange('lastname')} />
            </div>
          </div>
          <button onClick={handleSave}>Speichern</button>
        </Modal>
      </div>
    </div>
  )
}

export default DashboardPage