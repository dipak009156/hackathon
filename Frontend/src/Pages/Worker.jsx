import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const workerData = {
  id: "WRK-4821",
  name: "Ravi Kumar",
  role: "Site Operator – Zone B",
  shift: "Morning  06:00 – 14:00",
  site: "SMC Unit 3, Solapur",
  avatar: "RK",
  health: {
    hydration: "Good",
    lastCheckup: "12 Mar 2026",
    status: "Active",
    bloodGroup: "B+",
    fitnessLevel: "Good",
    diseases: ["Mild Hypertension", "Seasonal Allergies"],
  },
};

const safetyTips = [
  "Always wear your PPE before entering the work zone.",
  "Report any gas or chemical smell to the supervisor immediately.",
  "Never enter confined spaces without a second person present.",
  "Drink water every 30 minutes to stay hydrated on site.",
];

const STATUS_CONFIG = {
  Active: { bg: "#d1fae5", color: "#065f46", dot: "🟢" },
  Injured: { bg: "#fee2e2", color: "#991b1b", dot: "🔴" },
  "On Leave": { bg: "#fef9c3", color: "#854d0e", dot: "🟡" },
};

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const FITNESS_LEVELS = ["Excellent", "Good", "Fair", "Poor"];

const manholeOp = {
  id: "MH-OPS-4471",
  manholeId: "MH-2024-B7",
  location: "Ward 12, Near Solapur Bus Stand, Zone B",
  type: "Sewer Inspection & Desilting",
  startTime: "08:15 AM",
  estimatedEnd: "11:30 AM",
  supervisor: "Anjali Mehta",
  permit: "WP-2026-0391",
  manholeType: "Sewer",
  subType: "Drainage Chamber",
  roomType: "Large Room (Junction Chamber)",
  lastCleaned: "14 Jan 2026",
  blockageLevel: "Moderate",
  gasTypes: [
    { name: "Hydrogen Sulphide", formula: "H₂S", risk: "High" },
    { name: "Methane", formula: "CH₄", risk: "High" },
    { name: "Carbon Monoxide", formula: "CO", risk: "Medium" },
    { name: "Carbon Dioxide", formula: "CO₂", risk: "Medium" },
    { name: "Ammonia", formula: "NH₃", risk: "Medium" },
    { name: "Oxygen Deficiency", formula: "O₂↓", risk: "High" },
  ],
  safetyLevel: "Medium",
  ppe: ["Helmet", "Harness", "Gas Mask", "Rubber Boots", "Gloves"],
  equipmentUsed: [
    "Jet Rodder Machine",
    "Suction Tanker",
    "Gas Detector",
    "Safety Tripod & Winch",
  ],
  siltVolume: "~180 litres estimated",
  waterLevel: "0.3 m (Low)",
  flowStatus: "Partially Blocked",
  remarks:
    "Grease accumulation detected near inlet. No structural cracks observed.",
};

const HealthCard = () => {
  const [health, setHealth] = useState({ ...workerData.health });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...workerData.health });

  const statusCfg = STATUS_CONFIG[health.status] || STATUS_CONFIG.Active;

  const openEdit = () => {
    setDraft({ ...health });
    setEditing(true);
  };

  const save = () => {
    setHealth({ ...draft });
    setEditing(false);
  };

  const cancel = () => setEditing(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold border-l-4 pl-2 border-[#0b4f6c]">
          🪪 Health Card
        </h3>

        {!editing && (
          <button
            onClick={openEdit}
            className="text-xs border px-2 py-1 rounded border-[#0b4f6c]"
          >
            Edit
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: statusCfg.bg, color: statusCfg.color }}
        >
          {statusCfg.dot} {health.status}
        </span>

        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700">
          🩸 {health.bloodGroup}
        </span>

        <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700">
          💪 {health.fitnessLevel}
        </span>
      </div>

      <div className="text-sm text-gray-600">
        Hydration: {health.hydration}
        <br />
        Last Checkup: {health.lastCheckup}
      </div>

      {editing && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={save}
            className="bg-[#0b4f6c] text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={cancel}
            className="border px-4 py-2 rounded text-gray-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const OperationCard = () => {
  const op = manholeOp;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold border-l-4 pl-2 border-[#0b4f6c] mb-4">
        🕳️ Ongoing Operation
      </h3>

      <p className="font-bold">{op.type}</p>
      <p className="text-sm text-gray-500 mb-3">{op.location}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {op.gasTypes.map((g) => (
          <span
            key={g.formula}
            className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700"
          >
            {g.formula}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {op.ppe.map((p) => (
          <span
            key={p}
            className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700"
          >
            ✓ {p}
          </span>
        ))}
      </div>
    </div>
  );
};

const QueryCard = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold border-l-4 pl-2 border-[#0b4f6c] mb-3">
        💬 Raise Query
      </h3>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Query title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded mb-3"
        rows="3"
        placeholder="Describe issue..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="w-full bg-[#0b4f6c] text-white py-2 rounded">
        Submit
      </button>
    </div>
  );
};

const Worker = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#0b4f6c] text-white flex justify-between px-6 py-4">
        <h2>SMC Worker Safety Portal</h2>

        <button
          onClick={toggleLanguage}
          className="bg-white text-black px-3 py-1 rounded"
        >
          🌐 Language
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 p-10">
        <HealthCard />
        <OperationCard />
        <QueryCard />
      </div>
    </div>
  );
};

export default Worker;