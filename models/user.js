const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  }
}, {
  timestamps: true,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;