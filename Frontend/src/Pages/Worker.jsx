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
  Active:     { bg: "#d1fae5", color: "#065f46", dot: "🟢" },
  Injured:    { bg: "#fee2e2", color: "#991b1b", dot: "🔴" },
  "On Leave": { bg: "#fef9c3", color: "#854d0e", dot: "🟡" },
};

const BLOOD_GROUPS   = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
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
    { name: "Hydrogen Sulphide", formula: "H₂S",  risk: "High",   source: "Decomposing organic matter" },
    { name: "Methane",           formula: "CH₄",  risk: "High",   source: "Anaerobic decomposition" },
    { name: "Carbon Monoxide",   formula: "CO",   risk: "Medium", source: "Incomplete combustion" },
    { name: "Carbon Dioxide",    formula: "CO₂",  risk: "Medium", source: "Organic decay / respiration" },
    { name: "Ammonia",           formula: "NH₃",  risk: "Medium", source: "Sewage & urine breakdown" },
    { name: "Oxygen Deficiency", formula: "O₂↓",  risk: "High",   source: "Displacement by other gases" },
  ],
  safetyLevel: "Medium",
  ppe: ["Helmet", "Harness", "Gas Mask", "Rubber Boots", "Gloves"],
  equipmentUsed: ["Jet Rodder Machine", "Suction Tanker", "Gas Detector", "Safety Tripod & Winch"],
  siltVolume: "~180 litres estimated",
  waterLevel: "0.3 m (Low)",
  flowStatus: "Partially Blocked",
  remarks: "Grease accumulation detected near inlet. No structural cracks observed.",
};

// ── Health Card ────────────────────────────────────────────────
const HealthCard = () => {
  const [health, setHealth]         = useState({ ...workerData.health });
  const [editing, setEditing]       = useState(false);
  const [draft, setDraft]           = useState({ ...workerData.health });
  const [newDisease, setNewDisease] = useState("");

  const statusCfg = STATUS_CONFIG[health.status] || STATUS_CONFIG.Active;

  const openEdit = () => { setDraft({ ...health }); setEditing(true); };
  const cancel   = () => { setEditing(false); setNewDisease(""); };
  const save     = () => { setHealth({ ...draft }); setEditing(false); setNewDisease(""); };

  const addDisease = () => {
    const d = newDisease.trim();
    if (d && !draft.diseases.includes(d))
      setDraft(p => ({ ...p, diseases: [...p.diseases, d] }));
    setNewDisease("");
  };

  const removeDisease = d =>
    setDraft(p => ({ ...p, diseases: p.diseases.filter(x => x !== d) }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-base pl-2 border-l-4 border-[#0b4f6c]">
          🪪 Ravi Kumar's Health Card
        </h3>
        {!editing && (
          <button onClick={openEdit}
            className="text-xs text-[#0b4f6c] font-semibold border border-[#0b4f6c] px-2.5 py-1 rounded-lg hover:bg-[#0b4f6c] hover:text-white transition-colors">
            ✏️ Edit
          </button>
        )}
      </div>

      <div className="flex items-start gap-2 mb-4 mt-3 flex-wrap">
        {!editing ? (
          <>
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: statusCfg.bg, color: statusCfg.color }}>
              {statusCfg.dot} {health.status}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              🩸 {health.bloodGroup}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
              💪 {health.fitnessLevel}
            </span>
          </>
        ) : (
          <div className="flex flex-wrap gap-3 w-full">
            <div className="flex flex-col gap-0.5">
              <label className="text-gray-400 text-xs uppercase tracking-wide">Status</label>
              <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 outline-none focus:border-[#0b4f6c]"
                value={draft.status} onChange={e => setDraft(p => ({ ...p, status: e.target.value }))}>
                {Object.keys(STATUS_CONFIG).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="text-gray-400 text-xs uppercase tracking-wide">Blood Group</label>
              <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 outline-none focus:border-[#0b4f6c]"
                value={draft.bloodGroup} onChange={e => setDraft(p => ({ ...p, bloodGroup: e.target.value }))}>
                {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="text-gray-400 text-xs uppercase tracking-wide">Fitness</label>
              <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 outline-none focus:border-[#0b4f6c]"
                value={draft.fitnessLevel} onChange={e => setDraft(p => ({ ...p, fitnessLevel: e.target.value }))}>
                {FITNESS_LEVELS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-semibold">Known Conditions / Diseases</p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {(editing ? draft : health).diseases.length === 0 && (
            <span className="text-gray-400 text-xs italic">None recorded</span>
          )}
          {(editing ? draft : health).diseases.map(d => (
            <span key={d} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}>
              🏥 {d}
              {editing && (
                <button onClick={() => removeDisease(d)}
                  className="ml-1 text-red-400 hover:text-red-600 font-bold leading-none">×</button>
              )}
            </span>
          ))}
        </div>
        {editing && (
          <div className="flex gap-2">
            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-[#0b4f6c]"
              placeholder="Add condition..." value={newDisease}
              onChange={e => setNewDisease(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addDisease()} />
            <button onClick={addDisease} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
              style={{ background: "#0b4f6c" }}>+ Add</button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100">
        <span className="text-gray-400 text-xs uppercase tracking-wide">Hydration</span>
        <span className="font-semibold text-gray-600 text-sm">{health.hydration}</span>
        <span className="text-gray-400 text-xs uppercase tracking-wide">Last Checkup</span>
        <span className="font-semibold text-gray-600 text-sm">{health.lastCheckup}</span>
      </div>

      {editing && (
        <div className="flex gap-2 mt-4">
          <button onClick={save} className="flex-1 py-2 rounded-lg text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #0b4f6c, #1a7fa5)" }}>
            Save Changes ✓
          </button>
          <button onClick={cancel}
            className="flex-1 py-2 rounded-lg text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// ── Operation Card ─────────────────────────────────────────────
const OperationCard = () => {
  const op = manholeOp;
  const safetyColors = { Low: "#16a34a", Medium: "#d97706", High: "#dc2626" };

  const rows = pairs => pairs.map(([k, v]) => (
    <div key={k} className="flex justify-between items-start py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-gray-400 text-xs uppercase tracking-wide w-36 flex-shrink-0">{k}</span>
      <span className="font-semibold text-gray-700 text-xs text-right">{v}</span>
    </div>
  ));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-base mb-1 pl-2 border-l-4 border-[#0b4f6c] flex items-center gap-2">
        🕳️ Ongoing Operation
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: "#dbeafe", color: "#1e40af" }}>● Live</span>
      </h3>

      <p className="font-bold text-gray-800 text-sm mt-3 mb-0.5">{op.type}</p>
      <p className="text-gray-400 text-xs mb-3">{op.id} · Permit: {op.permit}</p>

      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Manhole Details</p>
        {rows([
          ["Manhole ID",   op.manholeId],
          ["Location",     op.location],
          ["Type",         op.manholeType],
          ["Sub-Type",     op.subType],
          ["Room Type",    op.roomType],
          ["Last Cleaned", op.lastCleaned],
        ])}
      </div>

      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Current Condition</p>
        {rows([
          ["Water Level", op.waterLevel],
          ["Flow Status", op.flowStatus],
          ["Blockage",    op.blockageLevel],
          ["Silt Volume", op.siltVolume],
        ])}
        <div className="mt-1.5">
          <span className="text-gray-400 text-xs uppercase tracking-wide">Remarks</span>
          <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{op.remarks}</p>
        </div>
      </div>

     <div className="flex flex-wrap gap-1.5">
  {op.gasTypes.map(g => {
    const riskColor = g.risk === "High" ? { bg: "#fee2e2", color: "#991b1b" } : { bg: "#fef9c3", color: "#854d0e" };
    return (
      <span key={g.formula} className="text-xs font-bold px-3 py-1 rounded-full"
        style={{ background: riskColor.bg, color: riskColor.color }}>
        {g.formula} — {g.name}
      </span>
    );
  })}
</div>

      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">PPE & Equipment</p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {op.ppe.map(p => (
            <span key={p} className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "#d1fae5", color: "#065f46" }}>✓ {p}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {op.equipmentUsed.map(e => (
            <span key={e} className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "#dbeafe", color: "#1e40af" }}>⚙ {e}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
        <span className="text-gray-400 text-xs uppercase tracking-wide">Supervisor</span>
        <span className="font-semibold text-gray-600 text-xs">{op.supervisor}</span>
        <span className="text-gray-400 text-xs uppercase tracking-wide">Safety</span>
        <span className="font-bold text-xs" style={{ color: safetyColors[op.safetyLevel] }}>{op.safetyLevel}</span>
        <span className="text-gray-400 text-xs uppercase tracking-wide">Time</span>
        <span className="font-semibold text-gray-600 text-xs">{op.startTime} → {op.estimatedEnd}</span>
      </div>
    </div>
  );
};

// ── Query Card ─────────────────────────────────────────────────
const QueryCard = () => {
  const [title, setTitle]         = useState("");
  const [desc, setDesc]           = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTitle(""); setDesc(""); }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-base mb-4 pl-2 border-l-4 border-[#0b4f6c]">💬 Raise a Query</h3>
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm font-semibold text-center">
          ✅ Query submitted! Your supervisor has been notified.
        </div>
      ) : (
        <>
          <div className="mb-3">
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1 font-semibold">Query Title</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#0b4f6c]"
              placeholder="e.g. Safety gear missing at Zone B" value={title}
              onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1 font-semibold">Description</label>
            <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#0b4f6c] resize-none"
              rows={4} placeholder="Describe your issue or concern in detail..."
              value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <button className="w-full py-2.5 rounded-lg text-sm font-bold text-white transition-opacity"
            style={{ background: "linear-gradient(135deg, #0b4f6c, #1a7fa5)", opacity: title && desc ? 1 : 0.4, cursor: title && desc ? "pointer" : "not-allowed" }}
            onClick={handleSubmit} disabled={!title || !desc}>
            Submit Query →
          </button>
        </>
      )}
    </div>
  );
};

// ── Main Worker Component ──────────────────────────────────────
const Worker = () => {
  const { i18n } = useTranslation();
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="bg-[#0b4f6c] text-white text-xs flex justify-between px-6 py-2">
        <span>📞 1800-233-1234 | contact@solapurcorporation.gov.in</span>
        <span>Government of Maharashtra</span>
      </div>

      <div className="bg-[#0b4f6c] text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="SMC Logo" className="w-14 h-14 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">Solapur Municipal Corporation</h2>
            <p className="text-sm">Worker Safety &amp; Operations Portal</p>
            <p className="text-xs opacity-75">Government of Maharashtra</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={toggleLanguage} className="bg-white text-black text-sm px-4 py-1.5 rounded">
            🌐 {i18n.language === "en" ? "मराठी" : "English"}
          </button>
          <span className="bg-yellow-400 text-black font-semibold text-xs px-3 py-1.5 rounded">🟢 On Duty</span>
        </div>
      </div>

      <div className="grid grid-cols-4 bg-[#083d54]">
        {[
          { num: "1,240+", label: "Workers Registered" },
          { num: "98%",    label: "PPE Compliance" },
          { num: "24/7",   label: "Monitoring Active" },
          { num: "0",      label: "Incidents This Month" },
        ].map((s, i) => (
          <div key={i} className="py-3 text-center border-r border-white/10 last:border-r-0">
            <p className="text-yellow-400 text-lg font-bold">{s.num}</p>
            <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-200 flex justify-between items-center px-10 py-10 gap-8">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Welcome back, {workerData.name} 👷</h1>
          <p className="text-gray-600 mb-2 text-sm">
            <span className="font-semibold text-[#0b4f6c]">Worker ID:</span> {workerData.id}&nbsp;|&nbsp;
            <span className="font-semibold text-[#0b4f6c]">Role:</span> {workerData.role}
          </p>
          <p className="text-gray-600 mb-5 text-sm">
            <span className="font-semibold text-[#0b4f6c]">Site:</span> {workerData.site}&nbsp;|&nbsp;
            <span className="font-semibold text-[#0b4f6c]">Shift:</span> {workerData.shift}
          </p>
          <div className="flex flex-wrap gap-2">
            {["🛡 PPE Compliant", "⚠ Alert Active", "📍 Zone B"].map(b => (
              <span key={b} className="bg-[#0b4f6c] text-white text-xs px-4 py-2 rounded-full">{b}</span>
            ))}
          </div>
        </div>
        <div className="w-36 h-36 rounded-full flex items-center justify-center text-5xl font-black text-white shadow-lg flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0b4f6c, #1a7fa5)" }}>
          {workerData.avatar}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 px-10 py-10">
        <HealthCard />
        <OperationCard />
        <QueryCard />
      </div>

      <div className="grid grid-cols-3 gap-6 px-10 pb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">Safety Guidelines</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            {["Mandatory use of PPE at all times on site", "Environmental condition checks before each shift",
              "Supervisor approval required before confined entry", "Immediate hazard reporting to control room",
              "Emergency exits must remain clear and unblocked"].map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">Today's Safety Tips</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            {safetyTips.map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-yellow-500 mt-0.5 flex-shrink-0">⚠</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">SMC Initiatives</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            {["Smart Cities Mission", "Digital India Programme", "Urban Sanitation Safety",
              "Zero Incident Workplace Goal", "Worker Health & Dignity Drive"].map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 px-10 pb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">About SMC</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Solapur Municipal Corporation is responsible for maintaining urban infrastructure
            and sanitation services across the city of Solapur, Maharashtra. SMC actively
            works to protect and empower its frontline sanitation workforce through smart
            monitoring systems and dedicated welfare programmes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">Our Mission</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            To ensure the safety, dignity, and efficiency of sanitation operations through
            modern IoT-based monitoring, real-time health tracking, and smart city
            technologies — placing the wellbeing of every worker at the centre of all
            municipal operations.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Worker;