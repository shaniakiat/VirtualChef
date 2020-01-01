const config = require("config");
const jwt = require("jsonwebtoken");

//get the token taht is sent from react, send along a token
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  try {
    //check for token
    if (!token) {
      res.status(401).json({ msg: "no token, authorization denied" });
    }
    //if there is a token, need to vertify
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //Add user from payload
    req.user = decoded;
    next(); // calls next piece of middleware
  } catch (e) {}
  res.status(400).json({ msg: "token is not valid" });
}
module.exports = auth;
