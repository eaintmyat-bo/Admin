const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  name: String,
  dob: Date,
  address: String,
  description: String,
  //created at will be default based on time of transaction
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
