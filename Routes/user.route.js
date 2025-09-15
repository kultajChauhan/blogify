const { Router } = require("express");
const UserModel = require("../Models/user.model.js");

const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log({ fullName, email, password });

  const user = await UserModel.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await UserModel.matchPasswordAndCreatWebToken(
      email,
      password
    );
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Something went wrong!" });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
