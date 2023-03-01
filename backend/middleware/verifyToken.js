const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  // Access Authorization from req header
  const authorization = req.headers.authorization.split(" ")[1];

  if (!authorization) {
    // Error: Unauthorized
    const error = new Error("Unauthorized");
    error.statusCode = 1;
    return next(error);
  }

  // get token
  const token = authorization.replace("Bearer", "");

  // verify token
  const { userId } = jwt.verify(token, process.env.SECRET_KEY);

  // assign req
  req.user = { userId };

  next();
};
