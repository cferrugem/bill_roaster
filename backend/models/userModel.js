// models/userModel.js

const pool = require("../config/database");

module.exports = {
  // Obter todos os usuários
  getAllUsers: async () => {
    const query =
      "SELECT id, created_at, username FROM users WHERE deleted_at IS NULL";
    const { rows } = await pool.query(query);
    return rows;
  },

  // Obter usuário por ID
  getUserById: async (id) => {
    const query =
      "SELECT id, created_at, username FROM users WHERE id = $1 AND deleted_at IS NULL";
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Criar um novo usuário
  createUser: async (username, password) => {
    const query =
      "INSERT INTO users (username, password, created_at) VALUES ($1, $2, NOW()) RETURNING id";
    const values = [username, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Atualizar um usuário
  updateUser: async (id, data) => {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.username) {
      fields.push(`username = $${idx}`);
      values.push(data.username);
      idx++;
    }
    if (data.password) {
      fields.push(`password = $${idx}`);
      values.push(data.password);
      idx++;
    }
    if (fields.length === 0) return null;

    values.push(id);

    const query = `UPDATE users SET ${fields.join(
      ", "
    )} WHERE id = $${idx} AND deleted_at IS NULL`;
    const result = await pool.query(query, values);
    return result.rowCount > 0;
  },

  // Deletar um usuário
  deleteUser: async (id) => {
    const query =
      "UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
  },
};
