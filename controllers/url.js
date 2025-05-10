const URL = require("../models/url");
const shortUrl = require("shortid");

async function handleGenerateNewShortUrl({ url }) {
  if (!url) {
    console.log("URL Required");
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

  const entry = await URL.findOne({ shortId });

  if (!entry) {
    return res.status(404).send("Short ID doesn't exist. Please recheck!");
  }

  // Log the visit timestamp
  entry.visitHistory.push({ timestamp: Date.now() });
  await entry.save();

  // Redirect to the original URL
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
