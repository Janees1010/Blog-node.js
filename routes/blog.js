
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const multer = require('multer')
const {add_blog,find_blog,get_edit_blogdata,post_edit_blog} = require('../controller/blogController')


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"public/images")
    },
    filename:(req,file,cb)=>{ 
        const date = Date.now()
        const filename = date+file.originalname
        cb(null,filename)
    }
})
const upload = multer({storage:storage});

router.get("/addpost",(req,res)=>{
    res.render('addpost',{showheader:true,user:req.session.user.name})
})
router.post("/addpost",auth,upload.single('image'),add_blog )

router.get('/post/:id',auth,find_blog)

router.get('/edit/:id',auth,get_edit_blogdata)
router.post('/editblog/:id',auth,upload.single("image"),post_edit_blog)

  

module.exports = router 