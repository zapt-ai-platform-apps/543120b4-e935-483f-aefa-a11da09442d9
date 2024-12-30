import { pgTable, serial, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const presentations = pgTable('presentations', {
  id: serial('id').primaryKey(),
  topic: text('topic').notNull(),
  numberOfSlides: integer('number_of_slides').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull(),
});