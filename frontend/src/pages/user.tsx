import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { getUser } from '../services/getUser'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import { deleteUser } from '../services/deleteUser'
import Button from '../components/base/button'

const UserPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((data: User) => setUser(data))
    }
  }, [id])

  const handleClick = () => {
    if (id) {
      deleteUser(id)
        .then(() => navigate('/'))
        .catch((error) => alert(error))
    }
  }

  return (
    <div>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>{user?.firstname} {user?.lastname}</h2>
          <Button onClick={handleClick}>Löschen</Button>
          {/* <button type='button' className='border rounded-xl px-4 bg-slate-500' onClick={handleClick}>Löschen</button> */}
        </div>
      </div>
    </div>
  )
}

export default UserPage