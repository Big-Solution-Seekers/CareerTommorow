// /server/db/seeds/career_tomorrow.js
const User = require('../../models/UserProfile');
const Comment = require('../../models/Comment');
const CommunityPost = require('../../models/CommunityPost');
const CareerField = require('../../models/CareerFields');
const Program = require('../../models/Program');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Clear existing data
  await knex('comments').del();
  await knex('community_posts').del();
  await knex('programs').del();
  await knex('user_profiles').del();
  await knex('career_fields').del();

  // Reset sequences
  await knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE community_posts_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE programs_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE user_profiles_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE career_fields_id_seq RESTART WITH 1');

  // Seed Career Fields
  const techField = await CareerField.create({ fields_category: 'Technology' });
  const healthField = await CareerField.create({ fields_category: 'Healthcare' });

  // Seed User Profiles
  const user1 = await User.create('tech_guru', 'password123');
  const user2 = await User.create('health_pro', 'password123');

  // Make sure user1 and user2 are successfully created
  if (!user1 || !user1.id || !user2 || !user2.id) {
    throw new Error('User creation failed. Check the User model.');
  }

  // Seed Programs
  await Program.create({
    fields_id: techField.id,
    name: 'Full Stack Web Development Bootcamp',
    cost: 12000,
    url: 'https://example.com/bootcamp',
    description: 'An intensive program covering HTML, CSS, JavaScript, and more.',
    location: 'San Francisco, CA',
    image: 'https://example.com/images/bootcamp.jpg',
  });

  await Program.create({
    fields_id: healthField.id,
    name: 'Nursing Certification Program',
    cost: 8000,
    url: 'https://example.com/nursing',
    description: 'A program to prepare students for the nursing field.',
    location: 'New York, NY',
    image: 'https://example.com/images/nursing.jpg',
  });

  // // Seed Community Posts using the IDs of the created users
  // const post1 = await CommunityPost.create({
  //   user_id: user1.id, // Use the actual ID from the user creation
  //   fields_id: techField.id,
  //   title: 'Getting Started in Web Development',
  //   content: 'What resources are best for beginners?',
  // });

  // const post2 = await CommunityPost.create({
  //   user_id: user2.id, // Use the actual ID from the user creation
  //   fields_id: healthField.id,
  //   title: 'Best Nursing Schools?',
  //   content: 'Can anyone recommend a good nursing school in NYC?',
  // });

  // Seed Comments
//   await Comment.create({
//     user_id: user1.id,
//     post_id: post2.id,
//     content: 'I heard NYU has a great program!',
//   });

//   await Comment.create({
//     user_id: user2.id,
//     post_id: post1.id,
//     content: 'Codecademy and FreeCodeCamp are good starting points.',
//   });
};

