import axios from 'axios'

export const deleteUser = async (id: string) => {
  const url = `http://localhost:3002/user/${id}`
  await axios.delete(url)
}