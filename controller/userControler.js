const bcrypt = require("bcrypt");
const User = require('../models/user');
const Blog = require("../models/blog");



const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    return nameRegex.test(name);
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    const passwordRegex = /^.{8,}$/; // Minimum 8 characters
    return passwordRegex.test(password);
};

const signup = async(req,res)=>{
    let {name,email,password} = req.body;
 try{
    let email_check = isValidEmail(email)
    let name_check = isValidName(name)
    let password_check = isValidPassword(password)
    let email_exist_chk = await User.findOne({email:email});
    
    if( !email_check || !name_check){
        return res.render("signup",{err:"Invalid credential"});
    }
    if(!password){
        return res.render("signup",{err:"Password length must be eight"}); 
    }
    if (email_exist_chk) {
        return res.render("signup", { err: "Email already exists" });
    }
        bcrypt.hash(password,10,(async(err,result)=>{
            if(err){
                console.log(err);
            }else{
                const user = new User({
                    name:name,
                    email:email,
                    password:result
                  })
                  const response = await user.save()
                      req.session.user = response;
                      return res.redirect('/')
            }
        }))
    }catch(err){
        console.log(err);
    }
   

}
const signin = async(req,res)=>{
 let {email,password} = req.body;
 console.log(req.body);

 try{
    const user = await User.findOne({email:email})
    if(user){
       await bcrypt.compare(password,user.password,(err,response)=>{
            if(response){
                req.session.user = user;
                return res.redirect('/')
            }else{
                return res.render("signin",{err:"Incorect Password"})
            }
        })
    }else{
        return res.render("signin",{err:"Email not found"})
    }
 }catch(err){
    console.log(err);
 }

}

const logout = (req,res)=>{
    try{
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            res.clearCookie('connect.sid')
            res.redirect("/signin")
        })
    }catch(err){
        console.log(err);
    }
}

const user_posts = async(req,res)=>{
   
    try{
        let {_id,name} = req.session.user
        const posts = await Blog.find({author:_id}).populate("author","name").lean()
         res.render("posts",{blogs:posts,showheader:true,user:name})
    }catch(err){
        console.log(err); 
    }
}



module.exports = {signup,signin,logout,user_posts}