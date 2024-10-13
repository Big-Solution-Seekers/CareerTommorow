/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('career_fields', function (table) {
        table.increments('id').primary();
        table.string('fields_category').notNullable();
      })
    .createTable('user_profiles', function (table){
        table.increments('id').primary();
        table.integer('fields_id').unsigned().references('id').inTable('career_fields').onDelete('CASCADE');
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('programs',function (table) {
        table.increments('id').primary();
        table.integer('fields_id').unsigned().references('id').inTable('career_fields').onDelete('CASCADE');
        table.string('name').notNullable();
        table.integer('cost').notNullable();
        table.string('url');
        table.text('description');
        table.string('location');
        table.string('image'); // Change to string for storing the image URL
      })
      .createTable('community_posts',function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('fields_id').unsigned().references('id').inTable('career_fields').onDelete('CASCADE');
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('comments', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('post_id').unsigned().references('id').inTable('community_posts').onDelete('CASCADE');
        table.text('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('community_posts')
    .dropTable('programs')
    .dropTable('users')
    .dropTable('career_fields')
    .dropTable('comments');
  
};