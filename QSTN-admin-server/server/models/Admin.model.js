const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The name is required"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  }
});

module.exports = mongoose.model('admin', AdminSchema);