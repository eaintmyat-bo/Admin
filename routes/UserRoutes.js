const express = require("express");
const authJwt = require("../middlewares/authJwt");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/UserService.js");

const router = express.Router();

router.route("/").get(getAllUsers);

router.get("/:id", [authJwt.verifyToken], async (req, res) => {
  try {
    let user = await getUserById(req.params.id);
    res.json({ status: "sucess", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", [authJwt.verifyToken], async (req, res) => {
  try {
    let user = await deleteUser(req.params.id);
    res.json({ status: "sucess", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", [authJwt.verifyToken], async (req, res) => {
  try {
    let user = await updateUser(req.params.id, req.body);
    res.json({ status: "sucess", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
