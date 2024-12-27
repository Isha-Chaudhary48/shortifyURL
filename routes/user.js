const express = require("express");
const router = express.Router();
const { handleSignIn, handleSignUp } = require("../controllers/user");

router.post("/signUp", handleSignUp);
router.post("/signIn", handleSignIn);

module.exports = router;
