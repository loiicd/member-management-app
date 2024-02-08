import { useEffect, useState } from 'react'
import Typography from '../components/base/typography'
import UserTable from '../components/userTable'
import StandardLayout from '../layout/standard'
import { getUsers } from '../services/user'
import { User } from '../types/user'

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  useEffect(() => {
    getUsers(searchTerm)
      .then((data) => setUsers(data)) 
  }, [searchTerm])
  
  return (
    <StandardLayout>
      <div className='flex justify-between pb-2'>
        <Typography variant='h3'>User</Typography>
      </div>
      <UserTable users={users} />
    </StandardLayout>
  )
}

export default UsersPage