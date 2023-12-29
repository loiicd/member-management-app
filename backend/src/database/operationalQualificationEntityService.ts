import { OperationalQualificationType, OperationalQualificationFormDataType } from '../models/operationalQualificationShema'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

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

  async insert(operationalQualification: OperationalQualificationFormDataType): Promise<void> {
    const client = await connect()
    const query = 'INSERT INTO public."operational_qualification" (id, name, abbreviation) VALUES ($1, $2, $3)'
    const values = [uuidv4(), operationalQualification.name, operationalQualification.abbreviation]
    await client.query(query, values)
    client.end()
  }
}