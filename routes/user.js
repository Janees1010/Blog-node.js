const express = require('express');
const router = express.Router()
const multer = require("multer")
const auth = require("../middlewares/auth")
const {signup,signin,logout,user_posts} = require('../controller/userControler')
const {get_allblog} = require('../controller/blogController')


router.get('/',auth, get_allblog)
router.get('/posts',auth,user_posts)


router.get('/signup',(req,res)=>{
    res.render('signup',{showheader:false})    
}) 
router.get('/detail',(req,res)=>{
    res.render("detailedview")
})
router.get('/signin',(req,res)=>{
    res.render('signin',{showheader:false})
}) 





router.get("/logout",logout)
router.post('/signup',signup)
router.post("/signin",signin)


module.exports = router 