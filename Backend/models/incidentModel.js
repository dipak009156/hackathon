// models/incidentModel.js
const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    operationId:  { type: mongoose.Schema.Types.ObjectId, ref: "operation", required: true },
    supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: "supervisor", required: true },
    manholeId:    { type: mongoose.Schema.Types.ObjectId, ref: "manhole",    required: true },
    reason:       { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("incident", incidentSchema);