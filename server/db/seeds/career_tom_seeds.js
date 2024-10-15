/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
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
  

  const careerFields = await knex('fields').insert([
    { fields_category: 'Software Engineering' },
    { fields_category: 'Data Science' },
    { fields_category: 'Marketing' },
  ]).returning('*');

const users = await knex('users').insert([
    { fields_id: careerFields[0].id, username: 'johndoe', email: 'johndoe@example.com', password_hash: 'password123', profile_image:'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'  },
    { fields_id: careerFields[1].id, username: 'janedoe', email: 'janedoe@example.com', password_hash: 'password123', profile_image:'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'   },
  ]).returning('*');

const programs = await knex('programs').insert([
{ fields_id: careerFields[0].id, name: 'Full-Stack Bootcamp', cost: 10000, url: 'https://example.com', description: 'Learn full-stack development.', location: 'Online', image: 'https://example.com/image1.png' },
{ fields_id: careerFields[1].id, name: 'Data Science Immersive', cost: 12000, url: 'https://example.com', description: 'Become a data scientist.', location: 'New York', image: 'https://example.com/image2.png' },
]).returning('*');

const posts = await knex('posts').insert([
{ user_id: users[0].id, fields_id: careerFields[0].id , title: 'How to learn JavaScript', content: 'JavaScript is a versatile language...', created_at: knex.fn.now() },
{ user_id: users[1].id, fields_id: careerFields[1].id, title: 'Best practices for data cleaning', content: 'Data cleaning is an essential step...', created_at: knex.fn.now() },
]).returning('*');

console.log(posts, "these are my posts")

const comments = await knex('comments').insert([
{ user_id: users[0].id, post_id: posts[0].id, content: 'Great tips! Thanks for sharing.', created_at: knex.fn.now() },
{ user_id: users[1].id, post_id: posts[1].id, content: 'Very helpful article.', created_at: knex.fn.now() },
]).returning('*');

console.log(comments, "these are the comment related to the post")

};

