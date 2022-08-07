// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'cs50_final_project',
      user:     'postgres',
      password: 'test'
    },
    pool: {
      min: 0,
      max: 7
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
