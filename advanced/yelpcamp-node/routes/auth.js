const express = require("express");
const handleAsync = require("../utils/handleAsync");
const passport = require("passport");
const router = express.Router();
const { storeReturnTo } = require("../middleware");
const {
  login,
  logout,
  register,
  render_login,
  render_register,
} = require("../controllers/auth");

router.route("/register").get(render_register).post(handleAsync(register));
router
  .route("/login")
  .get(render_login)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    login
  );
router.get("/logout", logout);

module.exports = router;
