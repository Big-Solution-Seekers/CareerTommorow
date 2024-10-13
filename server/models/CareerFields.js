// /server/db/models/CareerField.js
const knex = require('../db/knex');

class CareerField {
    constructor({ id, fields_category }) {
        this.id = id;
        this.fields_category = fields_category;
    }

    static async list() {
        const query = `SELECT * FROM career_fields`;
        const result = await knex.raw(query);
        return result.rows.map((rawCareerFieldData) => new CareerField(rawCareerFieldData));
    }

    static async find(id) {
        const query = `SELECT * FROM career_fields WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawCareerFieldData = result.rows[0];
        return rawCareerFieldData ? new CareerField(rawCareerFieldData) : null;
    }

    static async create(fields_category) {
        const query = `INSERT INTO career_fields (fields_category) VALUES (?) RETURNING *`;
        const result = await knex.raw(query, [fields_category]);
        const rawCareerFieldData = result.rows[0];
        return new CareerField(rawCareerFieldData);
    }

    static async update(id, fields_category) {
        const query = `
          UPDATE career_fields
          SET fields_category=?
          WHERE id=?
          RETURNING *
        `;
        const result = await knex.raw(query, [fields_category, id]);
        const rawUpdatedCareerField = result.rows[0];
        return rawUpdatedCareerField ? new CareerField(rawUpdatedCareerField) : null;
    }

    static async deleteAll() {
        return knex('career_fields').del();
    }
}

module.exports = CareerField;
