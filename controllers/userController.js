const User = require('../models/userModel')

async function handleRoute(req,res){
    res.send('hello world');
}
async function handleCreateUser(req,res){
    const contact = new User({
        email:req.body.email,
        password:req.body.password
    })
    await contact.save();
    res.json({message:"HELLP THERE ",contact})
}

module.exports ={
    handleCreateUser,
    handleRoute,
}