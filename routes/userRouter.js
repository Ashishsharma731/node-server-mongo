const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares');
const {handleRoute,handleLoginUser,handleEventHandler} = require('../controllers/userController')

router.get("/", handleRoute);
router.post("/user/login", handleLoginUser);
router.get("/getUserBy/:_id",verifyToken,handleEventHandler);

module.exports = router;