const { cloudinary } = require("../cloudinary");
const Campground = require("../models/campground");

const index = async (req, res) => {
  let perPage = 6;
  let page = req.query.page || 1;

  const campgrounds = await Campground.aggregate()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

  const count = await Campground.count();
  const nextPage = parseInt(page) + 1;
  const hasNextPage = nextPage <= Math.ceil(count / perPage);

  res.render("campgrounds/index", {
    campgrounds,
    title: "Campgrounds",
    nextPage: hasNextPage ? nextPage : null,
  });
};

const render_new_form = async (req, res) => {
  res.render("campgrounds/new", { title: "Create Campground" });
};

const create_campground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

const show_campground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Campground not found!");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground, title: "Campground Details" });
};

const render_edit_form = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash("error", "Campground not found!");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground, title: "Edit Campground" });
};

const update_campground = async (req, res) => {
  const id = req.params.id;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.images.push(...images);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  await campground.save();
  req.flash("success", "Successfully updated campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

const delete_campground = async (req, res) => {
  const id = req.params.id;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground!");
  res.redirect("/campgrounds");
};

module.exports = {
  index,
  render_new_form,
  create_campground,
  show_campground,
  render_edit_form,
  update_campground,
  delete_campground,
};
