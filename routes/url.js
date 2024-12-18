const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.get("/index", (req, res) => {
  console.log("rendering index page");

  res.render("layout", {
    body: "index",
    stylesheet: "index.css",
    title: "home page",
  });
});

router.get("/analytics", (req, res) => {
  console.log("rendering analytics file");
  res.render("layout", {
    body: "analytics",
    title: "analytics",
    stylesheet: "analytics.css",
  });
});

router.get("/signUp", (req, res) => {
  console.log("signup page");
  res.render("layout", {
    body: "signUp",
    title: "sign up page",
    stylesheet: "signUp.css",
  });
});

router.get("/signIn", (req, res) => {
  console.log("signIn page");
  res.render("layout", {
    body: "signIn",
    title: "sign in page",
    stylesheet: "signUp.css",
  });
});
router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleGetShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
