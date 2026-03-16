const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    deviceType: {
      type: String,
      required: true,
      enum: ["Gas Sensor", "Water Level Sensor", "Temperature Sensor", "Camera", "GPS Tracker"],
    },

    firmwareVersion: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Available", "InUse", "Faulty"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("device", deviceSchema);
