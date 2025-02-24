const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase")
.then(()=>console.log("Connected to DB"))
.catch(err => console.error("MongoDB connection error :",err));

const contractSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const User = mongoose.model('users',contractSchema);

app.post('/api/user', async function (req,res){
    const contact = new User({
        email:req.body.email,
        password:req.body.password
    })
    await contact.save();
    res.json({message:"HELLP THERE ",contact})
})

app.get('/', function (req,res){
    res.send('hello world');
})

app.listen(3000);