const express = require("express");
const handleAsync = require("../utils/handleAsync");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const { create_review, delete_review } = require("../controllers/reviews");

router.post("/", validateReview, handleAsync(create_review));
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  handleAsync(delete_review)
);

module.exports = router;
