const express = require("express")
const app = express();
const path = require('path')
const connectDB = require('./DB config/connection')
const session = require('express-session')
const {engine} = require('express-handlebars')
require('dotenv').config()
const user_route = require('./routes/user')
const blog_route = require("./routes/blog")

const port = process.env.PORT;
app.listen(port, ()=>console.log(`server is running on ${port}`));       

connectDB()

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false,maxAge: 1000 * 60 * 60 * 24}
}))
 
app.engine('hbs',engine({extname:'hbs',defaultLayout:'layout',
    layoutsDir:__dirname+'/views/layout/',
    partialsDir:__dirname+'/views/partials/'
}));

app.set("view engine","hbs");
app.set("views",path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

app.use('/',user_route)
app.use('/blog',blog_route)

