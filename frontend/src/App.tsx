import { useEffect, useState } from 'react'
import { User } from './types/user'
import { getUsers } from './services/getUsers'

const App = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers()
      .then((result) => setUsers(result) ) 
  }, [])

  return (
    <div>
      <h1>MemberManagementApp</h1>
      <p>User</p>
      <table className='table-fixed'>
        <tr>
          <th>ID</th>
          <th>Vorname</th> 
          <th>Nachname</th>
        </tr>
        {users.map((user) => (
          <tr>
            <td>{user.id}</td>
            <td>{user.firstname}</td> 
            <td>{user.lastname}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default App;
