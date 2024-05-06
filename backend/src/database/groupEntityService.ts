import { Client } from 'pg'
import { v4 as uuidv4 } from 'uuid'
import { GroupFormDataType, GroupType } from '../models/groupShema'

export class GroupEntityService {

  async selectGroup(client: Client, groupId: string): Promise<GroupType> {
    const query = 'SELECT * FROM public."group" WHERE id = $1'
    const values = [groupId]
    return (await client.query(query, values)).rows[0]
  }

  async selectGroups(client: Client, accountId: string): Promise<GroupType[]> {
    const query = 'SELECT * FROM public."group" WHERE account_id = $1 ORDER BY name'
    const values = [accountId]
    return (await client.query(query, values)).rows
  }

  async insertGroup(client: Client, accountId: string, group: GroupFormDataType): Promise<string> {
    const groupId = uuidv4()
    const query = 'INSERT INTO public."group" (id, account_id, name, description, type, color) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = [groupId, accountId, group.name, group.description, group.type, group.color]
    await client.query(query, values)
    return groupId
  }

  async updateGroup(client: Client, group: GroupType): Promise<void> {
    const query = 'UPDATE public."group" SET name = $1, description = $2, type = $3, color = $4, version = $5, updated_at = now()::timestamp WHERE id = $6 AND version = $7'
    const values = [group.name, group.description, group.type, group.color, group.version + 1, group.id, group.version]
    await client.query(query, values)
  }

  async deleteGroup(client: Client, groupId: string): Promise<void> {
    const query = 'DELETE FROM public."group" WHERE id = $1'
    const values = [groupId]
    await client.query(query, values)
  }

}