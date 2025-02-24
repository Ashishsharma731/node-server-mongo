const express = require('express');
const router = express.Router();
const {handleRoute,handleCreateUser} = require('../controllers/userController')

router.get("/", handleRoute);
router.post("/user", handleCreateUser);

module.exports = router;