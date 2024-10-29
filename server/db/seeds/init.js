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
    { fields_category: 'Technology', description: "In a tech-driven society, the tech industry stands out for its creativity and innovation. With opportunities for high salaries, flexible work arrangements, and a commitment to diversity, it's an exciting field for those who thrive on continuous learning. If you’re seeking a fulfilling career that offers a healthy work-life balance, check out our curated list of programs below!" },
    { fields_category: 'Bussiness', description: "In a capitalist economy, business plays a vital role. Whether you’re interested in management, consulting, or marketing, the industry offers a range of opportunities. While it may not be as fast-paced as some fields, there is a diverse list of roles to explore. If you prefer a structured environment and a typical 9-to-5 schedule, consider looking at the programs below!" },
    { fields_category: 'Healthcare', description: "Taking care of our health is crucial, and we all experience illness at various stages of life. The healthcare field is a stable industry that is always on demand that has a variety of job opportunities. With diverse roles available, you’ll always find something new and engaging. If you’re passionate about helping others, value job security, and enjoy variety in your work, check out the programs below!" },
    { fields_category: 'Trades Training', description: "Blue-collar jobs play a vital role in our society, and skilled trades are always in demand, whether in HVAC, plumbing, gardening, or other fields. If you enjoy working with your hands and thrive on solving practical challenges, this might be the perfect path for you. Check out the programs below to find the right fit for your skills and interests!" },

  ]).returning('*');

  // Create users and get their IDs
  const user1 = await User.create('john_doe', '1234', 'john.doe@example.com', 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');
  const user2 = await User.create('jane_doe', '4567', 'jane.doe@example.com', 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');
  const user3 = await User.create('cool_cat', '1234', 'cool.cat@example.com', 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60');

  // Assuming User.create returns an object with the 'id', you can access it like this:
  const users = [user1, user2, user3];

  // Insert programs
  const programs = await knex('programs').insert([
    {
      fields_id: careerFields[0].id, name: 'The Marcy Lab School', cost: 0, url: 'https://www.marcylabschool.org/', description: 'Learn full-stack development.', location: 'New York',
      image: 'https://www.marcylabschool.org/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F5tpkas7gb5io%2F4jXk6I0OfjAJNYxGL7VpeI%2F0c885a5f54e37aa58a7bfdfe351b7583%2Fbreakthrough-fellows.webp&w=3840&q=75',
      map_link: "https://www.google.com/maps/place/The+Marcy+Lab+School/@40.6576598,-74.0046992,15z/data=!4m6!3m5!1s0x89c25bb184c6a46f:0x7a66056656d02af8!8m2!3d40.6576598!4d-74.0046992!16s%2Fg%2F11j64sspbv?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D",
      program_summary: "The Marcy Lab School is a year-long college alternative combining traditional education's best elements and a boot camp experience.It offers two tuition- free programs: Software Engineering and Data Analysis, with no prior technical knowledge required.In addition to building technical skills, the program focuses on developing leadership abilities and providing coaching and mentoring to support your growth.",
      requirements: "Have no bachlors degree or higher, Not enrolled in a traditional college program, Ages 18-24, Can legally work in the U.S"
    },
    {
      fields_id: careerFields[0].id, name: 'Npower', cost: 0, url: 'https://www.npower.org/?gad_source=1&gclid=Cj0KCQjw05i4BhDiARIsAB_2wfCOYXde89K2vB8uYnFcJKjF1UGP81Hsq6oqN0NWbaYwNJWHR5qeDxMaAvs5EALw_wcB', description: 'Software Engineer program for women, Tech fundamentals, Cybersecurity, & Cloud computing ', location: 'New York',
      image: 'https://www.texasmutual.com/assets/images/nonprofitstories-npower.jpg',
      map_link: "https://www.google.com/maps/place/NPower+Headquarters/@40.7026365,-73.9942768,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25b6b1ae92d47:0xa1550fd497ef6b2!8m2!3d40.7026366!4d-73.9894059!16s%2Fg%2F1vj603kf?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D",
      program_summary: "NPower is a nonprofit dedicated to creating pathways to economic freedom for women from under-resourced communities, military-connected individuals, and young adults. They aim to empower these groups with the skills and opportunities in tech. While NPower primarily focuses on cybersecurity training, they also offer courses in web development and cloud computing, enabling participants to build successful careers in technology."
    },
    {
      fields_id: careerFields[0].id, name: 'LaunchCode', cost: 0, url: 'https://www.launchcode.org/education', description: 'Software Engineer, Data Analyst, Database Engineer & Salesforce ', location: 'New York',
      image: 'https://www.launchcode.org/assets/og-default-image-254a27700bce39b831cfc829e9849d300afe0e43aa6678894976d5214380afa4.jpg',
      map_link: "https://www.google.com/maps/place/LaunchCode/@38.6516256,-90.2620888,17z/data=!3m1!4b1!4m6!3m5!1s0x87d8b4d4dfb1118d:0x46ba750d4f6e9fe1!8m2!3d38.6516256!4d-90.2595139!16s%2Fg%2F11bz07y4bw?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
      program_summary: "LaunchCode is a free tech training and job placement program, you can take their courses and participate in apprenticeship programs at absolutely no cost—even after you land a job! Instead, they earn revenue from employers when they successfully place individuals in apprenticeships or jobs. LaunchCode offers both part-time and full-time courses across a variety of subjects, including web development (with options in Java and C#), data analysis, SQL server and database management, and Salesforce.",
    },
    {
      fields_id: careerFields[0].id, name: 'Fullstack Academy ', cost: 0, url: 'https://www.fullstackacademy.com/programs/wdf-data', description: 'Data Analysis program.', location: 'New York',
      image: 'https://aplnexted.com/wp-content/uploads/2021/04/FullStack-Logo.jpeg',
      map_link: "https://www.google.com/maps/place/Fullstack+Academy/@40.6832508,-73.9951849,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25a163bf6a675:0x1f79c3d76948280f!8m2!3d40.6832508!4d-73.99261!16s%2Fg%2F11bw5xqlv0?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
      program_summary: "Fullstack Academy is a live online tech boot camp that offers a range of programs, including part-time and full-time software engineering boot camps, an online coding boot camp, an AI and machine learning boot camp, a cybersecurity boot camp, and a data analysis boot camp. Offering affordable tuition and payment plans starting as low as $226 per month, it makes quality education accessible. One standout program is the no-cost, 18-week immersive Data Analysis Training Accelerator (DATA) boot camp, offered in partnership with NYC’s Tech Talent Pipeline, providing participants with training at no expense.",
    },
    {
      fields_id: careerFields[0].id, name: 'Code Squad', cost: 0, url: 'https://www.codesquad.org/students.html', description: 'Software Engineer/Developer program.', location: 'New York',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL9BbuDkIsDNI4PWXI23PBl6KsjBI3t84HlNRShoJHxmP7CcXXyy42pQgRdfa30QBaP2I&usqp=CAU',
      program_summary: "Code Squad is dedicated to empowering low-income adults, particularly individuals of color, to enhance diversity in the tech industry. This part-time remote boot camp offers comprehensive training in full-stack web development at no cost! Participants benefit from mentorship, coaching, and stipends, ensuring they have the support they need to succeed. ",
      requirements: "High school diploma or equivalent, Legally authorized"
    },
    {
      fields_id: careerFields[0].id, name: 'Per Scholas', cost: 0, url: 'https://perscholas.org/locations/new-york/', description: 'IT Support, Cybersecurity, Software Engineer & AWS', location: 'New York',
      image: 'https://perscholas.org/wp-content/uploads/2021/01/Screen-Shot-2021-01-14-at-9.18.37-AM-2000x825.png',
      map_link: "https://www.google.com/maps/search/Per+scholas/@40.6710202,-74.1124801,11.57z?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
      program_summary: "Per Scholas is a tuition-free tech training program committed to making education accessible and promoting economic equity. With multiple locations across the country, it offers a diverse range of remote and in-person classes. The course offerings include cybersecurity, IT support, tech fundamentals, software engineering, and much more, all designed to help individuals thrive in the tech industry.",
      requirements: "At least 18 years of age, High School diploma or equivalent ,Authorized to work in the U.S",
    },


    { fields_id: careerFields[1].id, name: 'Strayer University', cost: 0, url: 'https://degrees.strayer.edu/business/ ', description: 'Marketing, Management, Accounting', location: 'New York', image: 'https://example.com/image2.png' },
    {
      fields_id: careerFields[1].id, name: 'Coursera ', cost: 0, url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce', description: 'Marketing,E-commerce', location: 'New York',
      image: 'https://infostride.com/wp-content/uploads/2024/06/Thumbnail_508fa1-1200x717.png',
      program_summary: "Coursera is an online platform that offers a wide range of courses designed to advance your career. Partnering with universities and organizations like Google and ADP, Coursera provides certificates that enhance your professional credentials. Among their many business-related courses are the Business Analysis Professional Certificate, Digital Marketing & E-Commerce, and so much more.",
    },
    {
      fields_id: careerFields[1].id, name: 'Year Up United  ', cost: 0, url: 'https://www.yearup.org/job-training/banking', description: 'Banking, Business Operations, Marketing, E-commerce', location: 'New York',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_mtFMmzDKYtneML9prHYDZoKy6WmxpEIDQ&s',
      map_link: "https://www.google.com/maps/place/Year+Up+United+New+York+%7C+New+Jersey+-+Wall+Street+Campus/@40.7019622,-74.2380662,11z/data=!3m1!5s0x89c25a174aa64c53:0xd6435061be6328a3!4m10!1m2!2m1!1syear+up+united!3m6!1s0x89c25bb4a7eb2f35:0x19740abd199309be!8m2!3d40.703984!4d-74.011186!15sCg55ZWFyIHVwIHVuaXRlZCIDiAEBkgEXZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb27gAQA!16s%2Fg%2F1wrtds7c?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
      program_summary: "Year Up United is a transformative program that creates career pathways for young adults. Believing in the potential of this demographic, the program emphasizes the importance of providing opportunities to foster growth and development. Year Up United offers three key categories of courses: Banking & Customer Success, Business Operations, and Financial Operations.",
      requirements: "18-29 years old, High school graduate or GED,Low to moderate income, U.S.citizenship, permanent resident, DACA recipient, or employment authorization card, Live within commuting distance of a Year Up United location."
    },

    {
      fields_id: careerFields[2].id, name: 'Job Corps', cost: 0, url: 'https://info.joinjobcorps.com/trade', description: 'Medical Assistant, Medical Administrative Assistant, EMT, Nurse Assistant, Dental Assistant', location: 'New York',
      image: 'https://nmwcc.com/wp-content/uploads/2022/08/job-corps-Log-300x168.jpg',
      map_link: "https://www.google.com/maps/search/Job+Corps/@40.6781055,-73.9831327,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D",
      program_summary: "Job Corps is a free program operated by the U.S. Department of Labor, providing a diverse range of career opportunities across its nationwide campuses. Participants benefit from free housing, meals, basic medical care, and a living allowance. Among the healthcare careers available are Medical Assistant, Medical Administrative Assistant, EMT, Nurse Assistant, and Dental Assistant.",
      requirements: "Ages 18- 24, Low income individuals, Be a citizen, resident or have DACA",
    },
    { fields_id: careerFields[2].id, name: 'Phillip Houses ', cost: 0, url: 'https://www.phippsny.org/programs/career-readiness/career-network/', description: 'PCT, CMA, & MAA', location: 'New York', image: 'https://www.phippsny.org/wp-content/themes/required-foundation/images/logo.png' },
    { fields_id: careerFields[2].id, name: 'Bronx eoc', cost: 0, url: 'http://www.bronxeoc.org/vocational.html#emt', description: 'Medical assitant & EMT', location: 'New York', image: 'https://sunyempire.edu/media/partnerships/images/Bronx-EOC-logo.jpg' },
    { fields_id: careerFields[2].id, name: 'Selfhelp', cost: 0, url: 'https://selfhelp.net/home-care-training/', description: 'HHA & PCA', location: 'New York', image: 'https://media.licdn.com/dms/image/v2/C4D1BAQGWVDgrN0cWLQ/company-background_10000/company-background_10000/0/1611072059495/selfhelp_community_services_cover?e=2147483647&v=beta&t=JU4Hz4Ydq47bhHLMCMb5uqRptovx5Bjmk6NS3kcsBTw' },
    { fields_id: careerFields[2].id, name: 'YM & YWAH Washignton Heights & Inwood', cost: 0, url: 'https://media.licdn.com/dms/image/v2/C4E0BAQGeWtYtSUChEQ/company-logo_200_200/company-logo_200_200/0/1630610743542/ym__ywha_of_washington_heights_and_inwood_logo?e=2147483647&v=beta&t=H4a532DebPLG99NjacDKbJ5jXnyR3CeJ26saL8B8moI' },
    { fields_id: careerFields[2].id, name: 'NYU Dentistry', cost: 0, url: 'https://pbs.twimg.com/profile_images/836338082186166272/jHNqYnDb_400x400.jpg' },

    { fields_id: careerFields[3].id, name: 'New York City Small Business Services ', cost: 0, url: 'https://www.nyc.gov/site/sbs/careers/industrial-training.page', description: 'Construction Site Safety HVAC Eco-friendly Energy Installation, Stipend included ', location: 'New York', image: 'https://d5xydlzdo08s0.cloudfront.net/media/celebrities/16017/sbslogo_300x300__L.jpg' },
    { fields_id: careerFields[3].id, name: 'Genspace ', cost: 0, url: 'https://www.genspace.org/break-into-biotech-program', description: 'Life Science Skills Training program, Stipend included', location: 'New York', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYsU4a_r0eoUX_sLhy2NpYc5zgXW2tc_0SFQ&s' },
    { fields_id: careerFields[3].id, name: 'YouthBuild IGNITE', cost: 0, url: 'https://www.cypresshills.org/career-education', description: 'GED Prep Construction training Healthcare Training,Stipend included ', location: 'New York', image: 'https://events.amny.com/wp-content/uploads/2024/10/3_c5f813.png?w=500' },


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