const express = require('express');
const router = express.Router();
const {handleRoute,handleCreateUser} = require('../controllers/userController')

router.route("/").get(handleRoute);
router.route("/user").post(handleCreateUser);


module.exports = router;