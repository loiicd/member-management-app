import { Pool } from 'pg'

export const connect = async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432
  })
  await pool.connect()
  return pool
}