import { qualificationType, qualificationFormDataType } from '../models/qualificationShema'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class QualificationEntityService {
  async getAll(accountId: string): Promise<qualificationType[]> {
    const client = await connect()
    const query = `
      SELECT id, name, abbreviation
      FROM public."qualification"
      WHERE account_id = '${accountId}'
      ORDER BY name`
    const result = await client.query(query)
    const qualifications = result.rows
    client.end()
    return qualifications
  }

  async insert(accountId: string, qualification: qualificationFormDataType): Promise<void> {
    const client = await connect()
    const query = 'INSERT INTO public."qualification" (id, account_id, name, abbreviation) VALUES ($1, $2, $3, $4)'
    const values = [uuidv4(), accountId, qualification.name, qualification.abbreviation]
    await client.query(query, values)
    client.end()
  }
}