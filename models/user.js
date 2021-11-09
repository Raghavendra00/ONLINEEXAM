const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  examTaken: {
    type: Boolean,
    required: true,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model('user',userSchema)