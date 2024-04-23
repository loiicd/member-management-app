import { QueryResult } from 'pg'
import { QualificationType, QualificationFormDataType } from '../models/qualificationShema'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class QualificationEntityService {
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
  
  async getAll(accountId: string): Promise<QualificationType[]> {
    const query = 'SELECT id, name, abbreviation, color FROM public."qualification" WHERE account_id = $1 ORDER BY name'
    const values = [accountId]
    return (await this.executeQueryWithTransaction(query, values)).rows
  }

  async createQualification(accountId: string, qualification: QualificationFormDataType): Promise<void> {
    const query = 'INSERT INTO public."qualification" (id, account_id, name, abbreviation, color) VALUES ($1, $2, $3, $4, $5)'
    const values = [uuidv4(), accountId, qualification.name, qualification.abbreviation, qualification.color]
    await this.executeQueryWithTransaction(query, values)
  }
}