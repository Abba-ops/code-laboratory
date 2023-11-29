const express = require("express");
const ExpressError = require("../utils/expressError");
const handleAsync = require("../utils/handleAsync");
const { blogSchema } = require("../schemas");
const { isSignedIn, isAuthor } = require("../middleware");
const router = express.Router();

const {
  blog_index,
  blog_delete,
  blog_details,
  blog_edit_put,
  blog_edit_get,
  blog_create_get,
  blog_create_post,
} = require("../controllers/blogController");

const validateBlog = (req, res, next) => {
  const { error } = blogSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  } else {
    next();
  }
};

router.get("/", handleAsync(blog_index));
router.post("/", isSignedIn, validateBlog, handleAsync(blog_create_post));
router.get("/create", isSignedIn, blog_create_get);
router.get("/:id", handleAsync(blog_details));
router.put(
  "/:id",
  isSignedIn,
  isAuthor,
  validateBlog,
  handleAsync(blog_edit_put)
);
router.delete("/:id", isSignedIn, isAuthor, handleAsync(blog_delete));
router.get("/:id/edit", isSignedIn, isAuthor, blog_edit_get);

module.exports = router;
