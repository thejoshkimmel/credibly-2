import { pgTable, serial, varchar, timestamp, integer, text, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  userType: varchar('user_type', { length: 50 }),
  companyName: varchar('company_name', { length: 255 }),
  verified: boolean('verified').default(false),
  verificationToken: varchar('verification_token', { length: 255 }),
  resetPasswordToken: varchar('reset_password_token', { length: 255 }),
  resetPasswordExpires: timestamp('reset_password_expires'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const ratings = pgTable('ratings', {
  id: serial('id').primaryKey(),
  ratedUserId: integer('rated_user_id').references(() => users.id),
  raterUserId: integer('rater_user_id').references(() => users.id),
  overallRating: integer('overall_rating').notNull(),
  communicationRating: integer('communication_rating').notNull(),
  reliabilityRating: integer('reliability_rating').notNull(),
  professionalismRating: integer('professionalism_rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const connections = pgTable('connections', {
  id: serial('id').primaryKey(),
  userAId: integer('user_a_id').references(() => users.id),
  userBId: integer('user_b_id').references(() => users.id),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  reporterId: integer('reporter_id').references(() => users.id),
  reportedUserId: integer('reported_user_id').references(() => users.id),
  type: varchar('type', { length: 50 }),
  description: text('description'),
  status: varchar('status', { length: 50 }).default('pending'),
  adminNotes: text('admin_notes'),
  resolvedAt: timestamp('resolved_at'),
  resolvedBy: integer('resolved_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}); 