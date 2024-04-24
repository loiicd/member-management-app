import { Client } from 'pg'
import { QualificationType, QualificationFormDataType } from '../models/qualificationShema'
import { v4 as uuidv4 } from 'uuid'

export class QualificationEntityService {
  async selectQualifications(client: Client, accountId: string): Promise<QualificationType[]> {
    const query = 'SELECT id, name, abbreviation, color FROM public."qualification" WHERE account_id = $1 ORDER BY name'
    const values = [accountId]
    return (await client.query(query, values)).rows
  }

  async insertQualification(client: Client, accountId: string, qualification: QualificationFormDataType): Promise<void> {
    const query = 'INSERT INTO public."qualification" (id, account_id, name, abbreviation, color) VALUES ($1, $2, $3, $4, $5)'
    const values = [uuidv4(), accountId, qualification.name, qualification.abbreviation, qualification.color]
    await client.query(query, values)
  }
}