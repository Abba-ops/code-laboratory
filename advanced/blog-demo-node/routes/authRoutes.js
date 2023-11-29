const express = require("express");
const passport = require("passport");
const handleAsync = require("../utils/handleAsync");
const router = express.Router();
const {
  login_user,
  logout_user,
  create_user,
  render_login_form,
  render_signup_form,
} = require("../controllers/authController");

router.get("/signup", render_signup_form);
router.post("/signup", handleAsync(create_user));
router.get("/login", render_login_form);
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  login_user
);
router.get("/logout", logout_user);

module.exports = router;
