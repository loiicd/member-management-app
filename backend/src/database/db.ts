import { Pool } from 'pg'

export const connect = async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5438
  })
  await pool.connect()
  return pool
}