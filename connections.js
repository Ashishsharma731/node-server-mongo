const mongoose = require('mongoose');

async function connectMongoosDb(url){
   return mongoose.connect(url);
    // .then(()=>console.log("Connected to DB"))
    // .catch(err => console.error("MongoDB connection error :",err));
}

module.exports = {
    connectMongoosDb,
}