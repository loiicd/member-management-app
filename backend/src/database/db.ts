import { Client } from 'pg'

export const connect = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432
  })
  await client.connect()
  return client
}