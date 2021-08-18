// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'usuario',
      user:     'postgres',
      password: '2022'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
 
};
