const express = require("express");
const { blogModule } = require("../Models/blog.models");
const multer = require("multer");
const path = require("path");
const commentModel = require("../Models/comment.model");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/add-blog", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

//blog post route
router.post("/", upload.single("coverImage"), async (req, res) => {
  
  const { title, body } = req.body;

  const result = await blogModule.create({
    title,
    body,
    coverImageUrl: req.file.filename,
    createdBy: req.user._id,
  });

  return res.redirect("/");
});

router.get("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogModule.findById( blogId );
  const comments = await commentModel.find( {blogId} ).populate("createdBy");
  
  return res.render("blog", { user: req.user, blogId,blog,comments });
});

router.post('/comment/:blogId',async(req,res)=>{
  await commentModel.create({
    content:req.body.comment,
    blogId:req.params.blogId,
    createdBy:req.user._id
  })
  return res.redirect(`/blog/${req.params.blogId}`)
})
module.exports = router;
