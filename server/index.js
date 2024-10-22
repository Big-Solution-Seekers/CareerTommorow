///////////////////////////////
// Imports
///////////////////////////////

require('dotenv').config();
const path = require('path');
const express = require('express');

// middleware imports
const handleCookieSessions = require('./middleware/handleCookieSessions');
const logRoutes = require('./middleware/logRoutes');
const checkAuthentication = require('./middleware/checkAuthentication');

// controller imports
const authControllers = require('./controllers/authControllers');
const userControllers = require('./controllers/userControllers');
const postControllers = require('./controllers/postControllers'); // Import posts controllers
const commentControllers = require('./controllers/commentControllers'); // Import comments controllers
const fieldsControllers = require('./controllers/fieldsControllers')
const programsControllers = require('./controllers/programsControllers')
const app = express();

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

///////////////////////////////
// Auth Routes
///////////////////////////////

app.get('/api/me', authControllers.showMe);
app.post('/api/login', authControllers.loginUser);
app.delete('/api/logout', authControllers.logoutUser);

///////////////////////////////
// User Routes
///////////////////////////////

app.post('/api/users', userControllers.createUser);

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
app.get('/api/users', checkAuthentication, userControllers.listUsers);
app.get('/api/users/:id', checkAuthentication, userControllers.showUser);
app.patch('/api/users/:id', checkAuthentication, userControllers.updateUser);

///////////////////////////////
// Posts Routes
///////////////////////////////

app.get('/api/posts', postControllers.getAllPosts);
app.get('/api/posts/:id', postControllers.getPostById);
app.post('/api/posts', checkAuthentication, postControllers.createPost);
app.patch('/api/posts/:id', checkAuthentication, postControllers.updatePost);
app.delete('/api/posts', checkAuthentication, postControllers.deleteAllPosts);
app.delete('/api/posts/:id', checkAuthentication, postControllers.deletePost);

///////////////////////////////
// Comments Routes
///////////////////////////////

app.get('/api/comments', commentControllers.getAllComments);
app.get('/api/comments/:id', commentControllers.getCommentById);
app.get('/api/posts/:post_id/comments', commentControllers.getCommentsByPostId);
app.post('/api/comments', checkAuthentication, commentControllers.createComment);
app.patch('/api/comments/:id', checkAuthentication, commentControllers.updateComment);
app.delete('/api/comments/:id', checkAuthentication, commentControllers.deleteComment);
app.delete('/api/comments', checkAuthentication, commentControllers.deleteAllComments);



///////////////////////////////
// Fields route
///////////////////////////////
app.get('/api/fields', fieldsControllers.listFields);
app.get('/api/fields/:id', fieldsControllers.findField);



app.get('/api/programs', programsControllers.listPrograms);
app.get('/api/programs/:id', programsControllers.findProgram);
///////////////////////////////
// Fallback Route
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
