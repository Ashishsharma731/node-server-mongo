const fs = require('fs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

function logReqRes(fileName){
    return(req,res, next)=>{
        fs.appendFile(
            fileName,
            `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
            (err,data)=> {
                next();
            }
        );
    };
}

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        
        req.user = decoded; // Attach user info to request
        
        next(); // Move to the next middleware
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
}


module.exports ={
    logReqRes,
    verifyToken,
}