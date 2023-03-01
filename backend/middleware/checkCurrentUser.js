const jwt = require("jsonwebtoken");

exports.checkCurrentUser = (req, res, next) => {
  const authorization = req.headers.authorization.split(" ")[1];

  if (!authorization) {
    req.user = null;
    next();
  } else {
    const token = authorization.replace("Bearer", "");

    try {
      const { userId } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = { userId };
      next();
    } catch (error) {
      req.user = null;
      next(error);
    }
  }
};
