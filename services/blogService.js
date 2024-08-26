
const Blog = require("../models/blog")

const create_blog = async(data)=>{
    try{
        const blog = new Blog(data)
        return await blog.save()
    }catch(err){
        console.log(err);
    }
}

const find_allblog = async()=>{
    try {
        const blogs = await Blog.find().populate("author", "name").sort({ _id: -1 }).lean();
        return blogs
    } catch (error) {
        console.log(err);
    }
}

const edit_blog = async(data)=>{
    const {title,description,content} = data
    try{
        const blog = new Blog.findByIdAndUpdate({_id:id},{data})
        return await blog.save()
    }catch(err){
        console.log(err);
    }
}

const find_blogById = async(id)=>{
    try {
        const blog = await Blog.find({ _id: id }).populate("author").lean();
        return blog
    } catch (error) {
        
    }
}

const remove_blog = async(id)=>{
    try {
        const response  = await Blog.findByIdAndDelete({_id:id})
        return response
    } catch (error) {
        console.log(err);
    }
}

module.exports = {
    create_blog,
    find_allblog,
    edit_blog,
    find_blogById,
    remove_blog
}  