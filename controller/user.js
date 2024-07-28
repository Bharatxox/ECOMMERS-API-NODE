const UserModel = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: "kamalbisht819@gmail.com",
      pass: "wtsm fesn dspb fcoi",
    },
  });

  const mailOptions = {
    from: "kamalbisht819@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

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
    email: user.email,
    exp: expirayTime,
    name: user.firstName + " " + user.lastName,
  };

  const token = jwt.sign(jwtPayload, "my_secret_key");
  await UserModel.findByIdAndUpdate(user._id, { $set: { token: token } });
  res.json({
    sucess: true,
    message: "LOGIN SUCESSFUL",
    token: token,
  });
};

const forgotPassword = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "INVALID EMAIL",
    });
  }

  const resetToken = uuidv4();
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour form now

  await UserModel.findByIdAndUpdate(user._id, {
    $set: {
      resetPasswordToken: resetToken,
      resetPasswordTokenExpiry: resetTokenExpiry,
    },
  });

  const resetLink = `http://localhost:10000/user/reset-password?token=${resetToken}`;
  sendEmail(
    user.email,
    "Password Reset",
    `Click the link to reset your password: ${resetLink}`
  );

  res.json({
    success: true,
    message: "Password reset link sent to your email",
  });
};

const resetPasswordForm = async (req, res) => {
  const { token } = req.query;
  res.send(`
    <form action="/reset-password" method="POST">
      <input type="hidden" name="token" value="${token}" />
      <label for="newPassword">New Password:</label>
      <input type="password" id="newPassword" name="newPassword" required />
      <button type="submit">Reset Password</button>
    </form>
  `);
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  await UserModel.findByIdAndUpdate(user._id, {
    $set: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  });

  res.json({
    success: true,
    message: "Password reset successful",
  });
};

const userController = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  resetPasswordForm,
};

module.exports = userController;
