const express = require('express');
const router = express.Router()
const {signup} = require('../controller/userControler')

router.get('/',(req,res)=>{
    res.render('home')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/signup',signup)


module.exports = router