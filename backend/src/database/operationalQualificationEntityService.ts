import { OperationalQualificationType, OperationalQualificationFormDataType } from '../models/operationalQualificationShema'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class OperationalQualificationEntityService {
  async getAll(accountId: string): Promise<OperationalQualificationType[]> {
    const client = await connect()
    const query = `
      SELECT id, name, abbreviation
      FROM public."qualification"
      WHERE account_id = '${accountId}'
      ORDER BY name`
    const result = await client.query(query)
    const operationalQualifications = result.rows
    client.end()
    return operationalQualifications
  }

  async insert(accountId: string, operationalQualification: OperationalQualificationFormDataType): Promise<void> {
    const client = await connect()
    const query = 'INSERT INTO public."qualification" (id, account_id, name, abbreviation) VALUES ($1, $2, $3, $4)'
    const values = [uuidv4(), accountId, operationalQualification.name, operationalQualification.abbreviation]
    await client.query(query, values)
    client.end()
  }
}