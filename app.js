const express = require('express');
const cors = require('cors');

const app = express();
const userRouter = require('./routes/userRouter');
const {connectMongoosDb} = require('./connections');
const {logReqRes} = require('./middlewares') //it calls index file by default

app.use(cors());
app.use(express.json());

// connection
connectMongoosDb("mongodb://localhost:27017/mydatabase").then(()=>
console.log("Mongoos connected to database")
);

//middleware 
app.use(logReqRes("log.txt"));


//Routes
app.use("/api", userRouter);


app.listen(3000);