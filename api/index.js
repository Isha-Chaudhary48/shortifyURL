const app = require("../index"); // Adjust path if necessary

module.exports = (req, res) => {
  app(req, res); // Pass requests to the Express app
};
