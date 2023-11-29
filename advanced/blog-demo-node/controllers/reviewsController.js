const Blog = require("../models/blogModel");
const Review = require("../models/reviewModel");

const blog_review_post = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  const review = await Review(req.body);
  blog.reviews.push(review);
  review.user = req.user._id;
  console.log(review);
  await review.save();
  await blog.save();
  res.redirect(`/blogs/${id}`);
};

const blog_delete_review = async (req, res) => {
  const { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Blog.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  res.redirect(`/blogs/${id}`);
};

module.exports = {
  blog_review_post,
  blog_delete_review,
};
