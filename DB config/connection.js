const mongoose = require('mongoose');

async function connect_db() {
    try {
        const dbUrl ="mongodb+srv://janeesleo55:janees5510@blog.aya6be9.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Blog";
        await mongoose.connect(dbUrl);
        console.log("DB connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect_db; 