// /server/db/models/CommunityPost.js
const knex = require('../db/knex');

class CommunityPost {
    constructor({ id, user_id, fields_id, title, content }) {
        this.id = id;
        this.user_id = user_id;
        this.fields_id = fields_id;
        this.title = title;
        this.content = content;
    }

    static async list() {
        const query = `SELECT * FROM community_posts`;
        const result = await knex.raw(query);
        return result.rows.map((rawPostData) => new CommunityPost(rawPostData));
    }

    static async find(id) {
        const query = `SELECT * FROM community_posts WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawPostData = result.rows[0];
        return rawPostData ? new CommunityPost(rawPostData) : null;
    }

    static async create(user_id, fields_id, title, content) {
        const query = `INSERT INTO community_posts (user_id, fields_id, title, content) VALUES (?, ?, ?, ?) RETURNING *`;
        const result = await knex.raw(query, [user_id, fields_id, title, content]);
        const rawPostData = result.rows[0];
        return new CommunityPost(rawPostData);
    }

    static async update(id, user_id, fields_id, title, content) {
        const query = `
          UPDATE community_posts
          SET user_id=?, fields_id=?, title=?, content=?
          WHERE id=?
          RETURNING *
        `;
        const result = await knex.raw(query, [user_id, fields_id, title, content, id]);
        const rawUpdatedPost = result.rows[0];
        return rawUpdatedPost ? new CommunityPost(rawUpdatedPost) : null;
    }

    static async deleteAll() {
        return knex('community_posts').del();
    }
}

module.exports = CommunityPost;
