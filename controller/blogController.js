
const path = require("path");
const fs = require("fs");
const {find_allblog,create_blog,find_blogById,remove_blog} = require('../services/blogService');
const {find_one_userById} = require("../services/userService");
const user = require("../models/user");
const Blog = require("../models/blog")




const add_blog = async (req, res) => {
  try {
    let { title, description, content } = req.body;

    if (!title || !description || !content || !req.file) {
      return res.render("/user/addpost", { err: "Input Field is Empty" });
    }
    console.log(req.session.user);
    const blog = {
      title: title,
      description: description,
      content: content,
      banner: req.file.filename,
      author: req.session.user._id,
    }
    const response = await create_blog(blog)
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const formate_date = (blogs)=>{
  let formated_data = blogs.map((blog) => {
    blog.createdAt = blog.createdAt.toISOString().split("T")[0].split("-").reverse().join("-")
    return blog
  });
  return formated_data
}

const get_allblog = async (req, res) => {
  try {
    let blogs = await find_allblog()
    const blog_tosend = formate_date(blogs)
    res.render("user/home", {
      blog:blog_tosend,
      showheader: true,
      user: req.session.user.name,
    });
  } catch (err) {
    console.log(err); 
  }
};

const find_blog = async (req, res) => {
  try {
    let id = req.params.id;
    let { name, _id } = req.session.user;

    const blog = await find_blogById(id)
    if (blog[0].author._id == _id) {
        blog[0].showedit = true;
        const blog_tosend = formate_date(blog)
      return res.render("user/detailedview", {blog:blog_tosend, showheader: true, user: name });
    } else {
      const blog_tosend = formate_date(blog)
      return res.render("user/detailedview", { blog:blog_tosend, showheader: true, user: name });
    }
  } catch (err) {
    console.log(err);
  }
};

const get_edit_blogdata = async (req, res) => {
  try {
    let id = req.params.id;
    let { name,_id } = req.session.user;
    const user = await find_one_userById(_id)
    const blog = await find_blogById(id)
    if(user.role == "admin"){
       return res.render("user/editblog", { blog, showheader: true, user: name , admin:true });
    }else{
      return  res.render("user/editblog", { blog, showheader: true, user: name });
    }
  } catch (err) {
    console.log(err);
  }
};

const post_edit_blog = async (req, res) => {
  try {
    let id = req.params.id;
    let {_id} = req.session.user
    console.log(req.body);
    let { title, description, content } = req.body;
    if (req.file) {
      const edited_blog = await find_blogById(id)
        const image_path = path.join(
          __dirname,
          "..",
          "public",
          "images",
          edited_blog.banner
        );

        if (fs.existsSync(image_path)) {
          fs.unlinkSync(image_path);
        }
      
      const blog = await Blog.findByIdAndUpdate(
        { _id: id },
        {
          title: title,
          description: description,
          content: content,
          banner: req.file.filename,
        }
      );
    } else {
      const blog = await Blog.findByIdAndUpdate(
        { _id: id },
        {
          title: title,
          description: description,
          content: content,
        }
      );
    }
   const user = await find_one_userById(_id)
   if(user.role == "admin"){
     res.redirect("/admin/posts");
   }else{
     res.redirect("/");
   }
  } catch (err) {
    console.log(err);
  }
};

const delete_blog = async (req, res) => {
  try {
    let id = req.params.id;
    let {_id} = req.session.user
    const deleting_blog = await remo
    const image_path = path.join(
      __dirname,
      "..",
      "public",
      "images",
      deleting_blog.banner
    );

    if (fs.existsSync(image_path)) {
      fs.unlinkSync(image_path);
    }
    const response = await remove_blog(id);
    console.log(response);
    const user = await find_one_userById(_id)
    if(user.role == "admin"){
      res.redirect("/admin/posts");
    }else{
      res.redirect("/");
    }  
   
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  add_blog,
  get_allblog,
  find_blog,
  get_edit_blogdata,
  post_edit_blog,
  delete_blog,
  formate_date
};
