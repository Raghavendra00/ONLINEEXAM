const user = require('../models/user')
// const mongoose=require('../models/user')

const bcrypt = require('bcrypt')



exports.home = (req, res) => {
    res.render('signin',{msg:''})
}

exports.dashboard = (req, res) => {
    // console.log(req.session.user);
    res.render('dashboard', {isAdmin:req.session.user.isAdmin,email:req.session.user.email})
}

exports.signup = (req, res) => {
    res.render('signup',{msg:''})
}

exports.logout = (req, res) => {
    req.session.destroy(() => {

        res.redirect('/')
     })
}

// exports.forgotpassword = (req, res) => {
//     res.render('forgotpassword')
// }


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

        const hashedPassword = await bcrypt.hashSync(req.body.password,12)

        var data = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPassword,
          isAdmin: false,
          examTaken: false,
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
    // console.log(req.body);

    const result = await user.find({ email: req.body.email })
    console.log(result);
    

    if (result.length > 0) {

        const isValid = await bcrypt.compareSync(req.body.password,result[0].password)

        if (!isValid) {
            return res.render("signin", { msg: "Incorrect Details" });
        }
        req.session.user = result[0]
        req.session.save(() => {
            return res.redirect('/dashboard')
         })
    }
    else {
        res.render('signin',{msg:"Incorrect Details"})
    }
}


exports.exam = async (req, res) => {

    if (req.session.user.isAdmin == true) {
        return res.redirect("/dashboard");
    }

    // console.log(req.session.user);

    var userid = req.session.user._id
    var result = await user.findById(userid)


    if (!result.examTaken) {
        
        return res.render("exam", {
          isAdmin: req.session.user.isAdmin,
          email: req.session.user.email,
        });
    }

    res.render("alreadytaken", {
      isAdmin: req.session.user.isAdmin,
      email: req.session.user.email,
    });
};

exports.sendans = async (req, res) => {

    const answers = {
      Q1: "a",
      Q2: "b",
      Q3: "b",
      Q4: "c",
      Q5: "a",
      Q6: "a",
      Q7: "c",
      Q8: "b",
    };

    const userAnswers = req.body
    var total = 0
    for (var i in answers) {
        if (answers[i] == userAnswers[i]) {
            total+=1
        }
    }

    // console.log(total);

    var userid = req.session.user._id

    const result = await user.findByIdAndUpdate(userid,{examTaken:true,score:total})
    // req.session.user.examTaken = 
    // console.log(req.body);
    res.redirect('/thankyou')
};

exports.thankyou = (req, res) => {

    // console.log(req.body);
    res.render("thankyou", {
      isAdmin: req.session.user.isAdmin,
      email: req.session.user.email,
    });
};