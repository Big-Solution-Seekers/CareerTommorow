// /server/db/models/UserProfile.js
const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class UserProfile {
    #passwordHash = null;

    constructor({ id, username, password_hash }) {
        this.id = id;
        this.username = username;
        this.#passwordHash = password_hash;
    }

    isValidPassword = async (password) => (
        authUtils.isValidPassword(password, this.#passwordHash)
    );

    static async list() {
        const query = `SELECT * FROM user_profiles`;
        const result = await knex.raw(query);
        return result.rows.map((rawUserData) => new UserProfile(rawUserData));
    }

    static async find(id) {
        const query = `SELECT * FROM user_profiles WHERE id = ?`;
        const result = await knex.raw(query, [id]);
        const rawUserData = result.rows[0];
        return rawUserData ? new UserProfile(rawUserData) : null;
    }

    static async create(username, password) {
        const passwordHash = await authUtils.hashPassword(password);
        const query = `INSERT INTO user_profiles (username, password_hash) VALUES (?, ?) RETURNING *`;
        const result = await knex.raw(query, [username, passwordHash]);
        const rawUserData = result.rows[0];
        return new UserProfile(rawUserData);
    }

    static async update(id, username) {
        const query = `
          UPDATE user_profiles
          SET username=?
          WHERE id=?
          RETURNING *
        `;
        const result = await knex.raw(query, [username, id]);
        const rawUpdatedUser = result.rows[0];
        return rawUpdatedUser ? new UserProfile(rawUpdatedUser) : null;
    }

    static async deleteAll() {
        return knex('user_profiles').del();
    }
}

module.exports = UserProfile;
