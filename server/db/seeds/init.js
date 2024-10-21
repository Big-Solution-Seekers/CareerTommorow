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
    { fields_id: careerFields[0].id, name: 'The Marcy Lab School', cost: 0, url: 'https://www.marcylabschool.org/', description: 'Learn full-stack development.', location: 'New York', image: 'https://example.com/image1.png' },
    { fields_id: careerFields[0].id, name: 'Npower', cost: 0, url: 'https://www.npower.org/?gad_source=1&gclid=Cj0KCQjw05i4BhDiARIsAB_2wfCOYXde89K2vB8uYnFcJKjF1UGP81Hsq6oqN0NWbaYwNJWHR5qeDxMaAvs5EALw_wcB', description: 'Software Engineer program for women, Tech fundamentals, Cybersecurity, & Cloud computing ', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[0].id, name: 'LaunchCode', cost: 0, url: 'https://www.launchcode.org/education', description: 'Software Engineer, Data Analyst, Database Engineer & Salesforce ', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[0].id, name: 'Fullstack Academy ', cost: 0, url: 'https://www.fullstackacademy.com/programs/wdf-data', description: 'Data Analysis program.', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[0].id, name: 'Code Squad', cost: 0, url: 'https://www.codesquad.org/students.html', description: 'Software Engineer/Developer program.', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[0].id, name: 'Per Scholars', cost: 0, url: 'https://perscholas.org/locations/new-york/', description: 'IT Support, Cybersecurity, Software Engineer & AWS', location: 'New York', image: 'https://example.com/image2.png' },

    { fields_id: careerFields[1].id, name: 'Strayer University', cost: 0, url: 'https://degrees.strayer.edu/business/ ', description: 'Marketing, Management, Accounting', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[1].id, name: 'Coursera ', cost: 0, url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce', description: 'Marketing,E-commerce', location: 'New York', image: 'https://example.com/image2.png' },
   
    { fields_id: careerFields[2].id, name: 'Job Corps', cost: 0, url: 'https://info.joinjobcorps.com/trade', description: 'Medical Assistant, Medical Administrative Assistant, EMT, Nurse Assistant,', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[2].id, name: 'Phillip Houses ', cost: 0, url: 'https://www.phippsny.org/programs/career-readiness/career-network/', description: 'PCT, CMA, & MAA', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[2].id, name: 'Bronxeoc', cost: 0, url: 'http://www.bronxeoc.org/vocational.html#emt', description: 'Medical assitant & EMT', location: 'New York', image: 'https://example.com/image2.png' },
    { fields_id: careerFields[2].id, name: 'Selfhelp', cost: 0, url: 'https://selfhelp.net/home-care-training/', description: 'HHA & PCA', location: 'New York', image: 'https://example.com/image2.png' },
    
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
