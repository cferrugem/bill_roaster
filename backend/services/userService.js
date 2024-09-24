const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  // Get all users
  getAllUsers: async () => {
    return await userModel.getAllUsers();
  },

  // Get user by ID
  getUserById: async (id) => {
    return await userModel.getUserById(id);
  },

  // Create new user
  createUser: async (username, password) => {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userModel.createUser(username, hashedPassword);
  },

  // Update user
  updateUser: async (id, data) => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await userModel.updateUser(id, data);
  },

  // Soft delete user
  deleteUser: async (id) => {
    return await userModel.deleteUser(id);
  },
};
