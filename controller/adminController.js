const User = require('../models/user')

exports.viewstudents = async (req, res) => {

    const students = await User.find({isAdmin:false})

    console.log(students);
    res.render('studentlist',{students, isAdmin:req.session.user.isAdmin,email:req.session.user.email})
}