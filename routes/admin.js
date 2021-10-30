const router = require("express").Router();
const adminController = require("../controller/adminController");
const isAuth = require("../middleware/isAuth");

router.get('/viewstudents',adminController.viewstudents)

module.exports = router;
