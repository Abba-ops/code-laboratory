const User = require("../models/user");

const render_register = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Successfully registered");
      res.redirect("/campgrounds");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

const render_login = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const login = (req, res) => {
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete res.locals.returnTo;
  req.flash("success", "Welcome back");
  res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye");
    res.redirect("/campgrounds");
  });
};

module.exports = { render_register, register, render_login, login, logout };
