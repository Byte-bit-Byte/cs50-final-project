/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    createUserTable = () => {
        return knex.schema.createTable('users', table => {
            table.bigIncrements('id').primary().unsigned();
            table.string('name');
            table.string('email').unique().notNullable();
            table.bigint('attempts').defaultTo(0);
            table.timestamps(true, true);
            });
    }

    createLoginTable = () => {
        return knex.schema.createTable('login', table => {
            table.bigIncrements('id').primary().unsigned();
            table.string('email').notNullable();
            table.string('hash').notNullable();
            });
    }

    return createUserTable()
        .then(createLoginTable);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    dropUserTable = () => {knex.schema.dropTableIfExists('users')}
    dropLoginTable = () => {knex.schema.dropTableIfExists('login')}

    return dropUserTable()
        .then(dropLoginTable);
};