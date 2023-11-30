import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { getUser } from '../services/getUser'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import { deleteUser } from '../services/deleteUser'
import Button from '../components/base/button'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'

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
    <>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <Typography variant='header'>{user?.firstname} {user?.lastname}</Typography>
          <UserDialog type='update' userId={user?.id} />
          <Button onClick={handleClick}>Löschen</Button>
        </div>

        <Button size='sm' color='red'>Small</Button>
        <Button color='red'>Medium</Button>
        <Button size='lg' color='green'>Large</Button>
      </div>
    </>
  )
}

export default UserPage