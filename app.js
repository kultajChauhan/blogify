require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require("./Routes/user.route.js");
const blogRouter = require("./Routes/blog.routes.js");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication.middleware.js");
const { blogModule } = require("./Models/blog.models.js");

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("database connected"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const blogs = await blogModule.find({});
  return res.render("home", { user: req.user, blogs });
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
