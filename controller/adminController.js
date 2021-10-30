const User = require('../models/user')

exports.viewstudents = async (req, res) => {

    const students = await User.find()

    // console.log(students);
    res.render('studentlist',{students})
}