const Blog = require("./models/blogModel");

module.exports.isSignedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to view this page");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog.user.equals(req.user._id)) {
    req.flash("error", "You are not allowed to access this page");
    return res.redirect(`/blogs/${id}`);
  }
  next();
};
