/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('quiz_attempts', table => {
    table.bigIncrements('id').primary().unsigned();
    table.bigint('user_id');
    table.bigint('score').notNullable();
    table.timestamps(true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('quiz_attempts')
};
