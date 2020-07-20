const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  let token, decoded;
  try {
    token = req.headers.authorization.replace("Bearer ", "");
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!user) throw new Error("No user");
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.send({ error: "Please authenticate" });
  }
};

module.exports = auth;
