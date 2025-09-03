const path=require('path')
const express = require('express')

const app= express()
const PORT=8000

app.set("view engine","ejs")
app.set("Views",path.resolve('./Views'))

app.get('/',(req,res)=>{
    return res.render('home')
})

app.listen(PORT,()=>{console.log(`server is running ${PORT}`)})