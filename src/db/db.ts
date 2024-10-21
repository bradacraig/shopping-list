import knex from 'knex'

// Shared Knex configuration
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/db/shopping-list.sqlite3', // Database path
  },
  useNullAsDefault: true,
})

export default db
