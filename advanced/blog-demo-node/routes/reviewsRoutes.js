const express = require("express");
const ExpressError = require("../utils/expressError");
const handleAsync = require("../utils/handleAsync");
const { reviewSchema } = require("../schemas");
const router = express.Router({ mergeParams: true });
const {
  blog_review_post,
  blog_delete_review,
} = require("../controllers/reviewsController");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  } else {
    next();
  }
};

router.post("/:id/reviews", validateReview, handleAsync(blog_review_post));
router.delete("/:id/reviews/:reviewId", handleAsync(blog_delete_review));

module.exports = router;
