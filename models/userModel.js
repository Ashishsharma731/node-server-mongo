const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    email:{
        type:String, 
        required:true
    },
    password:{
        type:String, 
        required:true
    }
})

const User = mongoose.model('users',contractSchema);

module.exports = User;