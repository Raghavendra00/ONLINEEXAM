const router = require('express').Router();
const userController=require("../controller/userController")



router.get('/', userController.home)






module.exports = router;