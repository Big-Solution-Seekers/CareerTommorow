// /server/db/models/CommunityPost.js
const knex = require('../db/knex');

class Fields{
    constructor({ id, fields_category, description}) {
        this.id = id;
        this.category = fields_category
        this.description = description
    }

    static async list() {
        const query = `SELECT * FROM fields`;
        const result = await knex.raw(query);
        return result.rows.map((rawPostData) => new Fields(rawPostData));
    }

    static async find(id) {
        const query = `SELECT * FROM fields WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawPostData = result.rows[0];
        return rawPostData ? new Fields(rawPostData) : null;
    }

}

module.exports = Fields;
