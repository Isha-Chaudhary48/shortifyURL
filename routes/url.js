const express = require("express");
const URL = require("../models/url");
const router = express.Router();
const QrCode = require("qrcode");
const { middleware } = require("../authMiddleware/authMiddleware");

const {
  handleGenerateNewShortUrl,
  handleGetShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

router.get("/", (req, res) => {
  console.log("rendering index page");

  res.render("layout", {
    body: "index",
    stylesheet: "index.css",
    title: "home page",
    shortId: "",
    serverUri: "",
    totalClicks: "",
    visitHistory: "",
    redirectURL: "",
    msg: "",
  });
});

router.get("/analytics", (req, res) => {
  console.log("rendering analytics file");
  res.render("layout", {
    body: "analytics",
    title: "analytics",
    stylesheet: "analytics.css",
    shortId: "",
    serverUri: "",
    totalClicks: "",
    visitHistory: "",
    redirectURL: "",
    msg: "",
  });
});

router.get("/signUp", (req, res) => {
  console.log("signup page");
  res.render("layout", {
    body: "signUp",
    title: "sign up page",
    stylesheet: "signUp.css",
    shortId: "",
    serverUri: "",
    totalClicks: "",
    visitHistory: "",
    redirectURL: "",
    msg: "",
  });
});

router.get("/signIn", (req, res) => {
  console.log("signIn page");
  res.render("layout", {
    body: "signIn",
    title: "sign in page",
    stylesheet: "signUp.css",
    shortId: "",
    serverUri: "",
    visitHistory: "",
    totalClicks: "",
    redirectURL: "",
    msg: "",
  });
});

router.get("/qrGenerator", (req, res) => {
  res.render("layout", {
    body: "qrGenerator",
    title: "qrGenerator",
    stylesheet: "qrGenerator.css",
    qrcodeUrl: "",
    qrUrl: "",

    msg: "",
  });
});

router.get("/imageCompressor", (req, res) => {
  res.render("layout", {
    body: "imageCompressor",
    title: "imageCompressor",
    stylesheet: "imageCompressor.css",

    msg: "",
  });
});

router.post("/generate", middleware, async (req, res) => {
  try {
    const serverUri = process.env.SERVER_URI;
    const { url } = req.body;

    console.log(url);
    if (!url) {
      return res.render("layout", {
        body: "index",
        stylesheet: "index.css",
        title: "home page",
        shortId: "",
        serverUri,
        totalClicks: "",
        visitHistory: "",
        redirectURL: "",
        msg: "Url required",
      });
    }

    const exists = await URL.findOne({ url });
    if (exists) {
      return res.render("layout", {
        body: "index",
        stylesheet: "index.css",
        title: "home page",
        shortId: exists.shortId,
        serverUri,
        totalClicks: exists.visitHistory.length,
        visitHistory: exists.visitHistory,
        redirectURL: exists.redirectURL,
        msg: "",
      });
    }

    const newShortUrl = await handleGenerateNewShortUrl({ url });
    return res.render("layout", {
      body: "index",
      stylesheet: "index.css",
      title: "home page",
      shortId: newShortUrl.shortId,
      serverUri,
      totalClicks: newShortUrl.visitHistory.length,
      visitHistory: newShortUrl.visitHistory,
      redirectURL: newShortUrl.redirectURL,
      msg: "",
    });
  } catch (error) {
    console.log("error occured", error);
  }
});

router.post("/data", middleware, async (req, res) => {
  try {
    const serverUri = process.env.SERVER_URI;

    const { shortId } = req.body;
    if (!shortId) {
      return res.render("layout", {
        body: "analytics",
        stylesheet: "analytics.css",
        title: "analytics",
        shortId: "",
        serverUri,
        totalClicks: "",
        visitHistory: "",
        redirectURL: "",
        msg: "Short Id required",
      });
    }
    const exists = await URL.findOne({ shortId });
    if (exists) {
      return res.render("layout", {
        body: "analytics",
        stylesheet: "analytics.css",
        title: "analytics",
        shortId: exists.shortId,
        serverUri,
        totalClicks: exists.visitHistory.length,
        visitHistory: exists.visitHistory,
        redirectURL: exists.redirectURL,
        msg: "",
      });
    } else {
      return res.render("layout", {
        body: "analytics",
        stylesheet: "analytics.css",
        title: "analytics",
        shortId: "",
        serverUri,
        totalClicks: "",
        visitHistory: "",
        redirectURL: "",
        msg: "Short ID doesn't exist. Please recheck!",
      });
    }
  } catch (error) {
    console.log("Error found in fetching analytics");
  }
});
router.post("/qrCode", middleware, async (req, res) => {
  try {
    const { qrUrl } = req.body;
    if (!qrUrl) {
      if (!qrUrl) {
        return res.render("layout", {
          body: "qrGenerator",
          stylesheet: "qrGenerator.css",
          title: "QR Generator",
          qrcodeUrl: "",
          qrUrl: "",
          msg: " please Enter URL",
        });
      }
    }
    const qrcodeUrl = await QrCode.toDataURL(qrUrl);

    return res.render("layout", {
      body: "qrGenerator",
      stylesheet: "qrGenerator.css",
      title: "qrGenerator",
      qrcodeUrl: qrcodeUrl,
      qrUrl: qrUrl,

      msg: "",
    });
  } catch (error) {
    console.log("Error in found url in qrcode section", error);
    return res.status(500).render("layout", {
      body: "qrGenerator",
      stylesheet: "qrGenerator.css",
      title: "QR Generator",
      qrcodeUrl: "",
      qrUrl: "",
      msg: "Failed to generate QR code. Please try again.",
    });
  }
});

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleGetShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
