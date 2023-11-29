const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const handleAsync = require("../utils/handleAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const {
  index,
  render_new_form,
  create_campground,
  show_campground,
  render_edit_form,
  update_campground,
  delete_campground,
} = require("../controllers/campgrounds");

router
  .route("/")
  .get(handleAsync(index))
  .post(
    isLoggedIn,
    upload.array("images"),
    validateCampground,
    handleAsync(create_campground)
  );
router.get("/new", isLoggedIn, render_new_form);
router
  .route("/:id")
  .get(handleAsync(show_campground))
  .delete(isLoggedIn, isAuthor, handleAsync(delete_campground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("images"),
    validateCampground,
    handleAsync(update_campground)
  );
router.get("/:id/edit", isLoggedIn, isAuthor, handleAsync(render_edit_form));

module.exports = router;
