import { UserType, UserFormDataType } from '../models/userShema'
import { connect } from './db'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { Client, QueryResult } from 'pg'
import { AccountType } from '../models/accountShema'

export type SortAttribute = 'firstname' | 'lastname' | 'birthdate' | 'address' | 'webaccess'
export type SortDirection = 'ASC' | 'DESC'

export class UserEntityService {
  async insertUser(client: Client, userId: string, user: UserFormDataType): Promise<void> {
    const query = 'INSERT INTO public."user" (id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now()::timestamp, now()::timestamp)'
    const values = [userId, user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.isOnlineUser, user.webaccess]
    await client.query(query, values)
  }

  async getOneById(client: Client, userId: string): Promise<UserType> {
    const query = `
      SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
      FROM public."user" 
      WHERE id = $1`
    const values = [userId]
    return (await client.query(query, values)).rows[0]
  }

  async getOneByMail(client: Client, email: string): Promise<UserType> {
    const query = `
      SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
      FROM public."user" 
      WHERE login_email = $1`
    const values = [email]
    return (await client.query(query, values)).rows[0]
  }

  async getQualifications(client: Client, userId: string): Promise<any[]> {
    const query = `
      SELECT id, name, abbreviation, color
      FROM public."qualification" 
      LEFT JOIN public."user_qualification_rel"
      ON qualification_id = id
      WHERE user_id = $1`
    const values = [userId]
    return (await client.query(query, values)).rows
  }

  async getAccounts(client: Client, userId: string): Promise<AccountType[]> {
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

  async getAll(client: Client, accountId: string, sortAttribute: SortAttribute, sortDirection: SortDirection, filter: string[], page: number): Promise<UserType[]> {
    const query = `
      SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
      FROM public."user"
      LEFT JOIN public."user_account_rel"
      ON id = user_account_rel.user_id
      ${filter.length !== 0 ? 'LEFT JOIN public."user_qualification_rel" ON id = user_qualification_rel.user_id' : ''}
      WHERE user_account_rel.account_id = $1
      ${filter.length !== 0 ? 'AND user_qualification_rel.account_id = $1' : ''}
      ${filter.length !== 0 ? `AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})` : ''}
      ORDER BY ${sortAttribute} ${sortDirection}
      LIMIT 25 OFFSET ${(page - 1) * 25}
    `
    const values = [accountId]
    return (await client.query(query, values)).rows
  }

  async getAllWithSearch(client: Client, accountId: string, searchTerm: string, sortAttribute: SortAttribute, sortDirection: SortDirection, filter: string[], page: number): Promise<UserType[]> {
    const query = `
      SELECT id, firstname, lastname, birthdate, address, email, phone, is_online_user, webaccess, created_at, updated_at
      FROM public."user"
      LEFT JOIN public."user_account_rel"
      ON id = user_account_rel.user_id
      ${filter.length !== 0 ? 'LEFT JOIN public."user_qualification_rel" ON id = user_qualification_rel.user_id' : ''}
      WHERE user_account_rel.account_id = $2
      AND to_tsvector('simple', firstname || ' ' || lastname || ' ' || coalesce(birthdate::text, '') || ' ' || coalesce(address, '') || ' ' || coalesce(email, '') || ' ' || coalesce(phone, '')) @@ to_tsquery('simple', $1)
      ${filter.length !== 0 ? 'AND user_qualification_rel.account_id = $2' : ''}
      ${filter.length !== 0 ? `AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})` : ''}
      ORDER BY ${sortAttribute} ${sortDirection}
      LIMIT 25 OFFSET ${(page - 1) * 25}
    `
    const values = [searchTerm + ':*', accountId]
    return (await client.query(query, values)).rows
  }

  async getTotalEntriesCount(client: Client, accountId: string, filter: string[]): Promise<number> {
    const query = `
      SELECT count(*) as total
      FROM public."user"
      LEFT JOIN public."user_account_rel"
      ON id = user_account_rel.user_id
      ${filter.length !== 0 ? 'LEFT JOIN public."user_qualification_rel" ON id = user_qualification_rel.user_id' : ''}
      WHERE user_account_rel.account_id = $1
      ${filter.length !== 0 ? 'AND user_qualification_rel.account_id = $1' : ''}
      ${filter.length !== 0 ? `AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})` : ''}
    `
    const values = [accountId]
    return (await client.query(query, values)).rows[0].total
  }

  async getTotalEntriesCountWithSearch(client: Client, accountId: string, searchTerm: string | undefined, filter: string[]): Promise<number> {
    const query = `
      SELECT count(*) as total
      FROM public."user"
      LEFT JOIN public."user_account_rel"
      ON id = user_account_rel.user_id
      ${filter.length !== 0 ? 'LEFT JOIN public."user_qualification_rel" ON id = user_qualification_rel.user_id' : ''}
      WHERE user_account_rel.account_id = $2
      AND to_tsvector('simple', firstname || ' ' || lastname || ' ' || coalesce(birthdate::text, '') || ' ' || coalesce(address, '') || ' ' || coalesce(email, '') || ' ' || coalesce(phone, '')) @@ to_tsquery('simple', $1)
      ${filter.length !== 0 ? 'AND user_qualification_rel.account_id = $2' : ''}
      ${filter.length !== 0 ? `AND qualification_id IN (${filter.map((filter) => `'${filter}'`)})` : ''}
    `
    const values = [searchTerm + ':*', accountId]
    return (await client.query(query, values)).rows[0].total
  }

  async updatePassword(client: Client, userId: string, hashedPassword: string, salt: string): Promise<void> {
    const query = 'UPDATE public."user" SET password = $1, passwordsalt = $2, updated_at = now()::timestamp WHERE id = $3'
    const values = [hashedPassword, salt, userId]
    await client.query(query, values)
  }

  async getLoginDataByMail(client: Client, email: string): Promise<any> {
    const query = 'SELECT id, login_email, password, passwordsalt FROM public."user" WHERE email = $1'
    const values = [email]
    return (await client.query(query, values)).rows[0]
  }

  // Old!! without Service Client Provider

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

  async update(user: UserType): Promise<void> {
    const query = 'UPDATE public."user" SET firstname = $1, lastname = $2, birthdate = $3, address = $4, email = $5, phone = $6, is_online_user = $7, webaccess = $8, updated_at = now()::timestamp WHERE id = $9'
    const values = [user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.isOnlineUser, user.webaccess, user.id]
    await this.executeQueryWithTransaction(query, values)
  }

  async checkEmail(email: string): Promise<boolean> {
    const query = 'SELECT login_email FROM public."user" WHERE email = $1'
    const values = [email]
    return (await this.executeQueryWithTransaction(query, values)).rowCount != 0 ? true : false
  }

  async createUser(user: UserFormDataType): Promise<string> {
    const id = uuidv4()
    const query = 'INSERT INTO public."user" (id, firstname, lastname, birthdate, address, email, phone, login_email, is_online_user, webaccess, password, passwordsalt, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, now()::timestamp, now()::timestamp)'
    const values = [id, user.firstname, user.lastname, user.birthdate, user.address, user.email, user.phone, user.login_email, user.isOnlineUser, user.webaccess, user.password, user.passwordsalt]
    await this.executeQueryWithTransaction(query, values)
    return id
  }
}