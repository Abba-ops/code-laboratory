require("dotenv").config();

const express = require("express");
const engine = require("ejs-mate");
const flash = require("connect-flash");
const colors = require("colors");
const morgan = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const passport = require("passport");
const path = require("path");

const connectDB = require("./config/db");

const blogsRoutes = require("./routes/blogsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 3000;
const app = express();
const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

connectDB();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(flash());
app.use(morgan("dev"));
app.use(session(sessionConfig));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.url = req.originalUrl;
  res.locals.user = req.user;
  next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => res.redirect("/blogs"));
app.get("/about", (req, res) => res.render("about", { title: "About Us" }));

app.use("/", authRoutes);
app.use("/blogs", blogsRoutes);
app.use("/blogs", reviewsRoutes);

app.all("*", (req, res) =>
  res.status(404).render("404", { title: "404 Not Found" })
);

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).render("error", { title: "Error", err });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
