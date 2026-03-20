import { useState } from "react";

// ─── Static Data ────────────────────────────────────────────────────────────
const MANHOLES = [
  { id: "MH-12", ward: "Ward 4", location: "Gandhi Road", depth: "12 ft", gasRisk: "Yes", gases: "Methane, H2S" },
  { id: "MH-18", ward: "Ward 2", location: "Market Street", depth: "—", gasRisk: "Unknown", gases: "—" },
  { id: "MH-05", ward: "Ward 1", location: "Station Road", depth: "8 ft", gasRisk: "No", gases: "—" },
  { id: "MH-21", ward: "Ward 3", location: "College Road", depth: "15 ft", gasRisk: "Yes", gases: "CO2" },
];

const DEVICES = [
  "Gas Detector GD-12",
  "Gas Detector GD-15",
  "Oxygen Meter OM-02",
  "Safety Harness SH-04",
  "Water Flow Sensor WF-01",
];

const WORKERS = ["Ravi Kumar", "Anil Pawar", "Raj Patil", "Suresh Kale", "Mohan Jadhav"];

const HISTORY = [
  { manhole: "MH-10", workers: 3, status: "Completed", time: "09:00", ward: "Ward 3" },
  { manhole: "MH-05", workers: 3, status: "Incident", time: "08:10", ward: "Ward 1" },
  { manhole: "MH-02", workers: 3, status: "Completed", time: "07:00", ward: "Ward 2" },
  { manhole: "MH-17", workers: 4, status: "Completed", time: "06:00", ward: "Ward 4" },
];

const WORKER_STATUS = {
  "Ravi Kumar": "Available",
  "Anil Pawar": "Assigned",
  "Raj Patil": "Active",
  "Suresh Kale": "Available",
  "Mohan Jadhav": "Available",
};

const statusColor = {
  Available: "bg-green-100 text-green-800",
  Assigned: "bg-yellow-100 text-yellow-800",
  Active: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Incident: "bg-red-100 text-red-800",
};

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

// ─── Shared Components ───────────────────────────────────────────────────────
function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-5 ${className}`}>
      {title && (
        <h3 className="font-semibold text-sm mb-4 pl-2 border-l-4 border-[#0b4f6c] text-gray-800 uppercase tracking-wide">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

function Badge({ status }) {
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColor[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

function WorkerRow({ name }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-b-0">
      <div className="w-8 h-8 rounded-full bg-[#0b4f6c]/10 flex items-center justify-center text-[#0b4f6c] font-semibold text-xs flex-shrink-0">
        {initials(name)}
      </div>
      <span className="text-sm text-gray-800 flex-1">{name}</span>
    </div>
  );
}

function Toast({ msg, show }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0b4f6c] text-white text-sm px-5 py-2.5 rounded-lg shadow-lg transition-all duration-300 z-50 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {msg}
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────
function Dashboard({ goTo }) {
  const stats = [
    { num: "4", label: "Today's Operations" },
    { num: "1", label: "Active Operation", accent: true },
    { num: "5", label: "Available Workers" },
    { num: "3", label: "Assigned Workers" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-5">Supervisor Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#083d54] rounded-lg p-4 text-center">
            <p className={`text-2xl font-bold ${s.accent ? "text-yellow-400" : "text-white"}`}>{s.num}</p>
            <p className="text-white/60 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Workers */}
      <SectionCard title="Workers Under Supervisor" className="mb-4">
        {Object.entries(WORKER_STATUS).map(([name, status]) => (
          <div key={name} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-b-0">
            <div className="w-8 h-8 rounded-full bg-[#0b4f6c]/10 flex items-center justify-center text-[#0b4f6c] font-semibold text-xs">
              {initials(name)}
            </div>
            <span className="text-sm text-gray-800 flex-1">{name}</span>
            <Badge status={status} />
          </div>
        ))}
      </SectionCard>

      {/* Quick Actions */}
      <SectionCard title="Quick Actions">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Create New Operation", page: "create" },
            { label: "View Active Operation", page: "active" },
            { label: "Operation History", page: "history" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => goTo(a.page)}
              className="bg-gray-50 border border-gray-200 hover:bg-[#0b4f6c] hover:text-white hover:border-[#0b4f6c] transition-colors text-sm text-gray-700 px-4 py-3 rounded-lg text-left font-medium"
            >
              {a.label}
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function CreateOperation({ goTo, showToast }) {
  const [step, setStep] = useState(1);
  const [selectedMH, setSelectedMH] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  function toggleItem(arr, setArr, item) {
    setArr(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  function handleStart() {
    showToast("Operation Created Successfully");
    setTimeout(() => goTo("active"), 1200);
  }

  const steps = ["Select Manhole", "Select Devices", "Select Workers", "Start"];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-5">Create Operation</h2>

      {/* Step Bar */}
      <div className="flex items-center mb-6">
        {steps.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const current = step === n;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors
                    ${done ? "bg-[#0b4f6c] border-[#0b4f6c] text-white" : current ? "border-[#0b4f6c] text-[#0b4f6c]" : "border-gray-300 text-gray-400"}`}
                >
                  {done ? "✓" : n}
                </div>
                <span className={`text-xs font-medium ${current || done ? "text-gray-800" : "text-gray-400"}`}>{label}</span>
              </div>
              {i < steps.length - 1 && <div className={`h-px flex-1 mx-3 ${done ? "bg-[#0b4f6c]" : "bg-gray-200"}`} />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Select Manhole */}
      {step === 1 && (
        <SectionCard title="Select Manhole">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {MANHOLES.map((mh) => (
              <div
                key={mh.id}
                onClick={() => setSelectedMH(mh)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMH?.id === mh.id
                    ? "border-[#0b4f6c] bg-[#0b4f6c]/5 border-2"
                    : "border-gray-200 hover:border-[#0b4f6c]/50"
                }`}
              >
                <p className="font-semibold text-sm text-gray-800 mb-2">{mh.id}</p>
                {[
                  ["Ward", mh.ward],
                  ["Location", mh.location],
                  ["Depth", mh.depth],
                  ["Gas Risk", mh.gasRisk],
                  ["Known Gases", mh.gases],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">{k}</span>
                    <span
                      className={`font-medium ${
                        k === "Gas Risk" && v === "Yes"
                          ? "text-red-600"
                          : k === "Gas Risk" && v === "Unknown"
                          ? "text-yellow-600"
                          : "text-gray-700"
                      }`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {selectedMH && (
            <p className="text-xs bg-[#0b4f6c]/10 text-[#0b4f6c] inline-block px-3 py-1.5 rounded mb-4 font-medium">
              Selected Manhole: {selectedMH.id}
            </p>
          )}
          <div>
            <button
              disabled={!selectedMH}
              onClick={() => setStep(2)}
              className="bg-[#0b4f6c] text-white text-sm px-5 py-2 rounded-lg disabled:opacity-40 hover:bg-[#083d54] transition-colors"
            >
              Next: Select Devices →
            </button>
          </div>
        </SectionCard>
      )}

      {/* Step 2: Select Devices */}
      {step === 2 && (
        <SectionCard title="Select Safety Devices">
          <div className="mb-3">
            {DEVICES.map((d) => (
              <label key={d} className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDevices.includes(d)}
                  onChange={() => toggleItem(selectedDevices, setSelectedDevices, d)}
                  className="accent-[#0b4f6c] w-4 h-4"
                />
                <span className="text-sm text-gray-800">{d}</span>
              </label>
            ))}
          </div>
          {selectedDevices.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 font-medium mb-2">Selected Devices</p>
              <div className="flex flex-wrap gap-2">
                {selectedDevices.map((d) => (
                  <span key={d} className="text-xs bg-[#0b4f6c]/10 text-[#0b4f6c] px-2.5 py-1 rounded-full">{d}</span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="border border-gray-300 text-sm px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              ← Back
            </button>
            <button
              disabled={selectedDevices.length === 0}
              onClick={() => setStep(3)}
              className="bg-[#0b4f6c] text-white text-sm px-5 py-2 rounded-lg disabled:opacity-40 hover:bg-[#083d54] transition-colors"
            >
              Next: Select Workers →
            </button>
          </div>
        </SectionCard>
      )}

      {/* Step 3: Select Workers */}
      {step === 3 && (
        <SectionCard title="Select Workers">
          <p className="text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-lg mb-4">
            Minimum 3 workers required
          </p>
          <div className="mb-3">
            {WORKERS.map((w) => (
              <label key={w} className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedWorkers.includes(w)}
                  onChange={() => toggleItem(selectedWorkers, setSelectedWorkers, w)}
                  className="accent-[#0b4f6c] w-4 h-4"
                />
                <span className="text-sm text-gray-800">{w}</span>
              </label>
            ))}
          </div>
          {selectedWorkers.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 font-medium mb-2">Team Members</p>
              <div className="flex flex-wrap gap-2">
                {selectedWorkers.map((w) => (
                  <span key={w} className="text-xs bg-[#0b4f6c]/10 text-[#0b4f6c] px-2.5 py-1 rounded-full">{w}</span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="border border-gray-300 text-sm px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              ← Back
            </button>
            <button
              disabled={selectedWorkers.length < 3}
              onClick={() => setStep(4)}
              className="bg-[#0b4f6c] text-white text-sm px-5 py-2 rounded-lg disabled:opacity-40 hover:bg-[#083d54] transition-colors"
            >
              Review & Start →
            </button>
          </div>
        </SectionCard>
      )}

      {/* Step 4: Review & Start */}
      {step === 4 && (
        <SectionCard title="Review Operation">
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[
              ["Manhole", selectedMH?.id],
              ["Ward", selectedMH?.ward],
              ["Location", selectedMH?.location],
              ["Gas Risk", selectedMH?.gasRisk],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{k}</p>
                <p className="text-sm text-gray-800 font-medium">{v || "—"}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Devices</p>
            <div className="flex flex-wrap gap-2">
              {selectedDevices.map((d) => (
                <span key={d} className="text-xs bg-[#0b4f6c]/10 text-[#0b4f6c] px-2.5 py-1 rounded-full">{d}</span>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Team Members</p>
            <div className="flex flex-wrap gap-2">
              {selectedWorkers.map((w) => (
                <span key={w} className="text-xs bg-[#0b4f6c]/10 text-[#0b4f6c] px-2.5 py-1 rounded-full">{w}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="border border-gray-300 text-sm px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              ← Back
            </button>
            <button
              onClick={handleStart}
              className="bg-yellow-400 text-black font-semibold text-sm px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Start Operation
            </button>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function ActiveOperation({ goTo }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-5">Active Operation</h2>
      <div className="grid grid-cols-3 gap-4">

        {/* Left: main info */}
        <div className="col-span-2 flex flex-col gap-4">
          <SectionCard title="Operation Info">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Manhole", "MH-12"],
                ["Ward", "Ward 4"],
                ["Location", "Gandhi Road"],
                ["Supervisor", "Suresh Patil"],
                ["Start Time", "10:15"],
                ["Status", null],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{k}</p>
                  {k === "Status" ? (
                    <Badge status="Active" />
                  ) : (
                    <p className="text-sm text-gray-800 font-medium">{v}</p>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Sensor Readings */}
          <SectionCard title="Sensor Readings">
            {[
              ["Gas Level", "Not Available"],
              ["Oxygen Level", "Not Available"],
              ["Water Flow", "Not Available"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0">
                <span className="text-sm text-gray-600">{k}</span>
                <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded">{v}</span>
              </div>
            ))}
          </SectionCard>

          {/* RFID Logs */}
          <SectionCard title="RFID Logs">
            <div
              className="grid gap-x-3 gap-y-2 text-xs items-center"
              style={{ gridTemplateColumns: "1fr auto auto" }}
            >
              {["Worker", "Tag", "Status"].map((h) => (
                <span key={h} className="text-gray-400 uppercase tracking-wide text-[10px] font-medium">{h}</span>
              ))}
              {[
                { name: "Ravi Kumar", tag: "RF-001", label: "Entry 10:15", cls: "bg-green-100 text-green-800" },
                { name: "Anil Pawar",  tag: "RF-004", label: "Entry 10:17", cls: "bg-green-100 text-green-800" },
                { name: "Raj Patil",   tag: "RF-007", label: "Inside 10:19", cls: "bg-yellow-100 text-yellow-800" },
              ].map((r) => (
                <>
                  <span key={r.name + "-name"} className="text-gray-800 font-medium py-1.5 border-t border-gray-50">{r.name}</span>
                  <span key={r.name + "-tag"}  className="text-gray-400 font-mono py-1.5 border-t border-gray-50">{r.tag}</span>
                  <span key={r.name + "-label"} className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap border-t border-gray-50 ${r.cls}`}>{r.label}</span>
                </>
              ))}
            </div>
          </SectionCard>

          {/* Wearable Devices */}
          <SectionCard title="Wearable Devices">
            {[
              { name: "Ravi Kumar", hr: 82, temp: 36.8, spo2: 97 },
              { name: "Anil Pawar",  hr: 76, temp: 37.1, spo2: 95 },
              { name: "Raj Patil",   hr: 88, temp: 36.5, spo2: 98 },
            ].map((w, i, arr) => (
              <div key={w.name} className={`py-2.5 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">{w.name}</p>
                <div className="flex gap-2">
                  {[
                    ["Heart rate", w.hr, "bpm"],
                    ["Body temp", w.temp, "°C"],
                    ["SpO2", w.spo2, "%"],
                  ].map(([label, val, unit]) => (
                    <div key={label} className="flex-1 bg-gray-50 rounded-lg px-2.5 py-1.5">
                      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {val} <span className="text-[10px] font-normal text-gray-400">{unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Alerts">
            <p className="text-sm text-gray-400">No alerts detected</p>
          </SectionCard>
        </div>

        {/* Right: workers, devices, controls */}
        <div className="flex flex-col gap-4">
          <SectionCard title="Workers">
            {["Ravi Kumar", "Anil Pawar", "Raj Patil"].map((w) => (
              <WorkerRow key={w} name={w} />
            ))}
          </SectionCard>

          <SectionCard title="Devices">
            {["Gas Detector GD-12", "Oxygen Meter OM-02", "Safety Harness SH-04"].map((d) => (
              <div key={d} className="py-2 border-b border-gray-100 last:border-b-0 text-sm text-gray-700">{d}</div>
            ))}
          </SectionCard>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => goTo("incident")}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              Report Incident
            </button>
            <button className="w-full bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
              Complete Operation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function IncidentReport({ goTo, showToast }) {
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");

  function submit() {
    if (!type) return;
    showToast("Incident Report Submitted");
    setTimeout(() => goTo("active"), 1200);
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-5">Report Incident</h2>
      <SectionCard className="max-w-lg">
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Incident Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2.5 bg-white text-gray-800 focus:outline-none focus:border-[#0b4f6c]"
          >
            <option value="">Select incident type</option>
            <option>Gas Leak</option>
            <option>Worker Injury</option>
            <option>Equipment Failure</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe the incident…"
            rows={4}
            className="w-full border border-gray-300 rounded-lg text-sm px-3 py-2.5 resize-none focus:outline-none focus:border-[#0b4f6c] text-gray-800"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => goTo("active")}
            className="border border-gray-300 text-sm px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!type}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Submit Report
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

function OperationHistory() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-5">Operation History</h2>
      <SectionCard>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {["Manhole", "Ward", "Workers", "Status", "Start Time"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((row, i) => (
              <>
                <tr
                  key={row.manhole}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 pr-4 font-medium text-[#0b4f6c]">{row.manhole}</td>
                  <td className="py-3 pr-4 text-gray-600">{row.ward}</td>
                  <td className="py-3 pr-4 text-gray-600">{row.workers}</td>
                  <td className="py-3 pr-4"><Badge status={row.status} /></td>
                  <td className="py-3 text-gray-600">{row.time}</td>
                </tr>
                {expanded === i && (
                  <tr key={`${row.manhole}-detail`}>
                    <td colSpan={5} className="bg-gray-50 px-4 py-3 text-xs text-gray-600 border-b border-gray-100">
                      <strong>{row.manhole}</strong> — {row.ward} | Status: <strong>{row.status}</strong> | Workers: {row.workers} | Time: {row.time}
                      {row.status === "Incident" && <span className="ml-2 text-red-600 font-medium">⚠ Incident recorded during this operation.</span>}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 mt-3">Click a row to view details</p>
      </SectionCard>
    </div>
  );
}

// ─── Main Supervisor Module ───────────────────────────────────────────────────
export default function SupervisorModule() {
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState({ msg: "", show: false });

  function goTo(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showToast(msg) {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  }

  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "create", label: "Create Operation" },
    { key: "active", label: "Active Operation" },
    { key: "history", label: "Operation History" },
  ];

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
            Supervisor
          </span>
          <button
            onClick={() => goTo("dashboard")}
            className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded hover:bg-white/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="bg-[#083d54] flex">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => goTo(item.key)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
              page === item.key
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Page content */}
      <div className="px-8 py-6 max-w-6xl mx-auto">
        {page === "dashboard" && <Dashboard goTo={goTo} />}
        {page === "create" && <CreateOperation goTo={goTo} showToast={showToast} />}
        {page === "active" && <ActiveOperation goTo={goTo} />}
        {page === "incident" && <IncidentReport goTo={goTo} showToast={showToast} />}
        {page === "history" && <OperationHistory />}
      </div>

      <Toast msg={toast.msg} show={toast.show} />
    </div>
  );
}
