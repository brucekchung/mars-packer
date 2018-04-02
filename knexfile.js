module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/marsPicker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
} 
