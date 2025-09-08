const express = require('express')
const { blogModule } = require('../Models/blog.models')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'))
  },
  filename: function (req, file, cb) {
    const filename= `${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

router.get('/add-blog',(req,res)=>{
return res.render('addBlog',{user:req.user})
})

router.post('/',upload.single("coverImage"),async(req,res)=>{
    console.log('blog body',req.body)
    console.log(req.file)
    const {title,body} = req.body
 
    const result = await blogModule.create({title,body,coverImageUrl:req.file.filename})

    console.log(result)
return res.redirect('/')
})
module.exports=router