import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './server/db/schema'
import { mkdir } from 'node:fs/promises'

await mkdir('./data', { recursive: true })
const sqlite = new Database('./data/sqlite.db', {
  create: true,
})
export const db = drizzle(sqlite, { schema })
migrate(db, { migrationsFolder: './drizzle' })
