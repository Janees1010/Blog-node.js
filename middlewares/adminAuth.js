const User = require("../models/user")


const authentication  = async(req,res,next)=>{
    if(req.session.user){
       const user = await User.findOne({_id:req.session.user._id})
       console.log(user);
       if(user.role == "admin"){
          next()
       }else{
          res.redirect('/')
       }
    }else{
        res.redirect("/signin")
    }
}

module.exports = authentication