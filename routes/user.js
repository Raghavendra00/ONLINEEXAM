const router = require('express').Router();
const userController = require("../controller/userController")
const isAuth = require('../middleware/isAuth')

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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


router.get('/upload', userController.upload)
router.post("/fileupload", upload.single("fufile"), userController.fileupload);






module.exports = router;