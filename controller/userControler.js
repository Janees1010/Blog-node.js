const bcrypt = require("bcrypt");
const User = require('../models/user')


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
    
    let email_check = isValidEmail(email)
    let name_check = isValidName(name)
    let password_check = isValidPassword(password)
    let email_exist_chk = await User.findOne({email:email});
    
    if( !email_check || !name_check || !password_check){
        res.render("signup",{err:"Invalid credentials"});
        return
    }
    if (email_exist_chk) {
        res.render("signup", { err: "Email already exists" });
        return;
    }

    try{
        bcrypt.hash(password,10,(async(err,result)=>{
            if(err){
                console.log(err);
            }else{
                const user = new User({
                    username:name,
                    email:email,
                    password:result
                  })
                  const response = await user.save()
                  req.session.user = response;
                  console.log(req.session.user);
                  res.render("home")
            }
        }))
    }catch(err){
        console.log(err);
    }
   

}

module.exports = {signup}