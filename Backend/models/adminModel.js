const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        minlength: 2,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('admin', adminSchema)