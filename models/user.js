const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirm: {
        type: String,
        require: true,
        trim:true
    },


    phone: {
        type: Number,
        required: true,
        trim: true
    },
    score: {
        type: Number,
    },
    
})

module.exports = mongoose.model('user',userSchema)