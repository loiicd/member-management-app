import { User, UserFormData } from '../types'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class UserEntityService {
  async getAll(): Promise<User[]> {
    const pool = await connect()
    const query = 'SELECT * FROM public."user"'
    const result = await pool.query(query)
    const users = result.rows
    pool.end()
    return users
  }

  async getOneById(id: string): Promise<User> {
    const pool = await connect()
    const query = `SELECT * FROM public."user" WHERE id = '${id}'`
    const result = await pool.query(query)
    const user = result.rows[0]
    pool.end()
    return user
  }

  async insert(user: UserFormData): Promise<void> {
    const pool = await connect()
    const query = `INSERT INTO public."user" (id, firstname, lastname) VALUES (${uuidv4()}, ${user.firstname}, ${user.lastname})`
    await pool.query(query)
    pool.end()
  }

  async update(user: User): Promise<void> {
    const pool = await connect()
    const query = `UPDATE public."user" SET firstname = ${user.firstname}, lastname = ${user.lastname} WHERE id = '${user.id}'`
    await pool.query(query)
    pool.end()
  }

  async delete(id: string): Promise<void> {
    const pool = await connect()
    const query = `DELETE FROM public."user" WHERE id = '${id}'`
    await pool.query(query)
    pool.end()
  }
}