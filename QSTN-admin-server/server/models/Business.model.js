const mongoose = require('mongoose')

const BusinessSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    display_name: {
        type: String,
    },
    bio: {
        type: String,
    },
    image: {
        type: String,
    },
})

module.exports = mongoose.model('business', BusinessSchema);