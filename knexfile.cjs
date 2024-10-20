module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/shopping-list.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations',
    },
  },
}
