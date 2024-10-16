// controllers.js
const Posts = require('../models/Posts');

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.list();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching posts', error });
    }
};

// Get a single post by ID
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.find(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching the post', error });
    }
};

// Create a new post
const createPost = async (req, res) => {
    const { user_id, fields_id, title, content } = req.body;
    try {
        const newPost = await Posts.create(user_id, fields_id, title, content);
        res.status(200).json(newPost);
    } catch (error) {
        res.status(404).json({ message: 'Error creating the post', error });
    }
};

// Update an existing post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { user_id, fields_id, title, content } = req.body;
    try {
        const updatedPost = await Posts.update(id, user_id, fields_id, title, content);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: 'Error updating the post', error });
    }
};

// Delete all posts
const deleteAllPosts = async (req, res) => {
    try {
        await Posts.deleteAll();
        res.status(200).send();
    } catch (error) {
        res.status(404).json({ message: 'Error deleting posts', error });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deleteAllPosts,
};
