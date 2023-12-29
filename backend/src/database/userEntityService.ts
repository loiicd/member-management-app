import { UserType, UserFormDataType } from '../models/userShema'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import { Client } from 'pg'
import { OperationalQualificationType } from '../models/operationalQualificationShema'

export class UserEntityService {
  async getAll(searchTerm: string | undefined): Promise<UserType[]> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const users = await selectUsers(client, searchTerm)
      for (const user of users) user.operationalQualifications = await selectOperationalQualifications(client, user.id)
      await client.query('COMMIT')
      return users
    } catch(error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  async getOneById(id: string): Promise<UserType> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const user = await selectUserById(client, id)
      user.operationalQualifications = await selectOperationalQualifications(client, id)
      await client.query('COMMIT')
      return user
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  async insert(user: UserFormDataType): Promise<void> {
    const client = await connect()
    const query = `INSERT INTO public."user" (id, firstname, lastname, birthdate, address, email, phone, webaccess) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    const values = [uuidv4(), user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.webaccess]
    await client.query(query, values)
    await client.end()
  }

  async update(user: UserType): Promise<void> {
    const client = await connect()
    const query = `UPDATE public."user" SET firstname = $1, lastname = $2, birthdate = $3, address = $4, email = $5, phone = $6, webaccess = $7 WHERE id = $8`
    const values = [user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.webaccess, user.id]
    await client.query(query, values)
    await client.end()
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    const salt = bcryptjs.genSaltSync()
    const hashedPassword = bcryptjs.hashSync(password+salt)
    const client = await connect()
    const query = 'UPDATE public."user" SET password = $1, passwordsalt = $2 WHERE id = $3'
    const values = [hashedPassword, salt, userId]
    await client.query(query, values)
    await client.end()
  }

  async delete(id: string): Promise<void> {
    const client = await connect()
    const query = `DELETE FROM public."user" WHERE id = '${id}'`
    await client.query(query)
    await client.end()
  }
}

const selectUsers = async (client: Client, searchTerm: string | undefined): Promise<UserType[]> => {
  let query: string
  if (searchTerm) {
    const newSearchTerm = searchTerm.split(' ').join(' & ')
    query = `
      SELECT user.id, firstname, lastname, birthdate, address, email, phone, webaccess
      FROM public."user"
      WHERE to_tsvector(firstname || ' ' || lastname || ' ' || birthdate::text || ' ' || address || ' ' || email || ' ' || phone) @@ plainto_tsquery('simple', '${newSearchTerm}:*')`
  } else {
    query = `
      SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
      FROM public."user"
      ORDER BY lastname`
  }
  const result = await client.query(query)
  return result.rows
}

const selectUserById = async (client: Client, userId: string): Promise<UserType> => {
  const query = `
    SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
    FROM public."user" 
    WHERE id = $1`
  const user = await client.query(query, [userId])
  return user.rows[0]
}

const selectOperationalQualifications = async (client: Client, userId: string): Promise<OperationalQualificationType[]> => {
  const query = `
    SELECT id, name, abbreviation
    FROM public."operational_qualification" 
    LEFT JOIN public."user_operational_qualification"
    ON operational_qualification_id = id
    WHERE user_id = $1`
  const result = await client.query(query, [userId])
  return result.rows
}