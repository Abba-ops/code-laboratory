const User = require("../models/userModel");

const render_signup_form = (req, res, next) => {
  res.render("auth/signup", { title: "Sign Up" });
};

const create_user = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, function (err) {
      if (err) return next(err);
      req.flash("success", "Successfully registered");
      res.redirect("/blogs");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

const render_login_form = async (req, res, next) => {
  res.render("auth/login", { title: "Sign In" });
};

const login_user = async (req, res, next) => {
  req.flash("success", `Welcome back ${req.user.username}`);
  res.redirect("/blogs");
};

const logout_user = async (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Successfully logged out");
    res.redirect("/blogs");
  });
};

module.exports = {
  login_user,
  logout_user,
  create_user,
  render_login_form,
  render_signup_form,
};
