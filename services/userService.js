const User = require('../models/user')
const Blog = require('../models/blog')


const create_user = async(user_data)=>{
    try{
        const user = new User(user_data)
        return await user.save()
    }catch(err){
        console.log(err);
    }
}

const find_one_user_by_email = async (email)=>{
    try{
        const user = await User.findOne({email:email})
        return user; 
    }catch(err){
        console.log(err);
    }
}

const find_one_user_byid = async (id)=>{
    try{
        const user = await User.findOne({_id:id})
        return user; 
    }catch(err){
        console.log(err);
    }
}

const get_all_users = async ()=>{
    const user = await User.find().lean()
    return user;
}

const find_user_blogs = async(id)=>{
    try{
        const blogs = await Blog.find({author:id}).populate("author","name").lean()
        return blogs
    }catch(err){
        console.log(err);
    }
}

const edit_userRole = async(id,role)=>{
  try {
    const response  = await User.findByIdAndUpdate({_id:id},{role:role})
  } catch (error) {
      console.log(error);
  }
}
const remove_user = async(id)=>{
    try{
      const response  = await User.findByIdAndDelete(id);
      return response
    }catch(err){

    }
}

module.exports={create_user,find_one_user_by_email,get_all_users,find_user_blogs,find_one_user_byid,edit_userRole,remove_user}