const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  designation: String,
  gender: String,
  course: String,
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);