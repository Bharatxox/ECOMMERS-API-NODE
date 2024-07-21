const UserModel = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log("plain password", req.body.password);
    console.log("hashed password", hashedPassword);

    const newlyInsertedUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
      role: "CUSTOMER",
    });
    console.log(newlyInsertedUser);
    res.json({
      sucess: true,
      message: "SIGNUP Success",
    });
  } catch (err) {
    res.json({
      sucess: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      sucess: false,
      message: "INVALID EMAIL",
    });
  }
  const isPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isPassword) {
    return res.status(400).json({
      sucess: false,
      message: "INVALID PASSWORD",
    });
  }

  const currentTime = Math.floor(new Date().getTime() / 1000);
  const expirayTime = currentTime + 3600; //1 hr from now

  const jwtPayload = {
    userId: user._id,
    role: user.role,
    mobileNo: user.mobileNo,
    exp: expirayTime,
  };

  const token = jwt.sign(jwtPayload, "my_secret_key");
  await UserModel.findByIdAndUpdate(user._id, { $set: { token: token } });
  res.json({
    sucess: true,
    message: "LOGIN SUCESSFUL",
    token: token,
  });
};

const userController = { signup, login };

module.exports = userController;
