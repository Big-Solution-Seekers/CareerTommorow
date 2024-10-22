// /server/db/models/Program.js
const knex = require('../db/knex');

class Program {
    constructor({ id, fields_id, name, cost, url, description, location, image }) {
        this.id = id;
        this.fields_id = fields_id;
        this.name = name;
        this.cost = cost;
        this.url = url;
        this.description = description;
        this.location = location;
        this.image = image;
    }

    static async list() {
        const query = `SELECT * FROM programs`;
        const result = await knex.raw(query);
        return result.rows.map((rawProgramData) => new Program(rawProgramData));
    }

    static async find(id) {
        const query = `SELECT * FROM programs WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawProgramData = result.rows[0];
        return rawProgramData ? new Program(rawProgramData) : null;
    }

    static async create(fields_id, name, cost, url, description, location, image) {
        const query = `INSERT INTO programs (fields_id, name, cost, url, description, location, image) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`;
        const result = await knex.raw(query, [fields_id, name, cost, url, description, location, image]);
        const rawProgramData = result.rows[0];
        return new Program(rawProgramData);
    }

    static async update(id, fields_id, name, cost, url, description, location, image) {
        const query = `
          UPDATE programs
          SET fields_id=?, name=?, cost=?, url=?, description=?, location=?, image=?
          WHERE id=?
          RETURNING *
        `;
        const result = await knex.raw(query, [fields_id, name, cost, url, description, location, image, id]);
        const rawUpdatedProgram = result.rows[0];
        return rawUpdatedProgram ? new Program(rawUpdatedProgram) : null;
    }

    static async deleteAll() {
        return knex('programs').del();
    }
}

module.exports = Program;
