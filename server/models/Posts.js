const knex = require('../db/knex');

class Posts {
    constructor({ id, user_id, fields_id, title, content, username, created_at}) {
        this.id = id;
        this.user_id = user_id;
        this.fields_id = fields_id;
        this.title = title;
        this.content = content;
        this.username = username;
        this.created_at = created_at;
    }

    static async list() {
        const query = `
            SELECT posts.*, users.username
            FROM posts
            JOIN users ON posts.user_id = users.id
        `;
        const result = await knex.raw(query);
        return result.rows.map((rawPostData) => new Posts(rawPostData));
    }

    static async find(id) {
        const query = `SELECT * FROM posts WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawPostData = result.rows[0];
        return rawPostData ? new Posts(rawPostData) : null;
    }

    static async create(user_id, fields_id, title, content) {
        const query = `INSERT INTO posts (user_id, fields_id, title, content) VALUES (?, ?, ?, ?) RETURNING *`;
        const result = await knex.raw(query, [user_id, fields_id, title, content]);
        const rawPostData = result.rows[0];
        return new Posts(rawPostData);
    }

    
    static async update(id, title, content) {
        const query = `
            UPDATE posts
            SET title = ?, content = ?
            WHERE id = ?
            RETURNING *`;
        const result = await knex.raw(query, [title, content, id]); // Ensure id is used in the WHERE clause
        const rawPostData = result.rows[0];
        return rawPostData ? new Posts(rawPostData) : null; // Return the updated post or null if not found
    }
    
    // New delete function
    static async delete(id) {
        const query = `DELETE FROM posts WHERE id = ? RETURNING *`;
        const result = await knex.raw(query, [id]);
        const deletedPostData = result.rows[0];
        return deletedPostData ? new Posts(deletedPostData) : null;
    }

    static async deleteAll() {
        return knex('posts').del();
    }
}

module.exports = Posts;
