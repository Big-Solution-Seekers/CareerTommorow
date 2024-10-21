// /server/db/models/CommunityPost.js
const knex = require('../db/knex');

class Programs{
    constructor({ id, fields_id, name, cost, url, description, location, image}) {
        this.id = id;
        this.fields_id = fields_id
        this.name = name
        this.cost = cost
        this.url = url
        this.description = description
        this.location = location
        this.image = image
    }

    static async list() {
        const query = `SELECT * FROM programs`;
        const result = await knex.raw(query);
        return result.rows.map((rawPostData) => new Programs(rawPostData));
    }

    static async find(id) {
        const query = `SELECT * FROM programs WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawPostData = result.rows[0];
        return rawPostData ? new Programs(rawPostData) : null;
    }

}

module.exports = Programs;