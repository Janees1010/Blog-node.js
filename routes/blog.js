
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const multer = require('multer')
const {add_blog,find_blog,get_edit_blogdata,post_edit_blog,delete_blog} = require('../controller/blogController')


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
    res.render('user/addpost',{showheader:true,user:req.session.user.name})
})
router.post("/addpost",upload.single('image'),add_blog )

router.get('/post/:id',find_blog)

router.get('/edit/:id',get_edit_blogdata)
router.post('/editblog/:id',upload.single("image"),post_edit_blog)
 
router.get("/delete/:id",delete_blog)  

module.exports = router           