import { UserType, UserFormDataType } from '../models/userShema'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import { Client, QueryResult } from 'pg'
import { QualificationType } from '../models/qualificationShema'
import { ApiResponse } from '../types/apiResponse'
import { DataBaseResponse } from '../types/DataBaseResponse'
import { ValidateError } from './validateError'
import { AccountType } from '../models/accountShema'

export type SortAttribute = 'firstname' | 'lastname' | 'birthdate' | 'address' | 'webaccess'
export type SortDirection = 'ASC' | 'DESC'

export class UserEntityService {
  private async executeQueryWithTransaction(query: string, values: any[]): Promise<QueryResult<any>> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const result = await client.query(query, values)
      await client.query('COMMIT')
      return result
    } catch(error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }


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

  async getOneByIdTest(client: Client, userId: string): Promise<UserType> {
    const user = await selectUserById(client, userId)
    user.qualifications = await selectQualifications(client, userId)
    return user
  }

  async getAccountsTest(client: Client, userId: string): Promise<AccountType[]> {
    const query = 'SELECT id, organisation_name FROM public."account" LEFT JOIN public."user_account_rel" ON account_id = id WHERE user_id = $1'
    const values = [userId]
    return (await client.query(query, values)).rows
  }

  async deleteUser(client: Client, userId: string): Promise<void> {
    const query = 'DELETE FROM public."user" WHERE id = $1'
    const values = [userId]
    await client.query(query, values)
  }

  async removeQualifications(client: Client, userId: string): Promise<void> {
    const query = 'DELETE FROM public."user_qualification_rel" WHERE user_id = $1'
    const values = [userId]
    await client.query(query, values)
  }

  async getOneByEmail(email: string): Promise<UserType> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const user = await selectUserByEmail(client, email)
      if (!user) { 
        throw new ValidateError('USER_NOT_FOUND', 'User not found')
      }
      user.qualifications = await selectQualifications(client, user.id)
      await client.query('COMMIT')
      return user
    } catch (error) {
      await client.query('ROLLBACK')
      console.log('Error:', error)
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
    const query = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
    const values = [userId, accountId]
    await this.executeQueryWithTransaction(query, values)
  }

  async update(user: UserType): Promise<void> {
    const query = 'UPDATE public."user" SET firstname = $1, lastname = $2, birthdate = $3, address = $4, email = $5, phone = $6, is_online_user = $7, webaccess = $8, updated_at = now()::timestamp WHERE id = $9'
    const values = [user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.isOnlineUser, user.webaccess, user.id]
    await this.executeQueryWithTransaction(query, values)
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    const salt = bcryptjs.genSaltSync()
    const hashedPassword = bcryptjs.hashSync(password+salt)
    const query = 'UPDATE public."user" SET password = $1, passwordsalt = $2, updated_at = now()::timestamp WHERE id = $3'
    const values = [hashedPassword, salt, userId]
    await this.executeQueryWithTransaction(query, values)
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM public."user" WHERE id = $1'
    const values = [id]
    await this.executeQueryWithTransaction(query, values)
  }

  async getAccounts(userId: string): Promise<AccountType[]> {
    const query = 'SELECT id, organisation_name FROM public."account" LEFT JOIN public."user_account_rel" ON account_id = id WHERE user_id = $1'
    const values = [userId]
    return (await this.executeQueryWithTransaction(query, values)).rows
  }

  async checkEmail(email: string): Promise<boolean> {
    const query = 'SELECT login_email FROM public."user" WHERE email = $1'
    const values = [email]
    return (await this.executeQueryWithTransaction(query, values)).rowCount != 0 ? true : false
  }

  async getLoginDataByMail(email: string): Promise<any> {
    const query = 'SELECT id, login_email, password, passwordsalt FROM public."user" WHERE email = $1'
    const values = [email]
    return (await this.executeQueryWithTransaction(query, values)).rows[0]
  }

  async createUser(user: UserFormDataType): Promise<string> {
    const id = uuidv4()
    const query = 'INSERT INTO public."user" (id, firstname, lastname, birthdate, address, email, phone, login_email, is_online_user, webaccess, password, passwordsalt, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, now()::timestamp, now()::timestamp)'
    const values = [id, user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.login_email, user.isOnlineUser, user.webaccess, user.password, user.passwordsalt]
    await this.executeQueryWithTransaction(query, values)
    return id
  }
}

const selectUsers = async (client: Client, accountId: string, searchTerm: string | undefined, sortAttribute: SortAttribute, sortDirection: SortDirection, filter: string[], page: number): Promise<DataBaseResponse> => {
  let query: string
  if (searchTerm) {
    const newSearchTerm = searchTerm.trim().split(' ').join(':* & ')
    if (filter.length === 0) {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_account_rel.user_id
        WHERE to_tsvector('simple', firstname || ' ' || lastname || ' ' || coalesce(birthdate::text, '') || ' ' || coalesce(address, '') || ' ' || coalesce(email, '') || ' ' || coalesce(phone, '')) @@ to_tsquery('simple', $1)
        AND user_account_rel.account_id = $2
        ORDER BY ${sortAttribute} ${sortDirection}
        LIMIT 25 OFFSET ${(page - 1) * 25}`
    } else {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
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
        LIMIT 25 OFFSET ${(page - 1) * 25}`
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
        SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_id
        WHERE user_account_rel.account_id = $1
        ORDER BY ${sortAttribute} ${sortDirection}
        LIMIT 25 OFFSET ${(page - 1) * 5}`
    } else {
      query = `
        SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
        FROM public."user"
        LEFT JOIN public."user_account_rel"
        ON id = user_id
        LEFT JOIN public."user_qualification_rel"
        ON id = user_qualification_rel.user_id
        WHERE user_account_rel.account_id = $1
        AND user_qualification_rel.account_id = $1
        AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})
        ORDER BY ${sortAttribute} ${sortDirection}
        LIMIT 25 OFFSET ${(page - 1) * 5}`
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
    SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
    FROM public."user" 
    WHERE id = $1`
  const user = await client.query(query, [userId])
  return user.rows[0]
}

const selectUserByEmail = async (client: Client, email: string): Promise<UserType> => {
  const query = `
    SELECT id, firstname, lastname, birthdate, address, email, login_email phone, is_online_user, webaccess, created_at, updated_at
    FROM public."user" 
    WHERE login_email = $1`
  const user = await client.query(query, [email])
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
  const response = await client.query('SELECT id, login_email, ARRAY_AGG(account_id) as account_ids FROM public."user" RIGHT JOIN public."user_account_rel" ON id = user_id WHERE email = $1 GROUP BY id', [email])
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
    const query = 'INSERT INTO public."user" (id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now()::timestamp, now()::timestamp)'
    const values = [userId, user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.isOnlineUser, user.webaccess]
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