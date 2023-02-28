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
    console.log(error);
    res.json(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Error:  Email is not rìght
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
      // Error: Password is not correct
    }
  } catch (error) {}
};
