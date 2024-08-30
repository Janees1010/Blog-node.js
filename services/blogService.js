
const Blog = require("../models/blog")

const create_blog = async(data)=>{
    try{
        const blog = new Blog(data)
        return await blog.save()
    }catch(err){
        console.log(err);
    }
}

const find_allblog = async(current_page)=>{
    try {
        let limit = 2;
        let skip = 0;
        if(current_page){
            skip = current_page * limit
          
        }
       
        const blogs = await Blog.find().populate("author", "name")
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
        return blogs
    } catch (error) {
        console.log(err);
    }
}

const find_blogs_count = async()=>{
    try{
        const count = await Blog.countDocuments()

        return count
    }catch(err){
        return err;
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

const find_blog_by_id = async(id)=>{
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
    find_blog_by_id,
    remove_blog,
    find_blogs_count
}   