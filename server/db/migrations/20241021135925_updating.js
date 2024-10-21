/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('programs', (table) => {
      table.string('name', 1000).alter();
      table.string('description', 1000).alter();
      table.string('location', 1000).alter();
      table.string('image', 1000).alter();
      table.string('url', 1000).alter();
    });
  };
    

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('programs', (table) => {
      table.string('name', 255).alter();
      table.string('description', 255).alter();
      table.string('location', 255).alter();
      table.string('image', 255).alter();
      table.string('url', 255).alter();
    });
  };
  
