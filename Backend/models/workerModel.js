const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    currentOperation :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'operation',
        default : null
    },

    department: {
        type: String,
        default: "Sanitation & Drainage"
    },

    shift: {
        type: String
    },

    joiningDate: {
        type: Date
    },

    phone: {
        type: String
    },

    address: {
        type: String
    },

    healthDetails: {

        lastCheckup: {
            type: Date
        },

        medicalNotes: {
            type: String
        }

    },

    emergency: {

        contactName: {
            type: String
        },

        contactPhone: {
            type: String
        }

    },

    insuranceNumber: {
        type: String
    },

    role: {
        type: String,
        default: "worker"
    }

}, { timestamps: true });

module.exports = mongoose.model("worker", workerSchema);