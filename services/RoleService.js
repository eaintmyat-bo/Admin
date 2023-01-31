const RoleModel = require("../models/Role");

exports.getAllRoles = async () => {
  return await RoleModel.find();
};
