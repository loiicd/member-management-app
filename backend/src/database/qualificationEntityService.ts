import { Client } from 'pg'
import { QualificationType, QualificationFormDataType } from '../models/qualificationShema'
import { v4 as uuidv4 } from 'uuid'

export class QualificationEntityService {
  async selectQualifications(client: Client, accountId: string): Promise<QualificationType[]> {
    const query = 'SELECT id, name, abbreviation, color FROM public."qualification" WHERE account_id = $1 ORDER BY name'
    const values = [accountId]
    return (await client.query(query, values)).rows
  }

  async selectUserRelations(client: Client, qualificationId: string): Promise<any> {
    const query = 'SELECT * FROM public."user_qualification_rel" WHERE qualification_id = $1'
    const values = [qualificationId]
    return (await client.query(query, values)).rows
  }

  async insertQualification(client: Client, accountId: string, qualification: QualificationFormDataType): Promise<void> {
    const query = 'INSERT INTO public."qualification" (id, account_id, name, abbreviation, color) VALUES ($1, $2, $3, $4, $5)'
    const values = [uuidv4(), accountId, qualification.name, qualification.abbreviation, qualification.color]
    await client.query(query, values)
  }

  async deleteQualification(client: Client, qualificationId: string): Promise<void> {
    const query = 'DELETE FROM public."qualification" WHERE id = $1'
    const values = [qualificationId]
    await client.query(query, values)
  }
}