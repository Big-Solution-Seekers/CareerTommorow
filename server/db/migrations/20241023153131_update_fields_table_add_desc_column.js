/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('fields', (table) => {
        // creates two columns: created_at and updated_at
        table.string('description', 1000);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('fields', (table) => {
        table.dropColumn('description');
      })
};
