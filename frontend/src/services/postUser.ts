import axios from 'axios'

type test = {
  firstname: string,
  lastname: string
}

export const postUser = async (user: test) => {
  const url = `http://localhost:3002/user`
  console.log(user)
  await axios.post(url, user)
}