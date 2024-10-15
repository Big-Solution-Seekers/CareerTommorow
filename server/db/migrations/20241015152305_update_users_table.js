/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.integer('fields_id').unsigned().references('id').inTable('fields').onDelete('CASCADE');
        table.string('email').notNullable().unique();
      })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('fields_id');
        table.dropColumn('email');
      })
  
};
