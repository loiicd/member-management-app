import { User, UserFormData } from '../types'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class UserEntityService {
  async getAll(searchTerm: string | undefined): Promise<User[]> {
    const client = await connect()
    let query: string
    if (searchTerm) {
      query = `SELECT * FROM public."user" WHERE firstname ILIKE '%${searchTerm}%' OR lastname ILIKE '%${searchTerm}%'`
    } else {
      query = 'SELECT * FROM public."user"'
    }
    const result = await client.query(query)
    const users = result.rows
    client.end()
    return users
  }

  async getOneById(id: string): Promise<User> {
    const client = await connect()
    const query = `SELECT * FROM public."user" WHERE id = '${id}'`
    const result = await client.query(query)
    const user = result.rows[0]
    client.end()
    return user
  }

  async insert(user: UserFormData): Promise<void> {
    const client = await connect()
    const query = `INSERT INTO public."user" (id, firstname, lastname, birthdate, address) VALUES ($1, $2, $3, $4, $5)`

    const values = [uuidv4(), user.firstname, user.lastname, user.birthdate, user.address]

    console.log(values)
    await client.query(query, values)
    client.end()
  }

  async update(user: User): Promise<void> {
    const client = await connect()
    const query = `UPDATE public."user" SET firstname = $1, lastname = $2, birthdate = $3, address = $4 WHERE id = $5`
    const values = [user.firstname, user.lastname, user.birthdate, user.address, user.id]
    await client.query(query, values)
    client.end()
  }

  async delete(id: string): Promise<void> {
    const pool = await connect()
    const query = `DELETE FROM public."user" WHERE id = '${id}'`
    await pool.query(query)
    pool.end()
  }
}