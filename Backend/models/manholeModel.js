const mongoose = require("mongoose");
 
const manholeSchema = new mongoose.Schema(
  {
    manholeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
 
    zone: {
      type: String,
      required: true,
      enum: ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"],
    },
 
    manholeType: {
      type: String,
      required: true,
      enum: ["Sewer", "Stormwater", "Combined", "Telecom"],
    },
 
    landmark: {
      type: String,
      required: true,
      trim: true,
    },

    // Only for Sewer / Stormwater / Combined
    depth:      { type: Number, default: null }, // meters
    waterLevel: { type: Number, default: null }, // meters from bottom
 
    // Gas readings — only for Sewer / Stormwater / Combined
    gasH2S: { type: Number, default: null }, // Hydrogen Sulphide (ppm)
    gasCH4: { type: Number, default: null }, // Methane (ppm)
    gasCO:  { type: Number, default: null }, // Carbon Monoxide (ppm)
    gasO2:  { type: Number, default: null }, // Oxygen level (%)
 
    status: {
      type: String,
      required: true,
      enum: ["Safe", "Caution", "Danger"],
      default: "Safe",
    },
 
    lastInspectedDate: { type: Date, default: null },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Manhole", manholeSchema);