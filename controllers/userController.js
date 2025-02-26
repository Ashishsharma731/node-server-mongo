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
// async function handleUpdateUser(req, res) {
//     try {
//         console.log("HERE WERA RWE");
        
//         const { email, newPassword } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(newPassword, salt);
//         user.email = email;
//         // user.password = hashPassword;
//         console.log(user.email,"TESTING");
        
//         await user.save();

//         res.status(200).json({ message: "User updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user", error: error.message });
//     }
// }

// Delete User
async function handleDeleteUser(req, res) {
    try {
        console.log("HERE WERA RWE");
        const { email } = req.body;

        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
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
    handleUpdateUser,
    handleDeleteUser
}