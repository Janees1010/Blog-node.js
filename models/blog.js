const mongoose  = require("mongoose")

const shema  = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }, 
    banner:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})

 module.exports = mongoose.model("Blog",shema)