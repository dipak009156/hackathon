const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema(
  {
    supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: "Supervisor", required: true },
    manholeId:    { type: mongoose.Schema.Types.ObjectId, ref: "Manhole",    required: true },
    workers:      [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
    status:       { type: String, enum: ["Active", "Completed", "Cancelled"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("operation", operationSchema);