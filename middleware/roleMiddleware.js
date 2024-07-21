const roleMiddleware = (role) => (req, res, next) => {
  //   console.log(req.user);
  if (role.includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({
      status: "failed",
      message: "role is not allowed",
    });
  }
};

module.exports = roleMiddleware;
