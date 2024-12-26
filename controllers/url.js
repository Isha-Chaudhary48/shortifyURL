const URL = require("../models/url");
const shortUrl = require("shortid");

async function handleGenerateNewShortUrl({ url }) {
  if (!url) {
    throw new Error("url required");
  }
  const exists = await URL.findOne({ redirectURL: url });
  if (exists) {
    return exists;
  }
  const shortID = shortUrl.generate();
  console.log(shortID);
  const newUrl = await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
  });
  return newUrl;
}

async function handleGetShortUrl(req, res) {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },

    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("URL not found");
  }
  return res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  const analytics = Array.isArray(result.visitHistory)
    ? result.visitHistory
    : [];

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetShortUrl,
  handleGetAnalytics,
};
