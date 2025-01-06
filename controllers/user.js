const USER = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

async function handleSignUp(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name || !password || !email) {
      return res.render("layout", {
        body: "signUp",
        stylesheet: "signUp.css",
        title: "signUp",
        msg: "All fields required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.render("layout", {
        body: "signUp",
        stylesheet: "signUp.css",
        title: "signUp",
        msg: "Invalid email format",
      });
    }

    if (password.length < 8) {
      return res.render("layout", {
        body: "signUp",
        stylesheet: "signUp.css",
        title: "signUp",
        msg: "Password must be at least 8 characters long",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const exists = await USER.findOne({ email });
    if (exists) {
      return res.render("layout", {
        body: "signUp",
        stylesheet: "signUp.css",
        title: "signUp",
        msg: "User already exists. Please log in",
      });
    }

    const newUser = new USER({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.render("layout", {
      body: "signIn",
      stylesheet: "signUp.css",
      title: "signIn",
      msg: "Sign up successfully please log in.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.render("layout", {
      body: "signUp",
      stylesheet: "signUp.css",
      title: "signUp",
      msg: "An unexpected error occurred. Please try again later.",
    });
  }
}

async function handleSignIn(req, res) {
  const { password, email } = req.body;

  try {
    if (!password || !email) {
      return res.render("layout", {
        body: "signIn",
        stylesheet: "signUp.css",
        title: "signIn",
        msg: "Invalid  username or password",
      });
    }

    const exists = await USER.findOne({ email });
    if (!exists) {
      return res.render("layout", {
        body: "signIn",
        stylesheet: "signUp.css",
        title: "signIn",
        msg: "User with this email need to sign up first",
      });
    }

    const isMatch = await bcrypt.compare(password, exists.password);
    if (!isMatch) {
      return res.render("layout", {
        body: "signIn",
        stylesheet: "signUp.css",
        title: "signIn",
        msg: "Invalid Username or Password",
      });
    }

    const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, { httpOnly: true, secure: true });

    return res.redirect("/");
  } catch (error) {
    console.error("Error occurred:", error);
    res.render("layout", {
      body: "signUp",
      stylesheet: "signUp.css",
      title: "signUp",
      msg: "An unexpected error occurred.. Please try again later.",
    });
    console.log("message", msg);
  }
}

module.exports = { handleSignIn, handleSignUp };
