 const User = require('../../models/User');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Clear existing data and reset sequences

  await knex('comments').del();
  await knex('posts').del();
  await knex('programs').del();
  await knex('users').del();
  await knex('fields').del();

  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE comments_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE programs_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE fields_id_seq RESTART WITH 1");

  // Insert career fields
  const careerFields = await knex('fields').insert([
    { fields_category: 'Technology' },
    { fields_category: 'Bussiness' },
    { fields_category: 'Healthcare' },
    { fields_category: 'Education' },

  ]).returning('*');

  // Create users and get their IDs
  const user1 = await User.create('john_doe', '1234', 'john.doe@example.com', 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');
  const user2 = await User.create('jane_doe', '4567', 'jane.doe@example.com', 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');
  const user3 = await User.create('cool_cat', '1234', 'cool.cat@example.com', 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');
  
  // Assuming User.create returns an object with the 'id', you can access it like this:
  const users = [user1, user2, user3];

  // Insert programs
  const programs = await knex('programs').insert([
    { fields_id: careerFields[0].id, name: 'Full-Stack Bootcamp', cost: 10000, url: 'https://example.com', description: 'Learn full-stack development.', location: 'Online', image: 'https://example.com/image1.png' },
    { fields_id: careerFields[1].id, name: 'Data Science Immersive', cost: 12000, url: 'https://example.com', description: 'Become a data scientist.', location: 'New York', image: 'https://example.com/image2.png' },
  ]).returning('*');

  // Insert posts
  const posts = await knex('posts').insert([
    { user_id: users[0].id, fields_id: careerFields[0].id, title: 'How to learn JavaScript', content: 'JavaScript is a versatile language...', created_at: knex.fn.now() },
    { user_id: users[1].id, fields_id: careerFields[1].id, title: 'Best practices for data cleaning', content: 'Data cleaning is an essential step...', created_at: knex.fn.now() },
  ]).returning('*');

  console.log(posts, "these are my posts");

  // Insert comments
  const comments = await knex('comments').insert([
    { user_id: users[0].id, post_id: posts[0].id, content: 'Great tips! Thanks for sharing.', created_at: knex.fn.now() },
    { user_id: users[1].id, post_id: posts[1].id, content: 'Very helpful article.', created_at: knex.fn.now() },
  ]).returning('*');

  console.log(comments, "these are the comments related to the post");
};
