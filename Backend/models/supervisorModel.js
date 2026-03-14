const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const supervisorSchema = mongoose.Schema({
    email: {
        type: String,
        minlength: 2,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type : String,
        default : 'supervisor'
    }
})


module.exports = mongoose.model('supervisor', supervisorSchema)