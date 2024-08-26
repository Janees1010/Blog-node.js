const {get_all_users,edit_userRole} = require("../services/userService")
const {find_allblog,find_blogById} = require("../services/blogService")
const {formate_date} = require("../controller/blogController")


const get_users  = async(req,res)=>{
   try {
     const response = await get_all_users()          
     res.render("admin/adminpanel",{users:response,admin:true,user:req.session.user.name})
   } catch (error) {
      console.log(error);
   }
}

const get_posts = async(req,res)=>{
    try {
        const blogs  = await find_allblog()
        res.render("admin/posts",{blogs,admin:true})
    } catch (error) {
        console.log(error);
    }
}

const detailed_view = async (req, res) => {
    try {
      let id = req.params.id;
      let { name, _id } = req.session.user;
  
      const blog = await find_blogById(id)
        blog[0].showedit = true
        const blog_tosend = formate_date(blog)
        return res.render("admin/detailedview", { blog:blog_tosend, showheader: true, user: name,admin:true });
      
    } catch (err) {
      console.log(err);
    }
  }

  const edit_user = async(req,res)=>{
     try {
        let {role} = req.body
        console.log("reached",role);
        // if(role != "user" || role != "admin"){
        //     return 
        // }
        let id = req.params.id
        const response = await edit_userRole(id,role) 
        console.log(response);
         return res.redirect("/admin")
     }catch (error) {
        console.log(error);
     }
 }
module.exports = {get_users,get_posts,detailed_view ,edit_user}