// /server/db/models/Comment.js
const knex = require('../db/knex');

class Comment {
    constructor({ id, user_id, post_id, content, created_at, updated_at , username}) {
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.username = username

    }

    // Fetches all comments
    static async list() {
        const query = `
            SELECT comments.*, users.username
            FROM comments
            JOIN users ON comments.user_id = users.id
        `;
        const result = await knex.raw(query);
        return result.rows.map((rawCommentData) => new Comment(rawCommentData));
    }
    

    // Fetches a single comment by its ID
    static async find(id) {
        const query = `SELECT * FROM comments WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawCommentData = result.rows[0];
        return rawCommentData ? new Comment(rawCommentData) : null;
    }

    // Fetches all comments for a given post
// Fetches all comments for a given post, including usernames
static async findByPostId(post_id) {
    const query = `
        SELECT comments.*, users.username
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE post_id = ?
    `;
    const result = await knex.raw(query, [post_id]);
    return result.rows.map((rawCommentData) => new Comment(rawCommentData));
}

    // Creates a new comment
    static async create(user_id, post_id, content) {
        const query = `
            INSERT INTO comments (user_id, post_id, content)
            VALUES (?, ?, ?) 
            RETURNING *
        `;
        const result = await knex.raw(query, [user_id, post_id, content]);
        const rawCommentData = result.rows[0];
        return new Comment(rawCommentData);
    }

    // Updates an existing comment's content
    static async update(id, content) {
        const query = `
            UPDATE comments
            SET content = ?, updated_at = NOW()
            WHERE id = ?
            RETURNING *
        `;
        const result = await knex.raw(query, [content, id]);
        const rawUpdatedComment = result.rows[0];
        return rawUpdatedComment ? new Comment(rawUpdatedComment) : null;
    }

    // Deletes a specific comment by its ID
    static async delete(id) {
        const query = `DELETE FROM comments WHERE id = ? RETURNING *`;
        const result = await knex.raw(query, [id]);
        return result.rowCount > 0;
    }

    // Deletes all comments
    static async deleteAll() {
        return knex('comments').del();
    }
}

module.exports = Comment;
