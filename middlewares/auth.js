
const authentication  = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect("/signin")
    }
}

module.exports = authentication