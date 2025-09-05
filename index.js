const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./Routes/user.route.js");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("database connected"));

app.set("view engine", "ejs");
app.set("Views", path.resolve("./Views"));

app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
