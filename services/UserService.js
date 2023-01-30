const UserModel = require("../models/User");

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.createUser = async (User) => {
  return await UserModel.create(User);
};

exports.updateUser = async (id, User) => {
  return await UserModel.findByIdAndUpdate(id, User);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
