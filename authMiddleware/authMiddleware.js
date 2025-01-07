const jwt = require("jsonwebtoken");

function middleware(req, res, next) {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.redirect("/signIn");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    console.log("invalid token", error);
    res.clearCookie("auth_token");
    return res.redirect("/sighIn");
  }
}

module.exports = { middleware };
