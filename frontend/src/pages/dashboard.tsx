import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import { getUsers } from '../services/user'
import Table from '../components/base/table/table'
import TableHead from '../components/base/table/tableHead'
import TableBody from '../components/base/table/tableBody'
import TableCell from '../components/base/table/tableCell'
import Header from '../components/header'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'
import Button from '../components/base/button'
import Input from '../components/base/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  useEffect(() => {
    getUsers(searchTerm)
      .then((data) => setUsers(data)) 
  }, [searchTerm])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchTerm(searchTerm)
  }

  return (
    <main>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between pb-2'>
          <Typography variant='h3'>User</Typography>
          <div className='flex space-x-2'>
            <Input type='text' placeholder='Suche ...' onChange={handleSearch}/>
            <Button variant='outlined'>Export</Button>
            <UserDialog type='insert' />
          </div>
        </div>
        <Table>
          <TableHead>
            <tr>
              <TableCell>Vorname</TableCell>
              <TableCell>Nachname</TableCell>
              <TableCell>Geburtsdatum</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Einsatzqualifikation</TableCell>
              <TableCell>Online Zugang</TableCell>
            </tr>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <tr key={user.id} className='bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600' onClick={() => navigate(`/44484414-a4db-4717-8507-26f5296409dd/user/${user.id}`)}> {/* HardCoded URL ACCOUNT */}
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.birthdate?.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.operationalQualifications.map((qualification) => qualification.abbreviation + ' ')}</TableCell>
                <TableCell>{user.webaccess ? <FontAwesomeIcon icon={icon({ name: 'check', style: 'solid' })} size='xl' className='text-lime-600' /> : <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} size='xl' className='text-red-600' />}</TableCell>
              </tr> 
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

export default DashboardPage