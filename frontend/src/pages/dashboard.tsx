import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { getUsers } from '../services/getUsers'
import Table from '../components/table/table'
import TableHead from '../components/table/tableHead'
import TableBody from '../components/table/tableBody'
import TableCell from '../components/table/tableCell'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers()
      .then((result) => setUsers(result) ) 
  }, [])


  return (
    <div>
      <Header />
      <div className='container mx-auto'>
        <p className='text-sm'>User</p>
        <Table>
          <TableHead>
            <tr>
              <TableCell>Vorname</TableCell>
              <TableCell>Nachname</TableCell>
            </tr>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' onClick={() => navigate(`/user/${user.id}`)}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
              </tr> 
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashboardPage