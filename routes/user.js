const router = require('express').Router();
const userController = require("../controller/userController")
const isAuth = require('../middleware/isAuth')

router.get('/', userController.home)
router.get('/dashboard',isAuth, userController.dashboard)
router.post('/postsignin', userController.postsignin)
router.get('/signup', userController.signup)
router.get('/logout', userController.logout)
// router.get('/forgotpassword', userController.forgotpassword)
router.post('/savedata', userController.savedata)
router.get('/exam',isAuth, userController.exam)
router.post('/sendans',isAuth, userController.sendans)
router.get('/thankyou',isAuth, userController.thankyou)
router.get('/contactus', userController.contactus)
router.post('/sendmail', userController.sendmail)






module.exports = router;