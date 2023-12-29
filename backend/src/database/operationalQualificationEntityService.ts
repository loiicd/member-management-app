import { OperationalQualificationType } from '../models/operationalQualificationShema'
import { connect } from './db'

export class OperationalQualificationEntityService {
  async getAll(): Promise<OperationalQualificationType[]> {
    const client = await connect()
    const query = `
      SELECT id, name, abbreviation
      FROM public."operational_qualification"
      ORDER BY name`
    const result = await client.query(query)
    const operationalQualifications = result.rows
    client.end()
    return operationalQualifications
  }
}