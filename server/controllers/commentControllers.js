// controllers.js
const Comment = require('../models/Comment');

// Get all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.list();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.find(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the comment', error });
    }
};

// Get all comments for a specific post
const getCommentsByPostId = async (req, res) => {
    const { post_id } = req.params;
    try {
        const comments = await Comment.findByPostId(post_id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments for the post', error });
    }
};

// Create a new comment
const createComment = async (req, res) => {
    const { user_id, post_id, content } = req.body;
    try {
        const newComment = await Comment.create(user_id, post_id, content);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating the comment', error });
    }
};

// Update an existing comment
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = await Comment.update(id, content);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating the comment', error });
    }
};

// Delete a specific comment
const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Comment.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the comment', error });
    }
};

// Delete all comments
const deleteAllComments = async (req, res) => {
    try {
        await Comment.deleteAll();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting all comments', error });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment,
    deleteAllComments,
};
