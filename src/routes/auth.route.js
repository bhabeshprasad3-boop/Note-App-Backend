const express = require('express');
const authController = require('../controllers/auth.controller');


const router = express.Router()


//middleware
router.use(express.json())

router.post('/register',authController.userRegister)

router.post('/login',authController.userLogin)

router.post("/logout",authController.userLogout);


module.exports = router;


