const express = require("express");
const router = express.Router();

const verifySignUp = require("../middlewares/verifySignUp");

const { signup, signin } = require("../services/OauthService");

//this api is for new user signup and to create new user
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

router.post("/signin", signin);

module.exports = router;
