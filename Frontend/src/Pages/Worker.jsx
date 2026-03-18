import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Api from "../utils/Api";

// ─── Static content (no API needed) ──────────────────────────────────────────

const FEATURES = [
  { icon: "🛡", title: "Real-Time Safety Monitoring", desc: "Live sensor readings for gas levels, oxygen, and water flow are tracked during every operation." },
  { icon: "📋", title: "Digital Work Permits", desc: "All manhole entry operations require a digitally approved work permit before work begins." },
  { icon: "🩺", title: "Worker Health Tracking", desc: "Your health records, fitness level, and medical history are maintained and reviewed regularly." },
  { icon: "🔔", title: "Instant Incident Alerts", desc: "Any gas leak, injury, or equipment failure is immediately reported to supervisors and control room." },
  { icon: "📍", title: "Location & Zone Mapping", desc: "Every operation is geo-tagged to its ward and zone for accurate record-keeping and accountability." },
  { icon: "💬", title: "Query & Grievance System", desc: "Workers can raise queries or report workplace issues directly through the portal at any time." },
];

const SAFETY_RULES = [
  "Always wear your full PPE before entering the work zone.",
  "Report any gas or chemical smell to the supervisor immediately.",
  "Never enter a confined space without a second person present.",
  "Drink water every 30 minutes to stay hydrated on site.",
  "Check gas detector readings before and after every entry.",
  "Ensure the supervisor approves your entry before descending.",
];

const STATUS_CONFIG = {
  Active: { bg: "#d1fae5", color: "#065f46", dot: "#22c55e" },
  Injured: { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
  "On Leave": { bg: "#fef9c3", color: "#854d0e", dot: "#eab308" },
};

// ─── Shared Components ────────────────────────────────────────────────────────

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
      <span className={`text-xs text-gray-800 font-medium text-right ${valueClass}`}>{value || "—"}</span>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-6 h-6 border-2 border-[#0b4f6c] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-4 py-3">
      ⚠ {message}
    </div>
  );
}

// ─── Worker Card ──────────────────────────────────────────────────────────────

function WorkerCard({ worker }) {
  // TODO: verify these field names match your worker schema:
  //   worker.name
  //   worker.role  (defaults to "worker")
  //   worker.department  (defaults to "Sanitation & Drainage")
  //   worker.shift
  //   worker.joiningDate
  //   worker.phone
  //   worker.address
  //   worker.healthDetails.lastCheckup
  //   worker.healthDetails.medicalNotes
  //   worker.emergency.contactName
  //   worker.emergency.contactPhone
  //   worker.insuranceNumber
  //   worker.status  (Active / Injured / On Leave)

  const [status, setStatus] = useState(worker.status || "Active");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(worker.status || "Active");

  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.Active;

  async function save() {
    try {
      // TODO: confirm PATCH endpoint for updating worker status
      await Api.get("/me", { status: draft });
      setStatus(draft);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  }

  return (
    <SectionCard>
      {/* Avatar + name + status badge */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-[#0b4f6c] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {worker.name?.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-base text-gray-900 leading-tight">{worker.name}</h3>
              <p className="text-xs text-gray-500">{worker.role || "Worker"}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 flex items-center gap-1.5"
              style={{ background: statusCfg.bg, color: statusCfg.color }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: statusCfg.dot, display: "inline-block" }} />
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Personal Details</p>
        <Row label="Department" value={worker.department} />
        <Row label="Shift" value={worker.shift} />
        <Row label="Joining Date" value={worker.joiningDate ? new Date(worker.joiningDate).toLocaleDateString("en-IN") : null} />
        <Row label="Phone" value={worker.phone} />
        <Row label="Address" value={worker.address} />
      </div>

      {/* Health */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Health Details</p>
        <Row label="Last Checkup" value={worker.healthDetails?.lastCheckup ? new Date(worker.healthDetails.lastCheckup).toLocaleDateString("en-IN") : null} />
        <Row label="Medical Notes" value={worker.healthDetails?.medicalNotes} />
      </div>

      {/* Emergency & Insurance */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Emergency & Insurance</p>
        <Row label="Emergency Contact" value={worker.emergency?.contactName} />
        <Row label="Emergency Phone" value={worker.emergency?.contactPhone} valueClass="text-red-600" />
        <Row label="Insurance No." value={worker.insuranceNumber} />
      </div>

      {/* Edit Status */}
      {!editing ? (
        <button onClick={() => { setDraft(status); setEditing(true); }}
          className="w-full mt-1 border border-[#0b4f6c] text-[#0b4f6c] text-xs py-2 rounded-lg hover:bg-[#0b4f6c] hover:text-white transition-colors font-medium">
          Edit My Details
        </button>
      ) : (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 mt-2">Update Status</p>
          {["Active", "Injured", "On Leave"].map((s) => (
            <label key={s} className="flex items-center gap-2 py-1.5 cursor-pointer">
              <input type="radio" name="status" checked={draft === s} onChange={() => setDraft(s)} className="accent-[#0b4f6c]" />
              <span className="text-sm text-gray-700">{s}</span>
            </label>
          ))}
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="flex-1 bg-[#0b4f6c] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#083d54]">Save</button>
            <button onClick={() => setEditing(false)} className="flex-1 border border-gray-300 text-sm py-2 rounded-lg hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Operation Card ───────────────────────────────────────────────────────────

function OperationCard() {
  const [op, setOp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOperation = async () => {
      try {
        // TODO: confirm endpoint — should return the active operation assigned to this worker
        // TODO: confirm field names: op.type, op.location, op.manholeId, op.supervisor,
        //   op.waterLevel, op.flowStatus, op.safetyLevel, op.gasTypes[], op.ppe[], op.remarks
        const res = await Api.get("/worker/operation/active");
        setOp(res.data);
      } catch (err) {
        setError("Could not load operation details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOperation();
  }, []);

  const riskColor = {
    High: "bg-red-50 text-red-700",
    Medium: "bg-yellow-50 text-yellow-700",
    Low: "bg-green-50 text-green-700",
  };

  if (loading) return <SectionCard icon="🕳️" title="Ongoing Operation"><LoadingSpinner /></SectionCard>;
  if (error) return <SectionCard icon="🕳️" title="Ongoing Operation"><ErrorBox message={error} /></SectionCard>;
  if (!op) return (
    <SectionCard icon="🕳️" title="Ongoing Operation">
      <div className="text-center py-8 text-gray-400 text-sm">No active operation assigned.</div>
    </SectionCard>
  );

  return (
    <SectionCard icon="🕳️" title="Ongoing Operation">
      <p className="font-bold text-sm text-gray-900 mb-0.5">{op.type}</p>
      <p className="text-xs text-gray-500 mb-4">{op.location}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Operation Info</p>
        <Row label="Operation ID" value={op._id || op.id} />
        <Row label="Manhole" value={op.manholeId} />
        <Row label="Supervisor" value={op.supervisor} />
        <Row label="Water Level" value={op.waterLevel} />
        <Row label="Flow Status" value={op.flowStatus} valueClass="text-orange-600" />
        <Row label="Safety Level" value={op.safetyLevel} valueClass="text-yellow-700" />
      </div>

      {op.gasTypes?.length > 0 && (
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
      )}

      {op.ppe?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">PPE Required</p>
          <div className="flex flex-wrap gap-1.5">
            {op.ppe.map((p) => (
              <span key={p} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">✓ {p}</span>
            ))}
          </div>
        </div>
      )}

      {op.remarks && (
        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 border-l-4 border-yellow-400">
          <strong>Remarks:</strong> {op.remarks}
        </div>
      )}
    </SectionCard>
  );
}

// ─── Query Card ───────────────────────────────────────────────────────────────

function QueryCard() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function submit() {
    if (!title || !type) return;
    setSubmitting(true);
    setError(null);
    try {
      // TODO: confirm POST endpoint and body field names
      await Api.post("/worker/send-query", { title, description: desc, type });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setTitle(""); setDesc(""); setType(""); }, 3000);
    } catch (err) {
      setError("Failed to submit query. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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
          {error && <div className="mb-3"><ErrorBox message={error} /></div>}

          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Query Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-[#0b4f6c]"
            >
              <option value="">Select type</option>
              <option value="PPE Complaint">PPE Complaint</option>
              <option value="Safety Concern">Safety Concern</option>
              <option value="Health Issue">Health Issue</option>
              <option value="Leave Request">Leave Request</option>
              <option value="Salary / Allowance">Salary / Allowance</option>
              <option value="Equipment Fault">Equipment Fault</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Title</label>
            <input className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:border-[#0b4f6c] text-gray-800"
              placeholder="Brief title of your query" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2 resize-none focus:outline-none focus:border-[#0b4f6c] text-gray-800"
              rows={4} placeholder="Describe your issue in detail..." value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <button onClick={submit} disabled={!title || !type || submitting}
            className="w-full bg-[#0b4f6c] disabled:opacity-40 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#083d54] transition-colors">
            {submitting ? "Submitting..." : "Submit Query"}
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">Your query is sent directly to your supervisor</p>
        </>
      )}
    </SectionCard>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WorkerPage() {
  const { i18n } = useTranslation();
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        // TODO: confirm endpoint — should return logged-in worker's full profile
        const res = await Api.get("/me");
        setWorker(res.data);
      } catch (err) {
        setError("Failed to load worker profile.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#0b4f6c] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow text-center">
        <p className="text-red-600 font-medium">⚠ {error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm text-[#0b4f6c] underline">Retry</button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Top bar */}
      <div className="bg-[#0b4f6c] text-white text-xs flex justify-between px-6 py-2">
        <span>📞 1800-233-1234 | contact@solapurcorporation.gov.in</span>
        <span>Government of Maharashtra</span>
      </div>

      {/* Header */}
      <div className="bg-[#0b4f6c] text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">SMC</div>
          <div>
            <h2 className="text-lg font-semibold">Solapur Municipal Corporation</h2>
            <p className="text-sm opacity-80">Manhole Safety Monitoring Portal</p>
            <p className="text-xs opacity-60">Government of Maharashtra</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded">Worker</span>
          <button onClick={toggleLanguage}
            className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded hover:bg-white/20 transition-colors">
            🌐 {i18n.language === "en" ? "मराठी" : "English"}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      {/* TODO: confirm field names — worker._id, worker.shift, worker.ppeCompliance, worker.status */}
      <div className="grid grid-cols-4 bg-[#083d54]">
        {[
          { num: worker._id, label: "Worker ID" },
          { num: worker.shift || "—", label: "Current Shift" },
          { num: worker.ppeCompliance || "—", label: "PPE Compliance" },
          { num: worker.status || "Active", label: "Duty Status", accent: true },
        ].map((s, i) => (
          <div key={i} className="py-3 text-center border-r border-white/10 last:border-r-0">
            <p className={`text-lg font-bold ${s.accent ? "text-yellow-400" : "text-white"}`}>{s.num}</p>
            <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Three main cards */}
      <div className="grid grid-cols-3 gap-6 px-8 py-8">
        <WorkerCard worker={worker} />
        <OperationCard />
        <QueryCard />
      </div>

      {/* Features */}
      <div className="px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-sm text-gray-800 pl-2 border-l-4 border-[#0b4f6c] mb-5">Portal Features</h3>
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
          <h3 className="font-semibold text-white text-sm pl-2 border-l-4 border-yellow-400 mb-4">⚠ Daily Safety Reminders</h3>
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
