/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').del();
  await knex('community_posts').del();
  await knex('programs').del();
  await knex('user_profiles').del();
  await knex('career_fields').del();

  // Insert career fields
  const careerFields = await knex('career_fields').insert([
    { fields_category: 'Software Engineering' },
    { fields_category: 'Data Science' },
    { fields_category: 'Marketing' },
  ]).returning('id');

  // Insert user profiles
  const users = await knex('user_profiles').insert([
    { fields_id: careerFields[0].id, username: 'johndoe', email: 'johndoe@example.com', password: 'password123' },
    { fields_id: careerFields[1].id, username: 'janedoe', email: 'janedoe@example.com', password: 'password123' },
  ]).returning('id');

  // Insert programs
  const programs = await knex('programs').insert([
    { fields_id: careerFields[0].id, name: 'Full-Stack Bootcamp', cost: 10000, url: 'https://example.com', description: 'Learn full-stack development.', location: 'Online', image: 'https://example.com/image1.png' },
    { fields_id: careerFields[1].id, name: 'Data Science Immersive', cost: 12000, url: 'https://example.com', description: 'Become a data scientist.', location: 'New York', image: 'https://example.com/image2.png' },
  ]).returning('id');

  // Insert community posts
  const posts = await knex('community_posts').insert([
    { user_id: users[0].id, fields_id: careerFields[0].id, title: 'How to learn JavaScript', content: 'JavaScript is a versatile language...', created_at: knex.fn.now() },
    { user_id: users[1].id, fields_id: careerFields[1].id, title: 'Best practices for data cleaning', content: 'Data cleaning is an essential step...', created_at: knex.fn.now() },
  ]).returning('id');

  // Insert comments
  await knex('comments').insert([
    { user_id: users[0].id, post_id: posts[1].id, content: 'Great tips! Thanks for sharing.', created_at: knex.fn.now() },
    { user_id: users[1].id, post_id: posts[0].id, content: 'Very helpful article.', created_at: knex.fn.now() },
  ]);
};
