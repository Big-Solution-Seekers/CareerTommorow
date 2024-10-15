// /server/db/models/CommunityPost.js
const knex = require('../db/knex');

class Posts {
    constructor({ id, user_id, fields_id, title, content }) {
        this.id = id;
        this.user_id = user_id;
        this.fields_id = fields_id;
        this.title = title;
        this.content = content;
    }

    static async list() {
        const query = `SELECT * FROM posts`;
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

    static async update(id, user_id, fields_id, title, content) {
        const query = `
          UPDATE posts
          SET user_id=?, fields_id=?, title=?, content=?
          WHERE id=?
          RETURNING *
        `;
        const result = await knex.raw(query, [user_id, fields_id, title, content, id]);
        const rawUpdatedPost = result.rows[0];
        return rawUpdatedPost ? new Posts(rawUpdatedPost) : null;
    }

    static async deleteAll() {
        return knex('posts').del();
    }
}

module.exports = Posts;
