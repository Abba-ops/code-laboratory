const Blog = require("../models/blogModel");
const mongoose = require("mongoose");
const moment = require("moment");

const blog_index = async (req, res) => {
  let page = req.query.page || 1;
  let perPage = 11;

  const blogs = await Blog.aggregate([{ $sort: { createdAt: -1 } }])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

  const count = await Blog.count();
  const nextPage = parseInt(page) + 1;
  const hasNextPage = nextPage <= Math.ceil(count / perPage);

  res.render("blogs/index", {
    blogs,
    moment,
    hasNextPage,
    current: page,
    title: "Home",
    nextPage: hasNextPage ? nextPage : null,
  });
};

const blog_details = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    req.flash("error", "Invalid object id");
    return res.redirect("/blogs");
  }
  const blog = await Blog.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "user",
      },
    })
    .populate("user");
  blog.reviews.reverse();
  if (!blog) {
    req.flash("error", "Blog not found");
    return res.redirect("/blogs");
  }
  res.render("blogs/details", {
    blog,
    moment,
    title: "Blog Details",
  });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create Blog" });
};

const blog_create_post = async (req, res, next) => {
  const blog = await new Blog({ ...req.body });
  blog.user = req.user;
  blog.save();
  req.flash("success", "Blog created successfully");
  res.redirect(`/blogs/${blog._id}`);
};

const blog_delete = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  req.flash("success", "Blog deleted successfully");
  res.json({ redirect: "/blogs" });
};

const blog_edit_get = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    req.flash("error", "Blog not found");
    res.redirect("/blogs");
  }
  res.render("blogs/edit", { title: "Edit Blog", blog });
};

const blog_edit_put = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndUpdate(id, { ...req.body }, { runValidators: true });
  req.flash("success", "Blog updated successfully");
  res.redirect(`/blogs/${id}`);
};

module.exports = {
  blog_index,
  blog_delete,
  blog_details,
  blog_edit_put,
  blog_edit_get,
  blog_create_get,
  blog_create_post,
};
