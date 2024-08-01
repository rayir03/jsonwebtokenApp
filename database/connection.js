import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString
})

try {
    await db.query('SELECT NOW()')
    console.log('database connected')
} catch (error) {
    console.log(error)
}