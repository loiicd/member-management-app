import { UserType, UserFormDataType } from '../types'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class UserEntityService {
  async getAll(searchTerm: string | undefined): Promise<UserType[]> {
    const client = await connect()
    let query: string
    if (searchTerm) {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
        FROM public."user" 
        WHERE firstname ILIKE '%${searchTerm}%' 
        OR lastname ILIKE '%${searchTerm}%' 
        OR address ILIKE '%${searchTerm}%'`
    } else {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
        FROM public."user"`
    }
    const result = await client.query(query)
    const users = result.rows
    client.end()
    return users
  }

  async getOneById(id: string): Promise<UserType> {
    const client = await connect()
    const query = `
      SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
      FROM public."user" 
      WHERE id = '${id}'`
    const result = await client.query(query)
    const user = result.rows[0]
    client.end()
    return user
  }

  async insert(user: UserFormDataType): Promise<void> {
    const client = await connect()
    const query = `INSERT INTO public."user" (id, firstname, lastname, birthdate, address, email, phone, webaccess) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    const values = [uuidv4(), user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.webaccess]
    await client.query(query, values)
    client.end()
  }

  async update(user: UserType): Promise<void> {
    const client = await connect()
    const query = `UPDATE public."user" SET firstname = $1, lastname = $2, birthdate = $3, address = $4, email = $5, phone = $6, webaccess = $7 WHERE id = $8`
    const values = [user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.webaccess, user.id]
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