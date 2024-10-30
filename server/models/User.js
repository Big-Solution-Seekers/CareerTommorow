const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class User {
  #passwordHash = null; // a private property

  constructor({ id, username, password_hash, email, profile_image }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.profileImage = profile_image;
    this.#passwordHash = password_hash;
  }

  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );

  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  static async create(username, password, email, profile_image) {
    const passwordHash = await authUtils.hashPassword(password);
    const query = `INSERT INTO users (username, password_hash, email, profile_image)
      VALUES (?, ?, ?, ?) RETURNING *`;
    const result = await knex.raw(query, [username, passwordHash, email, profile_image]);
    const rawUserData = result.rows[0];
    return new User(rawUserData);
  }

  static async updateUserInfo(id, username, email, password) {
    const passwordHash = await authUtils.hashPassword(password);
    const query = `
      UPDATE users
      SET username = ?, email = ?,  password_hash = ?
      WHERE id = ?
      RETURNING id, username, email, password_hash
    `;
    const result = await knex.raw(query, [username, email, passwordHash, id]);
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async deleteAll() {
    return knex('users').del();
  }
}

module.exports = User;

