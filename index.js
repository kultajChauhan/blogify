const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

const userRouter = require("./Routes/user.route.js");
const blogRouter = require('./Routes/blog.routes.js')
const { checkForAuthenticationCookie } = require("./middlewares/authentication.middleware.js");
const { blogModule } = require("./Models/blog.models.js");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("database connected"));

app.set("view engine", "ejs");
app.set("Views", path.resolve("./Views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.use("/user", userRouter);
app.use('/blog',blogRouter)

app.get("/", async(req, res) => {
  const blogs = await blogModule.find({})
  return res.render("home",{user:req.user,blogs});
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
