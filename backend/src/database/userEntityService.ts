import { UserType, UserFormDataType } from '../models/userShema'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import { Client } from 'pg'
import { QualificationType } from '../models/qualificationShema'
import { ApiResponse } from '../types/apiResponse'
import { DataBaseResponse } from '../types/DataBaseResponse'

export type SortAttribute = 'firstname' | 'lastname' | 'birthdate' | 'address' | 'webaccess'
export type SortDirection = 'ASC' | 'DESC'

export class UserEntityService {
  async getAll(accountId: string, searchTerm: string | undefined, sortAttribute: SortAttribute, sortDirection: SortDirection, filter: string[], page: number): Promise<DataBaseResponse> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const result = await selectUsers(client, accountId, searchTerm, sortAttribute, sortDirection, filter, page)
      for (const user of result.data) user.qualifications = await selectQualifications(client, user.id)
      await client.query('COMMIT')
      return result
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
      user.qualifications = await selectQualifications(client, id)
      await client.query('COMMIT')
      return user
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  async insert(accountId: string, user: UserFormDataType): Promise<ApiResponse> {
    const client = await connect()
    const userWithMail = await checkIfMailExists(client, user.email)
    let relExists = false
    if (userWithMail) {
      relExists = await checkIfRelExists(accountId, userWithMail)
      if (relExists) return { type: 'relExists', userId: userWithMail.id }
    }
    if (userWithMail && !relExists) return { type: 'mailExists', userId: userWithMail}
    await insertUser(client, accountId, user)
    return { type: 'userCreated' }
  }

  async addAccountRelation(userId: string, accountId: string): Promise<void> {
    const client = await connect()
    const query = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
    await client.query(query, [userId, accountId])
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

  async getAccounts(userId: string): Promise<any> {
    const client = await connect()
    const query = `
      SELECT id, organisation_name
      FROM public."account"
      LEFT JOIN public."user_account_rel"
      ON account_id = id
      WHERE user_id = $1
    `
    const result = await client.query(query, [userId])
    await client.end()
    return result.rows
  }
}

const selectUsers = async (client: Client, accountId: string, searchTerm: string | undefined, sortAttribute: SortAttribute, sortDirection: SortDirection, filter: string[], page: number): Promise<DataBaseResponse> => {
  let query: string
  if (searchTerm) {
    const newSearchTerm = searchTerm.trim().split(' ').join(':* & ')
    if (filter.length === 0) {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_account_rel.user_id
        WHERE to_tsvector('simple', firstname || ' ' || lastname || ' ' || coalesce(birthdate::text, '') || ' ' || coalesce(address, '') || ' ' || coalesce(email, '') || ' ' || coalesce(phone, '')) @@ to_tsquery('simple', $1)
        AND user_account_rel.account_id = $2
        ORDER BY ${sortAttribute} ${sortDirection}
        LIMIT 5 OFFSET ${(page - 1) * 5}`
    } else {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_account_rel.user_id
        LEFT JOIN public."user_qualification_rel"
        ON id = user_qualification_rel.user_id
        WHERE to_tsvector('simple', firstname || ' ' || lastname || ' ' || coalesce(birthdate::text, '') || ' ' || coalesce(address, '') || ' ' || coalesce(email, '') || ' ' || coalesce(phone, '')) @@ to_tsquery('simple', $1)
        AND user_account_rel.account_id = $2
        AND user_qualification_rel.account_id = $2
        AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})
        ORDER BY ${sortAttribute} ${sortDirection}
        LIMIT 5 OFFSET ${(page - 1) * 5}`
    }
    const result = await client.query(query, [newSearchTerm + ':*', accountId])

    let query_totalEntries: string
    if (filter.length === 0) {
      query_totalEntries = `
      SELECT count(*) as total
      FROM public."user"
      LEFT JOIN public."user_account_rel"
      ON id = user_account_rel.user_id
      WHERE to_tsvector('simple', firstname || ' ' || lastname || ' ' || coalesce(birthdate::text, '') || ' ' || coalesce(address, '') || ' ' || coalesce(email, '') || ' ' || coalesce(phone, '')) @@ to_tsquery('simple', $1)
      AND user_account_rel.account_id = $2`
    } else {
      query_totalEntries = `
      SELECT count(*) as total
      FROM public."user"
      LEFT JOIN public."user_account_rel"
      ON id = user_account_rel.user_id
      LEFT JOIN public."user_qualification_rel"
      ON id = user_qualification_rel.user_id
      WHERE to_tsvector('simple', firstname || ' ' || lastname || ' ' || coalesce(birthdate::text, '') || ' ' || coalesce(address, '') || ' ' || coalesce(email, '') || ' ' || coalesce(phone, '')) @@ to_tsquery('simple', $1)
      AND user_account_rel.account_id = $2
      AND user_qualification_rel.account_id = $2
      AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})`
    }

    const totalEntries = await client.query(query_totalEntries, [newSearchTerm + ':*', accountId])
    return { page: page, total: totalEntries.rows[0].total, data: result.rows}
  } else {
    if (filter.length === 0) {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_id
        WHERE user_account_rel.account_id = $1
        ORDER BY ${sortAttribute} ${sortDirection}
        LIMIT 5 OFFSET ${(page - 1) * 5}`
    } else {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_id
        LEFT JOIN public."user_qualification_rel"
        ON id = user_qualification_rel.user_id
        WHERE user_account_rel.account_id = $1
        AND user_qualification_rel.account_id = $1
        AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})
        ORDER BY ${sortAttribute} ${sortDirection}
        LIMIT 5 OFFSET ${(page - 1) * 5}`
    }
    const result = await client.query(query, [accountId])
    let query_totalEntries: string
    if (filter.length === 0) {
      query_totalEntries = `
        SELECT count(*) as total
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_id
        WHERE user_account_rel.account_id = $1`
    } else {
      query_totalEntries = `
        SELECT count(*) as total
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_id
        LEFT JOIN public."user_qualification_rel"
        ON id = user_qualification_rel.user_id
        WHERE user_account_rel.account_id = $1
        AND user_qualification_rel.account_id = $1
        AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})`
    }

    const totalEntries = await client.query(query_totalEntries, [accountId])

    return { page: page, total: totalEntries.rows[0].total, data: result.rows}
  }
}

const selectUserById = async (client: Client, userId: string): Promise<UserType> => {
  const query = `
    SELECT id, firstname, lastname, birthdate, address, email, phone, webaccess
    FROM public."user" 
    WHERE id = $1`
  const user = await client.query(query, [userId])
  return user.rows[0]
}

const selectQualifications = async (client: Client, userId: string): Promise<QualificationType[]> => {
  const query = `
    SELECT id, name, abbreviation, color
    FROM public."qualification" 
    LEFT JOIN public."user_qualification_rel"
    ON qualification_id = id
    WHERE user_id = $1`
  const result = await client.query(query, [userId])
  return result.rows
}

const checkIfMailExists = async (client: Client, email: string): Promise<any | null> => {
  const response = await client.query('SELECT id, email, ARRAY_AGG(account_id) as account_ids FROM public."user" RIGHT JOIN public."user_account_rel" ON id = user_id WHERE email = $1 GROUP BY id', [email])
  console.log(response.rows)
  if (response.rows.length = 1) return response.rows[0]
  return null
}

const checkIfRelExists = async (accountId: string, user: any): Promise<boolean> => {
  if (user.account_ids.includes(accountId)) return true
  return false
}

const insertUser = async (client: Client, accountId: string, user: UserFormDataType): Promise<void> => {
  try {
    await client.query('BEGIN')
    const userId = uuidv4()
    const query = 'INSERT INTO public."user" (id, firstname, lastname, birthdate, address, email, phone, webaccess) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    const values = [userId, user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.webaccess]
    const query2 = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
    const values2 = [userId, accountId]
    await client.query(query, values)
    await client.query(query2, values2)
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    await client.end()
  }
}