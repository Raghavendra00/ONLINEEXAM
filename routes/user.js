const router = require('express').Router();
const userController=require("../controller/userController")



router.get('/', userController.home)


router.get('/signup', userController.signup)






module.exports = router;