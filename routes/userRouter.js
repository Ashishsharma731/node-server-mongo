const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares');
const {handleRoute,handleLoginUser,handleEventHandler, handleUpdateUser,handleDeleteUser} = require('../controllers/userController')

router.get("/", handleRoute);
router.post("/user/login", handleLoginUser);
// router.patch("/user/update",  handleUpdateUser);
router.delete("/user/delete",  handleDeleteUser);
router.get("/getUserBy/:_id",verifyToken,handleEventHandler);

module.exports = router;