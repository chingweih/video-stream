import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const videos = sqliteTable('videos', {
  id: text('id').primaryKey(),
})
