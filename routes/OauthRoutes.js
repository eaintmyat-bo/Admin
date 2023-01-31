const express = require("express");
const router = express.Router();

const verifySignUp = require("../middlewares/verifySignUp");

const { signup, signin } = require("../services/OauthService");

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

router.post("/signin", signin);

module.exports = router;
