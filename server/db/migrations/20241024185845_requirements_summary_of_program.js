/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('programs', (table) => {
    // creates two columns: created_at and updated_at
    table.string('requirements', 2000);
    table.string('program_summary', 2000);
  })


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('programs', (table) => {
    table.dropColumn('requirements');
    table.dropColumn('program_summary');
  })

};
