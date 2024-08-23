const { fstat } = require('fs')
const Blog = require('../models/blog')
const path = require('path')
const fs = require('fs')
const add_blog = async(req,res)=>{
   
  
  try{
      let {title,description,content}  = req.body
      
      if(!title || !description || !content ){
         return res.render('addpost',{err:"Input Field is Empty"})
      }
      console.log(req.session.user);
      const blog = new Blog({
        title:title,
        description:description,
        content:content,
        banner:req.file.filename,
        author:req.session.user._id
      })
      const response  = await blog.save()
      res.redirect('/')
    }catch(err){
        console.log(err);
    }
}

const get_allblog = async(req,res)=>{
  try{
       let blogs  = await Blog.find().populate("author","name").lean()
       res.render("home",{blogs,showheader:true,user:req.session.user.name})
  }catch(err){
    console.log(err);
  }
}

const find_blog = async(req,res)=>{
  try{
   let id = req.params.id
   let {name,_id} = req.session.user
    const blog = await Blog.find({_id:id}).populate("author").lean();
  
    if(blog[0].author._id == _id){

      blog[0].showedit = true;
  
      return res.render("detailedview",{blog,showheader:true,user:name})
    }else{
      return res.render("detailedview",{blog,showheader:true,user:name})
    }
 }catch(err){
    console.log(err);  
 }
}

const get_edit_blogdata = async(req,res)=>{
   try{
    let id = req.params.id
    let {name}  = req.session.user
      const blog = await Blog.find({_id:id}).lean()
      res.render("editblog",{blog,showheader:true,user:name})
   }catch(err){
        console.log(err);
   }
}

const post_edit_blog = async(req,res)=>{
   try{
     let id = req.params.id
     console.log(req.body);
     let {title,description,content} = req.body
     if(req.file){
       const blog = await Blog.findOne({_id:id});
       const image_path = path.join(__dirname,"..","public","images",blog.banner)
     
        if(fs.existsSync(image_path)){
           fs.unlinkSync(image_path)
        }

     }
     const blog  =  await Blog.findByIdAndUpdate({_id:id},{
       title:title,
       description:description,
       content:content,
       banner:req.file.filename,
       author:req.session.user._id
     })
     res.redirect('/');
   }catch(err){
    console.log(err);
   }
}

module.exports = {add_blog,get_allblog,find_blog,get_edit_blogdata,post_edit_blog}