const express = require("express");
const router = express.Router();

const verifySignUp = require("../middlewares/verifySignUp");

const { signup, signin } = require("../services/OauthService");

/*
  for new user signup and to create new user
  have middlewares to validate duplicates or roles
  returns successful message upon registration
*/
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

/*
  to sign in using existing credentials
  returns user particulars with accesstoken
*/
router.post("/signin", signin);

module.exports = router;
