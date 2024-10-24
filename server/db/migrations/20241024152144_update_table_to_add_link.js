/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('programs', (table) => {
    // creates two columns: created_at and updated_at
    table.string('map_link', 1000);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('programs', (table) => {
    table.dropColumn('map_link');
  })
};
