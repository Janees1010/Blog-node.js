const express = require("express");
const {get_users,get_posts, detailed_view,edit_user}  = require("../controller/adminControler")
const router  = express.Router();

router.get("/",get_users)
router.get("/posts",get_posts)
router.get("/detailedview/:id",detailed_view)

router.post("/edit/:id",edit_user)



module.exports = router