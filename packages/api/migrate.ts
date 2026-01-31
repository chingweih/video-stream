import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './server/db'

migrate(db, { migrationsFolder: './drizzle' })
