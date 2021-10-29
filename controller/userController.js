const user = require('../models/user')
// const mongoose=require('../models/user')


exports.home = (req, res) => {
    res.render('signin',{msg:''})
}

exports.dashboard = (req, res) => {
    // console.log(req.session.user);
    res.render('dashboard')
}

exports.signup = (req, res) => {
    res.render('signup',{msg:''})
}

exports.logout = (req, res) => {
    req.session.destroy(() => {

        res.redirect('/')
     })
}
exports.forgotpassword = (req, res) => {
    res.render('forgotpassword')
}


exports.savedata = async (req, res) => {
    try {

        const person = await user.find({ email: req.body.email })
        if (person.length > 0) {
            return res.render("signup", { msg: "Email already exists" });
        }
        const mobileno = await user.find({ phone: req.body.phone });
        if (mobileno.length > 0) {
          return res.render("signup", { msg: "PhoneNumber already exists" });
        }

        var data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        };

        const result = await user(data).save();
        console.log(result);
        return res.render("signup", { msg: "Saved Successfully" });
    }
    catch (err) {
        console.log(err);
    }
}

exports.postsignin = async (req, res) => {
    console.log(req.body);

    const result = await user.find({ email: req.body.email, password: req.body.password })
    if (result.length > 0) {
        req.session.user = result[0]
        req.session.save(() => {
            return res.redirect('/dashboard')
         })
    }
    else {
        res.render('signin',{msg:"Incorrect Details"})
    }
}


exports.exam = (req, res) => {
  res.render("exam");
};