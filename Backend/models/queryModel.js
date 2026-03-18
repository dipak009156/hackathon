const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({

    queryType: {
        type: String,
        required: true,
        enum: [
            "PPE Complaint",
            "Safety Concern",
            "Health Issue",
            "Leave Request",
            "Salary / Allowance",
            "Equipment Fault",
            "Other"
        ]
    },

    queryTitle: {
        type: String,
        required: true
    },

    queryDescription: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("query", querySchema);