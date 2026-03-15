import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// ─── Static Data ─────────────────────────────────────────────────────────────
const workerData = {
  id: "WRK-4821",
  name: "Ravi Kumar",
  role: "Site Operator – Zone B",
  shift: "Morning  06:00 – 14:00",
  site: "SMC Unit 3, Solapur",
  avatar: "RK",
  phone: "+91 98765 43210",
  address: "Plot 14, Kamgar Nagar, Solapur – 413001",
  joiningDate: "15 Apr 2021",
  employeeCode: "EMP-0824",
  department: "Sanitation & Drainage",
  health: {
    hydration: "Good",
    lastCheckup: "12 Mar 2026",
    nextCheckup: "12 Jun 2026",
    status: "Active",
    bloodGroup: "B+",
    fitnessLevel: "Good",
    height: "5 ft 8 in",
    weight: "72 kg",
    bp: "120/80 mmHg",
    diseases: ["Mild Hypertension", "Seasonal Allergies"],
    emergencyContact: "Priya Kumar",
    emergencyPhone: "+91 99887 65432",
    insuranceNo: "INS-MH-20241182",
    ppeCompliance: "98%",
    vaccinations: ["Hepatitis B", "Tetanus"],
  },
};

const manholeOp = {
  id: "MH-OPS-4471",
  manholeId: "MH-2024-B7",
  location: "Ward 12, Near Solapur Bus Stand, Zone B",
  type: "Sewer Inspection & Desilting",
  startTime: "08:15 AM",
  estimatedEnd: "11:30 AM",
  supervisor: "Anjali Mehta",
  permit: "WP-2026-0391",
  safetyLevel: "Medium",
  gasTypes: [
    { formula: "H₂S", risk: "High" },
    { formula: "CH₄", risk: "High" },
    { formula: "CO", risk: "Medium" },
    { formula: "CO₂", risk: "Medium" },
    { formula: "NH₃", risk: "Medium" },
    { formula: "O₂↓", risk: "High" },
  ],
  ppe: ["Helmet", "Harness", "Gas Mask", "Rubber Boots", "Gloves"],
  waterLevel: "0.3 m (Low)",
  flowStatus: "Partially Blocked",
  remarks: "Grease accumulation detected near inlet. No structural cracks observed.",
};

const STATUS_CONFIG = {
  Active: { bg: "#d1fae5", color: "#065f46", dot: "#22c55e" },
  Injured: { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
  "On Leave": { bg: "#fef9c3", color: "#854d0e", dot: "#eab308" },
};

const FEATURES = [
  {
    icon: "🛡",
    title: "Real-Time Safety Monitoring",
    desc: "Live sensor readings for gas levels, oxygen, and water flow are tracked during every operation.",
  },
  {
    icon: "📋",
    title: "Digital Work Permits",
    desc: "All manhole entry operations require a digitally approved work permit before work begins.",
  },
  {
    icon: "🩺",
    title: "Worker Health Tracking",
    desc: "Your health records, fitness level, and medical history are maintained and reviewed regularly.",
  },
  {
    icon: "🔔",
    title: "Instant Incident Alerts",
    desc: "Any gas leak, injury, or equipment failure is immediately reported to supervisors and control room.",
  },
  {
    icon: "📍",
    title: "Location & Zone Mapping",
    desc: "Every operation is geo-tagged to its ward and zone for accurate record-keeping and accountability.",
  },
  {
    icon: "💬",
    title: "Query & Grievance System",
    desc: "Workers can raise queries or report workplace issues directly through the portal at any time.",
  },
];

const SAFETY_RULES = [
  "Always wear your full PPE before entering the work zone.",
  "Report any gas or chemical smell to the supervisor immediately.",
  "Never enter a confined space without a second person present.",
  "Drink water every 30 minutes to stay hydrated on site.",
  "Check gas detector readings before and after every entry.",
  "Ensure the supervisor approves your entry before descending.",
];

// ─── Shared ───────────────────────────────────────────────────────────────────
function SectionCard({ title, icon, children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      {title && (
        <h3 className="font-semibold text-sm text-gray-800 pl-2 border-l-4 border-[#0b4f6c] mb-4 flex items-center gap-2">
          {icon && <span>{icon}</span>} {title}
        </h3>
      )}
      {children}
    </div>
  );
}

function Row({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between items-start py-1.5 border-b border-gray-50 last:border-b-0">
      <span className="text-xs text-gray-500 w-36 flex-shrink-0">{label}</span>
      <span className={`text-xs text-gray-800 font-medium text-right ${valueClass}`}>{value}</span>
    </div>
  );
}

// ─── Worker Card (renamed to worker's name) ───────────────────────────────────
function WorkerCard() {
  const [health, setHealth] = useState({ ...workerData.health });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...workerData.health });

  const statusCfg = STATUS_CONFIG[health.status] || STATUS_CONFIG.Active;

  function save() {
    setHealth({ ...draft });
    setEditing(false);
  }

  return (
    <SectionCard>
      {/* Header: avatar + name + status */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-[#0b4f6c] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {workerData.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-base text-gray-900 leading-tight">{workerData.name}</h3>
              <p className="text-xs text-gray-500">{workerData.role}</p>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 flex items-center gap-1.5"
              style={{ background: statusCfg.bg, color: statusCfg.color }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: statusCfg.dot, display: "inline-block" }} />
              {health.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">🩸 {health.bloodGroup}</span>
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">💪 {health.fitnessLevel}</span>
            <span className="text-xs bg-[#0b4f6c]/10 text-[#0b4f6c] px-2 py-0.5 rounded-full">PPE {health.ppeCompliance}</span>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Personal Details</p>
        <Row label="Department" value={workerData.department} />
        <Row label="Shift" value={workerData.shift} />
        <Row label="Joining Date" value={workerData.joiningDate} />
        <Row label="Phone" value={workerData.phone} />
        <Row label="Address" value={workerData.address} />
      </div>

      {/* Health Info */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Health Details</p>
        <Row label="Last Checkup" value={health.lastCheckup} />
        <div className="flex justify-between items-start py-1.5 border-b border-gray-50">
          <span className="text-xs text-gray-500 w-36 flex-shrink-0">Medical Notes</span>
          <div className="flex flex-wrap gap-1 justify-end">
            {health.diseases.map((d) => (
              <span key={d} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency & Insurance */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Emergency & Insurance</p>
        <Row label="Emergency Contact" value={health.emergencyContact} />
        <Row label="Emergency Phone" value={health.emergencyPhone} valueClass="text-red-600" />
        <Row label="Insurance No." value={health.insuranceNo} />
      </div>

      {/* Edit toggle */}
      {!editing ? (
        <button
          onClick={() => { setDraft({ ...health }); setEditing(true); }}
          className="w-full mt-1 border border-[#0b4f6c] text-[#0b4f6c] text-xs py-2 rounded-lg hover:bg-[#0b4f6c] hover:text-white transition-colors font-medium"
        >
          Edit My Details
        </button>
      ) : (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 mt-2">Update Status</p>
          {["Active", "Injured", "On Leave"].map((s) => (
            <label key={s} className="flex items-center gap-2 py-1.5 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={draft.status === s}
                onChange={() => setDraft({ ...draft, status: s })}
                className="accent-[#0b4f6c]"
              />
              <span className="text-sm text-gray-700">{s}</span>
            </label>
          ))}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-3 mb-2">Hydration</p>
          {["Good", "Moderate", "Low"].map((h) => (
            <label key={h} className="flex items-center gap-2 py-1.5 cursor-pointer">
              <input
                type="radio"
                name="hydration"
                checked={draft.hydration === h}
                onChange={() => setDraft({ ...draft, hydration: h })}
                className="accent-[#0b4f6c]"
              />
              <span className="text-sm text-gray-700">{h}</span>
            </label>
          ))}
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="flex-1 bg-[#0b4f6c] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#083d54]">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="flex-1 border border-gray-300 text-sm py-2 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Operation Card ───────────────────────────────────────────────────────────
function OperationCard() {
  const op = manholeOp;
  const riskColor = { High: "bg-red-50 text-red-700", Medium: "bg-yellow-50 text-yellow-700", Low: "bg-green-50 text-green-700" };

  return (
    <SectionCard icon="🕳️" title="Ongoing Operation">
      <p className="font-bold text-sm text-gray-900 mb-0.5">{op.type}</p>
      <p className="text-xs text-gray-500 mb-4">{op.location}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Operation Info</p>
        <Row label="Operation ID" value={op.id} />
        <Row label="Manhole" value={op.manholeId} />
        <Row label="Supervisor" value={op.supervisor} />
        <Row label="Water Level" value={op.waterLevel} />
        <Row label="Flow Status" value={op.flowStatus} valueClass="text-orange-600" />
        <Row label="Safety Level" value={op.safetyLevel} valueClass="text-yellow-700" />
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Gas Risks</p>
        <div className="flex flex-wrap gap-1.5">
          {op.gasTypes.map((g) => (
            <span key={g.formula} className={`text-xs px-2.5 py-1 rounded-full font-medium ${riskColor[g.risk]}`}>
              {g.formula} · {g.risk}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">PPE Required</p>
        <div className="flex flex-wrap gap-1.5">
          {op.ppe.map((p) => (
            <span key={p} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">✓ {p}</span>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 border-l-4 border-yellow-400">
        <strong>Remarks:</strong> {op.remarks}
      </div>
    </SectionCard>
  );
}

// ─── Query Card ───────────────────────────────────────────────────────────────
function QueryCard() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    if (!title || !type) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTitle(""); setDesc(""); setType(""); }, 3000);
  }

  return (
    <SectionCard icon="💬" title="Raise Query">
      {submitted ? (
        <div className="text-center py-6">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-sm font-semibold text-green-700">Query Submitted</p>
          <p className="text-xs text-gray-500 mt-1">Your supervisor will respond within 24 hours.</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Query Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-[#0b4f6c]"
            >
              <option value="">Select type</option>
              <option>PPE Complaint</option>
              <option>Safety Concern</option>
              <option>Health Issue</option>
              <option>Leave Request</option>
              <option>Salary / Allowance</option>
              <option>Equipment Fault</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Title</label>
            <input
              className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:border-[#0b4f6c] text-gray-800"
              placeholder="Brief title of your query"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 resize-none focus:outline-none focus:border-[#0b4f6c] text-gray-800"
              rows={4}
              placeholder="Describe your issue in detail..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <button
            onClick={submit}
            disabled={!title || !type}
            className="w-full bg-[#0b4f6c] disabled:opacity-40 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#083d54] transition-colors"
          >
            Submit Query
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Your query is sent directly to your supervisor
          </p>
        </>
      )}
    </SectionCard>
  );
}

// ─── Main Worker Page ─────────────────────────────────────────────────────────
export default function Worker() {
  const { i18n } = useTranslation();
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Top bar */}
      <div className="bg-[#0b4f6c] text-white text-xs flex justify-between px-6 py-2">
        <span>📞 1800-233-1234 | contact@solapurcorporation.gov.in</span>
        <span>Government of Maharashtra</span>
      </div>

      {/* Header — same as supervisor */}
      <div className="bg-[#0b4f6c] text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
            SMC
          </div>
          <div>
            <h2 className="text-lg font-semibold">Solapur Municipal Corporation</h2>
            <p className="text-sm opacity-80">Manhole Safety Monitoring Portal</p>
            <p className="text-xs opacity-60">Government of Maharashtra</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded">
            Worker
          </span>
          <button
            onClick={toggleLanguage}
            className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded hover:bg-white/20 transition-colors"
          >
            🌐 {i18n.language === "en" ? "मराठी" : "English"}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 bg-[#083d54]">
        {[
          { num: workerData.id, label: "Worker ID" },
          { num: "Morning", label: "Current Shift" },
          { num: "98%", label: "PPE Compliance" },
          { num: "Active", label: "Duty Status", accent: true },
        ].map((s, i) => (
          <div key={i} className="py-3 text-center border-r border-white/10 last:border-r-0">
            <p className={`text-lg font-bold ${s.accent ? "text-yellow-400" : "text-white"}`}>{s.num}</p>
            <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Three main cards */}
      <div className="grid grid-cols-3 gap-6 px-8 py-8">
        <WorkerCard />
        <OperationCard />
        <QueryCard />
      </div>

      {/* Features Section */}
      <div className="px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-sm text-gray-800 pl-2 border-l-4 border-[#0b4f6c] mb-5">
            Portal Features
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{f.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Rules */}
        <div className="bg-[#083d54] rounded-lg p-6">
          <h3 className="font-semibold text-white text-sm pl-2 border-l-4 border-yellow-400 mb-4">
            ⚠ Daily Safety Reminders
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {SAFETY_RULES.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg px-4 py-3">
                <span className="text-yellow-400 font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
                <span className="text-white/80 text-xs leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
