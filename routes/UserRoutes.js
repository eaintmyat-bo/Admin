const express = require("express");
const authJwt = require("../middlewares/authJwt");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/UserService.js");

const router = express.Router();

//only allows admin to retrieve all users
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], async (req, res) => {
  try {
    let users = await getAllUsers();
    res.json({ status: "sucess", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", [authJwt.verifyToken], async (req, res) => {
  try {
    let user = await getUserById(req.params.id);
    res.json({ status: "sucess", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", [authJwt.verifyToken], async (req, res) => {
  try {
    let user = await deleteUser(req.params.id);
    res.json({ status: "sucess", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", [authJwt.verifyToken], async (req, res) => {
  try {
    let user = await updateUser(req.params.id, req.body);
    res.json({ status: "sucess", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
