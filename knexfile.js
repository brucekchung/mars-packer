module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/marspacker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
} 
