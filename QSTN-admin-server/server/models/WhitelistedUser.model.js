const mongoose = require('mongoose');


const WhiteListedUserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('whitelistedUser', WhiteListedUserSchema);