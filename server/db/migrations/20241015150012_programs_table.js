/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('programs',function (table) {
        table.increments('id').primary();
        table.integer('fields_id').unsigned().references('id').inTable('fields').onDelete('CASCADE');
        table.string('name').notNullable();
        table.integer('cost').notNullable();
        table.string('url');
        table.text('description');
        table.string('location');
        table.string('image'); // Change to string for storing the image URL
      })

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('programs')
  
};
