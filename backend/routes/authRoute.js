const express = require("express");
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/authController");
const { checkCurrentUser } = require("../middleware/checkCurrentUser");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/").get(checkCurrentUser, getCurrentUser);

module.exports = Router;
