import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './server/db/schema'
import { Database } from 'bun:sqlite'

const sqlite = new Database('./data/sqlite.db')
export const db = drizzle(sqlite, { schema })
