const userService = require("../services/UserService");

/**
 * @return {array} of user objects.
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @param  {Object} user - User object to create
 * @return {Object} user object created and status.
 */
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @param  {string} userId - User Id to retrieve the object
 * @return {Object} user object retrieved and status.
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @param  {Object} user - User details to update
 * @return {Object} user object updated and status.
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @param  {string} userId - User Id to delete the object
 * @return {Object} user object deleted and status.
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
