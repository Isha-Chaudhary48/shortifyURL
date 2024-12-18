const URL = require("../models/url");
const shortUrl = require("shortid");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(404).json({ error: "url is required" });
  }
  const shortID = shortUrl.generate();
  console.log(shortID);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
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
