const router = require('express').Router();
const userController=require("../controller/userController")



router.get('/', userController.home)
router.get('/dashboard', userController.dashboard)
router.post('/postsignin', userController.postsignin)
router.get('/signup', userController.signup)
// router.get('/forgotpassword', userController.forgotpassword)
router.post('/savedata', userController.savedata)






module.exports = router;