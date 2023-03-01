const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    // req.body = email, name, password
    bcrypt.hash(req.body.password, 10, async (error, hashPassword) => {
      if (error) return next(error);
      else {
        const user = await User.create({
          email: req.body.email,
          name: req.body.name,
          password: hashPassword,
        });
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.status(200).json({
          status: "success",
          data: { token, user },
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error("Email is not correct");
      error.statusCode = 400;
      return next(error);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.status(200).json({
        status: "success",
        data: {
          token,
          user,
        },
      });
    } else {
      const error = new Error("Password is not correct");
      error.statusCode = 400;
      return next(error);
    }
  } catch (error) {}
};
