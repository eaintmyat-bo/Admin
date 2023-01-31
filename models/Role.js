const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: String, //admin, user
});

module.exports = mongoose.model("Role", roleSchema);
