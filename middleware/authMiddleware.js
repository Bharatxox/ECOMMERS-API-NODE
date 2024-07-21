const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    //check if token present in the header
    if (!bearerToken) {
      return res.status(401).json({
        status: false,
        message: "token is not present",
      });
    }

    //check is token is valid or not
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, "my_secret_key");

    //decode the token data in console
    const tokenData = jwt.decode(token);
    console.log(tokenData);
    // extract the current time and subtract from expiray data to get the expiray
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    if (currentTimeInSeconds > tokenData.exp) {
      //token is expired
      res.status(401).json({ status: false, message: "token is expired" });
    }

    //check if any user available of the token
    const user = await userModel.findById(tokenData.userId);
    console.log(user);
    if (!user)
      req.status(401).json({ status: false, message: "user not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = authMiddleware;
