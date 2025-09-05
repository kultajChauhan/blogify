const { Router } = require("express");
const UserModel=require('../Models/user.model.js')

const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log({fullName,email,password})

  const user = await UserModel.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin",async(req,res)=>{
    const {email,password}=req.body

    console.log({email,password})

    const user=await UserModel.matchPassword(email,password)

    console.log('user',user)

    return res.redirect("/");

})

module.exports = router;
