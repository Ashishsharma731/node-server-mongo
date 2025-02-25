const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { json } = require('express');
require('dotenv').config()

async function handleRoute(req,res){
    res.send('hello from the server side');
}
async function handleLoginUser(req,res){
    try {
        const userExist = await User.findOne({email:req.body.email}); 

        if(userExist){
            return res.status(400).json({message:"Email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        const contact = new User({
            email:req.body.email,
            password:hashPassword
        })
        await contact.save();
        
        const token = jwt.sign({id:contact._id, email:contact.email},process.env.SECRETE_KEY)
        res.status(201).json({message:"User Created Succesfully ",token});
        
    } catch (error) {
        res.status(500).json({message:"Error creating user",error:error.message});
    }
}

async function handleEventHandler(req,res){
    try {
        console.log(req.user.id);
        
        res.json({message:"hi you are in"})
        
    } catch (error) {
        res.status(500).json({error:"ERROR OCCORED"});
    }
}

module.exports ={
    handleLoginUser,
    handleRoute,
    handleEventHandler,
}