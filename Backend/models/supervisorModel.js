const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    aadhaarNumber: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required : true
    },

    assignedZone: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: [
            "Cleaning Supervisor",
            "Sewer Supervisor",
            "Drainage / Nala Supervisor",
            "Garbage Collection Supervisor",
            "Public Toilet Supervisor",
            "Solid Waste Management Supervisor"
        ]
    },

    residentialAddress: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "supervisor"
    }

}, { timestamps: true });

module.exports = mongoose.model("supervisor", supervisorSchema);