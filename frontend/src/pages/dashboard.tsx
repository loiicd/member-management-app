import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import { getUsers } from '../services/getUsers'
import Table from '../components/base/table/table'
import TableHead from '../components/base/table/tableHead'
import TableBody from '../components/base/table/tableBody'
import TableCell from '../components/base/table/tableCell'
import Header from '../components/header'
import UserDialog from '../components/userDialog'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers()
      .then((result) => setUsers(result) ) 
  }, [])

  return (
    <>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <p className='text-sm'>User</p>
          <UserDialog type='insert' />
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
              <tr key={user.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200' onClick={() => navigate(`/user/${user.id}`)}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
              </tr> 
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default DashboardPage