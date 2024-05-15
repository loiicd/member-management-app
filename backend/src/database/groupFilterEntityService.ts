import { Client } from 'pg'
import { v4 as uuidv4 } from 'uuid'
import { GroupFilterType } from '../models/groupFilterShema'

export class GroupFilterEntityService {

  async selectGroupFilters(client: Client, groupId: string): Promise<GroupFilterType[]> {
    const query = 'SELECT * FROM public."group_filter" WHERE group_id = $1'
    const values = [groupId]
    return (await client.query(query, values)).rows
  }

  async insertGroupFilter(client: Client, groupId: string, groupFilter: GroupFilterType) {
    const query = 'INSERT INTO public."group_filter" (id, group_id, entity, rule, value) VALUES ($1, $2, $3, $4, $5)'
    const values = [uuidv4(), groupId, groupFilter.entity, groupFilter.rule, groupFilter.value]
    await client.query(query, values)
  }

  async updateGroupFilter(client: Client, groupFilter: GroupFilterType) {
    const query = 'UPDATE public."group_filter" SET entity = $1, rule = $2, value = $3 WHERE id = $4'
    const values = [groupFilter.entity, groupFilter.rule, groupFilter.value]
    await client.query(query, values)
  }

  async deleteGroupFilter(client: Client, groupFilterId: string) {
    const query = 'DELETE FROM public."group_filter" WHERE id = $1'
    const values = [groupFilterId]
    await client.query(query, values)
  }
}