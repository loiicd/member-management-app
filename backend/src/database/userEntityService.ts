import { User, UserFormData } from '../types'
import { connect } from './db'

export class UserEntityService {
  async getAll(): Promise<User[]> {
    const pool = await connect()
    const query = 'SELECT * FROM user'
    const result = await pool.query(query)
    const users = result.rows
    return users
  }

  async getOneById(id: string): Promise<User> {
    const pool = await connect()
    const query = `SELECT * FROM user WHERE id = ${id}`
    const result = await pool.query(query)
    const user = result.rows[0]
    return user
  }

  async insert(user: UserFormData): Promise<void> {
    const pool = await connect()
    const query = `INSERT INTO user (...) VALUES (...)`
    await pool.query(query)
  }

  async update(user: User): Promise<void> {
    const pool = await connect()
    const query = `UPDATE user SET ...`
    await pool.query(query)
  }x

  async delete(id: string): Promise<void> {
    const pool = await connect()
    const query = `DELETE FROM user WHERE id = ${id}`
    await pool.query(query)
  }
}