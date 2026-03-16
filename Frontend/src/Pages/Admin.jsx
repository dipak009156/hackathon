import { useState, useEffect } from "react";
import Api from "../utils/Api";

const TABS = [
  { id: "dashboard",        label: "Dashboard",        icon: "🏠" },
  { id: "add-supervisor",   label: "Add Supervisor",    icon: "➕" },
  { id: "view-supervisors", label: "View Supervisors",  icon: "👷" },
  { id: "add-worker",       label: "Add Worker",        icon: "➕" },
  { id: "view-workers",     label: "View Workers",      icon: "🧹" },
  { id: "add-manhole",      label: "Add Manhole",       icon: "➕" },
  { id: "view-manholes",    label: "View Manholes",     icon: "🕳" },
  { id: "add-device",       label: "Add Device",        icon: "📡" },
];

const statusColor = {
  Active:     "bg-green-100 text-green-700",
  "On Leave": "bg-yellow-100 text-yellow-700",
  Safe:       "bg-green-100 text-green-700",
  Caution:    "bg-yellow-100 text-yellow-700",
  Danger:     "bg-red-100 text-red-700",
};

// ─── Shared Components ────────────────────────────────────────────────────────

function InputField({ label, type = "text", placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f6c] focus:border-transparent" />
    </div>
  );
}

function SelectField({ label, options, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select value={value} onChange={onChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4f6c]">
        <option value="">-- Select --</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0b4f6c] mb-3 pb-1 border-b border-gray-200">{title}</h3>
      <div className="grid grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-white bg-[#0b4f6c] mb-5 px-4 py-3 rounded-md flex items-center gap-2">
        <span>{icon}</span>{title}
      </h2>
      {children}
    </div>
  );
}

function FormButtons({ onSubmit, onReset, loading }) {
  return (
    <div className="flex gap-3 mt-2">
      <button onClick={onSubmit} disabled={loading}
        className="bg-[#0b4f6c] hover:bg-[#083d54] disabled:opacity-50 text-white text-sm font-semibold px-6 py-2 rounded transition-colors">
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button onClick={onReset} disabled={loading}
        className="border border-gray-300 text-gray-600 text-sm px-6 py-2 rounded hover:bg-gray-50 transition-colors">
        Reset
      </button>
    </div>
  );
}

function Toast({ message, onClose }) {
  return (
    <div className="fixed top-5 right-5 z-50 bg-green-600 text-white text-sm px-5 py-3 rounded-lg shadow-lg flex items-center gap-3">
      <span>✅ {message}</span>
      <button onClick={onClose} className="text-white/70 hover:text-white ml-2">✕</button>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-4 py-3 mb-4">
      ⚠ {message}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-6 h-6 border-2 border-[#0b4f6c] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard() {
  const [stats, setStats]         = useState(null);
  const [supervisors, setSupervisors] = useState([]);
  const [alerts, setAlerts]       = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        // TODO: confirm these endpoints
        const [statsRes, supRes, alertRes] = await Promise.all([
          Api.get("/admin/dashboard/stats"),        // { totalSupervisors, totalWorkers, totalManholes, activeDevices, dangerAlerts }
          Api.get("/admin/supervisors?limit=3"),     // returns array of supervisors
          Api.get("/admin/manholes?status=Danger,Caution&limit=5"), // returns array of manholes
        ]);
        setStats(statsRes.data);
        setSupervisors(supRes.data);
        setAlerts(alertRes.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: "Total Supervisors", value: stats?.totalSupervisors ?? "—", icon: "👷", accent: "border-t-4 border-[#0b4f6c]" },
    { label: "Total Workers",     value: stats?.totalWorkers     ?? "—", icon: "🧹", accent: "border-t-4 border-blue-400"  },
    { label: "Total Manholes",    value: stats?.totalManholes    ?? "—", icon: "🕳", accent: "border-t-4 border-yellow-400" },
    { label: "Active Devices",    value: stats?.activeDevices    ?? "—", icon: "📡", accent: "border-t-4 border-green-500"  },
    { label: "Danger Alerts",     value: stats?.dangerAlerts     ?? "—", icon: "⚠️", accent: "border-t-4 border-red-500"    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        {cards.map(c => (
          <div key={c.label} className={"bg-white rounded-lg shadow-sm p-5 " + c.accent}>
            <div className="text-3xl mb-2">{c.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{c.value}</p>
            <p className="text-xs text-gray-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <SectionCard title="Recent Supervisors" icon="👷">
          <table className="w-full text-sm">
            <thead><tr className="text-gray-500 text-xs border-b">{["Name","Zone","Status"].map(h=><th key={h} className="text-left pb-2">{h}</th>)}</tr></thead>
            <tbody>
              {supervisors.map(s => (
                <tr key={s._id} className="border-b last:border-0">
                  {/* TODO: confirm field names — s.fullName, s.assignedZone, s.status */}
                  <td className="py-2 font-medium">{s.fullName}</td>
                  <td className="py-2 text-gray-500">{s.assignedZone}</td>
                  <td className="py-2"><span className={"text-xs px-2 py-0.5 rounded-full font-medium " + (statusColor[s.status] || "")}>{s.status || "Active"}</span></td>
                </tr>
              ))}
              {supervisors.length === 0 && <tr><td colSpan={3} className="text-center text-gray-400 py-4 text-sm">No supervisors yet.</td></tr>}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Manhole Alerts" icon="⚠️">
          <table className="w-full text-sm">
            <thead><tr className="text-gray-500 text-xs border-b">{["ID","Location","Status"].map(h=><th key={h} className="text-left pb-2">{h}</th>)}</tr></thead>
            <tbody>
              {alerts.map(m => (
                <tr key={m._id} className="border-b last:border-0">
                  {/* TODO: confirm field names — m.manholeId, m.landmark, m.status */}
                  <td className="py-2 font-mono text-xs text-[#0b4f6c] font-semibold">{m.manholeId}</td>
                  <td className="py-2 text-gray-500">{m.landmark}</td>
                  <td className="py-2"><span className={"text-xs px-2 py-0.5 rounded-full font-medium " + (statusColor[m.status] || "")}>{m.status}</span></td>
                </tr>
              ))}
              {alerts.length === 0 && <tr><td colSpan={3} className="text-center text-gray-400 py-4 text-sm">No alerts.</td></tr>}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── Add Supervisor ───────────────────────────────────────────────────────────

function AddSupervisor({ showToast }) {
  // Removed: empId (not in schema)
  const init = { fullName:"", aadhaarNumber:"", phoneNumber:"", email:"", assignedZone:"", category:"", residentialAddress:"", password:"" };
  const [form, setForm]     = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const categories = [
    "Cleaning Supervisor", "Sewer Supervisor", "Drainage / Nala Supervisor",
    "Garbage Collection Supervisor", "Public Toilet Supervisor", "Solid Waste Management Supervisor",
  ];

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      // TODO: confirm POST endpoint and field names match your supervisor schema
      await Api.post("/admin/supervisors", form);
      showToast("Supervisor added successfully!");
      setForm(init);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add supervisor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionCard title="Add New Supervisor" icon="👷">
      {error && <ErrorBox message={error} />}

      <FormSection title="Personal Information">
        <InputField label="Full Name"      placeholder="e.g. Rajesh Patil"  value={form.fullName}      onChange={set("fullName")}      required />
        <InputField label="Aadhaar Number" placeholder="XXXX-XXXX-XXXX"     value={form.aadhaarNumber} onChange={set("aadhaarNumber")} required />
        <div />
      </FormSection>

      <FormSection title="Contact Details">
        <InputField label="Phone Number" type="tel"      placeholder="10-digit mobile"    value={form.phoneNumber} onChange={set("phoneNumber")} required />
        <InputField label="Email Address" type="email"   placeholder="name@smc.gov.in"    value={form.email}       onChange={set("email")}       required />
        <InputField label="Password"      type="password" placeholder="Set login password" value={form.password}   onChange={set("password")}    required />
      </FormSection>

      <FormSection title="Assignment & Address">
        <SelectField label="Assigned Zone" options={["Zone A","Zone B","Zone C","Zone D","Zone E"]} value={form.assignedZone} onChange={set("assignedZone")} required />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Supervisor Category <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <button key={cat} type="button" onClick={() => setForm(f => ({ ...f, category: cat }))}
                className={"px-3 py-2 text-sm rounded border font-medium transition " +
                  (form.category === cat ? "bg-[#0b4f6c] text-white border-[#0b4f6c]" : "bg-white text-gray-600 border-gray-300 hover:border-[#0b4f6c]")}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <InputField label="Residential Address" placeholder="Full residential address" value={form.residentialAddress} onChange={set("residentialAddress")} />
      </FormSection>

      <FormButtons onSubmit={handleSubmit} onReset={() => setForm(init)} loading={loading} />
    </SectionCard>
  );
}

// ─── View Supervisors ─────────────────────────────────────────────────────────

function ViewSupervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        // TODO: confirm GET endpoint
        const res = await Api.get("/admin/supervisors");
        setSupervisors(res.data);
      } catch (err) {
        setError("Failed to load supervisors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupervisors();
  }, []);

  // TODO: confirm field names for filtering — s.fullName, s.assignedZone
  const filtered = supervisors.filter(s =>
    s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    s.assignedZone?.toLowerCase().includes(search.toLowerCase())
  );

  const cols = [
    { key:"id",       header:"Supervisor ID",  sub:"Unique ID",     render: s=><span className="font-mono text-xs text-gray-400">{s._id}</span> },
    { key:"name",     header:"Name",            sub:"Full Name",     render: s=><span className="font-semibold text-gray-800">{s.fullName}</span> },
    { key:"zone",     header:"Zone",            sub:"Assigned Area", render: s=><span className="text-gray-600">{s.assignedZone}</span> },
    { key:"phone",    header:"Phone",           sub:"Contact No.",   render: s=><span className="text-gray-600">{s.phoneNumber}</span> },
    { key:"category", header:"Category",        sub:"Role",          render: s=><span className="text-gray-600 text-xs">{s.category}</span> },
    { key:"status",   header:"Status",          sub:"Current",       render: s=><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+(statusColor[s.status]||"bg-green-100 text-green-700")}>{s.status||"Active"}</span> },
    { key:"action",   header:"Action",          sub:"Manage",        render: ()=><div className="flex gap-3"><button className="text-xs text-blue-600 hover:underline">Edit</button><button className="text-xs text-red-500 hover:underline">Remove</button></div> },
  ];

  return (
    <SectionCard title="Supervisors List" icon="👷">
      {error && <ErrorBox message={error} />}
      <div className="flex items-center justify-between mb-4">
        <input type="text" placeholder="🔍  Search by name or zone..." value={search} onChange={e=>setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#0b4f6c]" />
        <span className="text-xs text-gray-500">{filtered.length} record(s)</span>
      </div>
      {loading ? <LoadingSpinner /> : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0b4f6c]">{cols.map(c=><th key={c.key} className="px-4 py-3 text-left font-bold text-white text-sm border-r border-white/10 last:border-r-0">{c.header}</th>)}</tr>
              <tr className="bg-[#e8f2f7]">{cols.map(c=><th key={c.key} className="px-4 py-1 text-left text-[11px] font-normal text-[#0b4f6c] tracking-wider uppercase border-r border-gray-200 last:border-r-0">{c.sub}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((s,i)=>(
                <tr key={s._id} className={"border-b last:border-0 hover:bg-blue-50 transition-colors "+(i%2===0?"bg-white":"bg-gray-50")}>
                  {cols.map(c=><td key={c.key} className="px-4 py-3 border-r border-gray-100 last:border-r-0">{c.render(s)}</td>)}
                </tr>
              ))}
              {filtered.length===0&&<tr><td colSpan={7} className="text-center text-gray-400 py-8 text-sm">No supervisors found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Add Worker ───────────────────────────────────────────────────────────────

function AddWorker({ showToast }) {
  const init = {
    name:"", email:"", password:"", phone:"", address:"",
    shift:"", joiningDate:"",
    lastCheckup:"", medicalNotes:"",
    emergencyContactName:"", emergencyContactPhone:"",
    insuranceNumber:""
  };
  const [form, setForm]       = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      // TODO: confirm POST endpoint
      // TODO: confirm how nested fields are sent — healthDetails & emergency as nested or flat
      await Api.post("/admin/workers", {
        name:             form.name,
        email:            form.email,
        password:         form.password,
        phone:            form.phone,
        address:          form.address,
        shift:            form.shift,
        joiningDate:      form.joiningDate,
        insuranceNumber:  form.insuranceNumber,
        healthDetails: {
          lastCheckup:  form.lastCheckup,
          medicalNotes: form.medicalNotes,
        },
        emergency: {
          contactName:  form.emergencyContactName,
          contactPhone: form.emergencyContactPhone,
        },
      });
      showToast("Worker added successfully!");
      setForm(init);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add worker.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionCard title="Add New Worker" icon="🧹">
      {error && <ErrorBox message={error} />}

      <FormSection title="Personal Information">
        <InputField label="Full Name" placeholder="e.g. Ganesh Jadhav"      value={form.name}     onChange={set("name")}     required />
        <InputField label="Email"     type="email" placeholder="worker@smc.gov.in" value={form.email} onChange={set("email")} required />
        <InputField label="Password"  type="password" placeholder="Set login password" value={form.password} onChange={set("password")} required />
      </FormSection>

      <FormSection title="Contact & Address">
        <InputField label="Phone Number" type="tel" placeholder="10-digit mobile" value={form.phone}   onChange={set("phone")}   />
        <InputField label="Address"      placeholder="Residential address"        value={form.address} onChange={set("address")} />
        <div />
      </FormSection>

      <FormSection title="Work Details">
        <SelectField label="Shift"        options={["Morning","Afternoon","Evening","Night"]} value={form.shift}        onChange={set("shift")}        />
        <InputField  label="Joining Date" type="date"                                         value={form.joiningDate}  onChange={set("joiningDate")}  />
        <InputField  label="Insurance Number" placeholder="e.g. INS-2024-001"                value={form.insuranceNumber} onChange={set("insuranceNumber")} />
      </FormSection>

      <FormSection title="Health Details">
        <InputField label="Last Medical Checkup" type="date"                    value={form.lastCheckup}  onChange={set("lastCheckup")}  />
        <InputField label="Medical Notes"         placeholder="Any known conditions" value={form.medicalNotes} onChange={set("medicalNotes")} />
        <div />
      </FormSection>

      <FormSection title="Emergency Contact">
        <InputField label="Contact Name"  placeholder="e.g. Priya Jadhav"       value={form.emergencyContactName}  onChange={set("emergencyContactName")}  />
        <InputField label="Contact Phone" type="tel" placeholder="10-digit mobile" value={form.emergencyContactPhone} onChange={set("emergencyContactPhone")} />
        <div />
      </FormSection>

      <FormButtons onSubmit={handleSubmit} onReset={() => setForm(init)} loading={loading} />
    </SectionCard>
  );
}

// ─── View Workers ─────────────────────────────────────────────────────────────

function ViewWorkers() {
  const [workers, setWorkers] = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        // TODO: confirm GET endpoint
        const res = await Api.get("/admin/workers");
        setWorkers(res.data);
      } catch (err) {
        setError("Failed to load workers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  // TODO: confirm field names — w.name, w.shift
  const filtered = workers.filter(w =>
    w.name?.toLowerCase().includes(search.toLowerCase()) ||
    w.shift?.toLowerCase().includes(search.toLowerCase())
  );

  const cols = [
    { key:"id",     header:"Worker ID",   sub:"Unique ID",   render: w=><span className="font-mono text-xs text-gray-400">{w._id}</span> },
    { key:"name",   header:"Name",         sub:"Full Name",   render: w=><span className="font-semibold text-gray-800">{w.name}</span> },
    { key:"dept",   header:"Department",   sub:"Dept.",       render: w=><span className="text-gray-600 text-xs">{w.department || "Sanitation & Drainage"}</span> },
    { key:"shift",  header:"Shift",        sub:"Work Shift",  render: w=><span className="text-gray-600">{w.shift || "—"}</span> },
    { key:"phone",  header:"Phone",        sub:"Contact No.", render: w=><span className="text-gray-600">{w.phone || "—"}</span> },
    { key:"status", header:"Status",       sub:"Current",     render: w=><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+(statusColor[w.status]||"bg-green-100 text-green-700")}>{w.status||"Active"}</span> },
    { key:"action", header:"Action",       sub:"Manage",      render: ()=><div className="flex gap-3"><button className="text-xs text-blue-600 hover:underline">Edit</button><button className="text-xs text-red-500 hover:underline">Remove</button></div> },
  ];

  return (
    <SectionCard title="Workers List" icon="🧹">
      {error && <ErrorBox message={error} />}
      <div className="flex items-center justify-between mb-4">
        <input type="text" placeholder="🔍  Search by name or shift..." value={search} onChange={e=>setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#0b4f6c]" />
        <span className="text-xs text-gray-500">{filtered.length} record(s)</span>
      </div>
      {loading ? <LoadingSpinner /> : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0b4f6c]">{cols.map(c=><th key={c.key} className="px-4 py-3 text-left font-bold text-white text-sm border-r border-white/10 last:border-r-0">{c.header}</th>)}</tr>
              <tr className="bg-[#e8f2f7]">{cols.map(c=><th key={c.key} className="px-4 py-1 text-left text-[11px] font-normal text-[#0b4f6c] tracking-wider uppercase border-r border-gray-200 last:border-r-0">{c.sub}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((w,i)=>(
                <tr key={w._id} className={"border-b last:border-0 hover:bg-blue-50 transition-colors "+(i%2===0?"bg-white":"bg-gray-50")}>
                  {cols.map(c=><td key={c.key} className="px-4 py-3 border-r border-gray-100 last:border-r-0">{c.render(w)}</td>)}
                </tr>
              ))}
              {filtered.length===0&&<tr><td colSpan={7} className="text-center text-gray-400 py-8 text-sm">No workers found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Add Manhole ──────────────────────────────────────────────────────────────

function AddManhole({ showToast }) {
  const init = { manholeId:"", zone:"", manholeType:"", landmark:"", lat:"", lng:"", depth:"", waterLevel:"", gasH2S:"", gasCH4:"", gasCO:"", gasO2:"", status:"", lastInspectedDate:"" };
  const [form, setForm]       = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const isWater = ["Sewer", "Stormwater", "Combined"].includes(form.manholeType);

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      // TODO: confirm POST endpoint and field names match your manhole schema
      await Api.post("/admin/manholes", {
        manholeId:         form.manholeId,
        zone:              form.zone,
        manholeType:       form.manholeType,
        landmark:          form.landmark,
        lat:               form.lat  ? Number(form.lat)  : null,
        lng:               form.lng  ? Number(form.lng)  : null,
        depth:             isWater && form.depth      ? Number(form.depth)      : null,
        waterLevel:        isWater && form.waterLevel ? Number(form.waterLevel) : null,
        gasH2S:            isWater && form.gasH2S     ? Number(form.gasH2S)     : null,
        gasCH4:            isWater && form.gasCH4     ? Number(form.gasCH4)     : null,
        gasCO:             isWater && form.gasCO      ? Number(form.gasCO)      : null,
        gasO2:             isWater && form.gasO2      ? Number(form.gasO2)      : null,
        status:            form.status,
        lastInspectedDate: form.lastInspectedDate || null,
      });
      showToast("Manhole registered successfully!");
      setForm(init);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to register manhole.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionCard title="Add New Manhole" icon="🕳">
      {error && <ErrorBox message={error} />}

      <FormSection title="Identification">
        <InputField  label="Manhole ID"   placeholder="e.g. MH-005"  value={form.manholeId}   onChange={set("manholeId")}   required />
        <SelectField label="Zone"         options={["Zone A","Zone B","Zone C","Zone D","Zone E"]} value={form.zone} onChange={set("zone")} required />
        <SelectField label="Manhole Type" options={["Sewer","Stormwater","Combined","Telecom"]}   value={form.manholeType} onChange={set("manholeType")} required />
      </FormSection>

      <FormSection title="Location Details">
        <div className="col-span-3">
          <InputField label="Location / Landmark" placeholder="e.g. Near Bus Stand, Station Road" value={form.landmark} onChange={set("landmark")} required />
        </div>
        <InputField label="Latitude"  placeholder="e.g. 17.6868" value={form.lat} onChange={set("lat")} />
        <InputField label="Longitude" placeholder="e.g. 75.9010" value={form.lng} onChange={set("lng")} />
        <div />
      </FormSection>

      {/* Only for Sewer / Stormwater / Combined */}
      {isWater && (
        <>
          <FormSection title="Water & Depth">
            <InputField label="Depth (meters)"       type="number" placeholder="e.g. 4.5" value={form.depth}      onChange={set("depth")}      required />
            <InputField label="Water Level (meters)" type="number" placeholder="e.g. 1.2" value={form.waterLevel} onChange={set("waterLevel")} />
            <div />
          </FormSection>

          <FormSection title="Gas Readings (ppm / %)">
            <InputField label="H2S — Hydrogen Sulphide (ppm)" type="number" placeholder="e.g. 2.5"  value={form.gasH2S} onChange={set("gasH2S")} />
            <InputField label="CH4 — Methane (ppm)"           type="number" placeholder="e.g. 0.8"  value={form.gasCH4} onChange={set("gasCH4")} />
            <InputField label="CO — Carbon Monoxide (ppm)"    type="number" placeholder="e.g. 1.1"  value={form.gasCO}  onChange={set("gasCO")}  />
            <InputField label="O2 — Oxygen Level (%)"         type="number" placeholder="e.g. 20.9" value={form.gasO2}  onChange={set("gasO2")}  />
            <div /><div />
          </FormSection>
        </>
      )}

      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0b4f6c] mb-3 pb-1 border-b border-gray-200">Safety & Inspection</h3>
        <div className="grid grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Current Status <span className="text-red-500">*</span></label>
            <div className="flex flex-col gap-2">
              {[
                { val:"Safe",    bg:"bg-green-50 border-green-500 text-green-700",    dot:"bg-green-500",  ring:"ring-green-400"  },
                { val:"Caution", bg:"bg-yellow-50 border-yellow-500 text-yellow-700", dot:"bg-yellow-500", ring:"ring-yellow-400" },
                { val:"Danger",  bg:"bg-red-50 border-red-500 text-red-700",          dot:"bg-red-500",    ring:"ring-red-400"    },
              ].map(s=>(
                <button key={s.val} type="button" onClick={()=>setForm(f=>({...f,status:s.val}))}
                  className={"flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all w-full "+(
                    form.status===s.val ? s.bg+" ring-2 "+s.ring : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                  )}>
                  <span className={"w-3 h-3 rounded-full flex-shrink-0 "+s.dot}></span>
                  {s.val}
                  {form.status===s.val&&<span className="ml-auto text-xs">✓ Selected</span>}
                </button>
              ))}
            </div>
          </div>
          <InputField label="Last Inspected Date" type="date" value={form.lastInspectedDate} onChange={set("lastInspectedDate")} />
          <div />
        </div>
      </div>

      <FormButtons onSubmit={handleSubmit} onReset={() => setForm(init)} loading={loading} />
    </SectionCard>
  );
}

// ─── View Manholes ────────────────────────────────────────────────────────────

function ViewManholes() {
  const [manholes, setManholes] = useState([]);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchManholes = async () => {
      try {
        // TODO: confirm GET endpoint
        const res = await Api.get("/admin/manholes");
        setManholes(res.data);
      } catch (err) {
        setError("Failed to load manholes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchManholes();
  }, []);

  // TODO: confirm field names — m.landmark, m.manholeId, m.status
  const filtered = manholes.filter(m =>
    (filter === "All" || m.status === filter) &&
    (m.landmark?.toLowerCase().includes(search.toLowerCase()) || m.manholeId?.includes(search))
  );

  const cols = [
    { key:"id",       header:"Manhole ID",    sub:"Unique ID",       render: m=><span className="font-mono text-xs font-bold text-[#0b4f6c]">{m.manholeId}</span> },
    { key:"location", header:"Location",       sub:"Landmark / Area", render: m=><span>{m.landmark}</span> },
    { key:"zone",     header:"Zone",           sub:"Assigned Area",   render: m=><span className="text-gray-600">{m.zone}</span> },
    { key:"type",     header:"Type",           sub:"Manhole Type",    render: m=><span className="text-gray-600 text-xs">{m.manholeType}</span> },
    { key:"depth",    header:"Depth",          sub:"In Meters",       render: m=><span className="text-gray-600">{m.depth != null ? `${m.depth}m` : "—"}</span> },
    { key:"insp",     header:"Last Inspected", sub:"Inspection Date", render: m=><span className="text-gray-500 text-xs">{m.lastInspectedDate ? new Date(m.lastInspectedDate).toLocaleDateString("en-IN") : "—"}</span> },
    { key:"status",   header:"Safety Status",  sub:"Current State",   render: m=><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+(statusColor[m.status]||"")}>{m.status}</span> },
    { key:"action",   header:"Action",         sub:"Manage",          render: ()=><div className="flex gap-3"><button className="text-xs text-blue-600 hover:underline">Edit</button><button className="text-xs text-red-500 hover:underline">Delete</button></div> },
  ];

  return (
    <SectionCard title="Manholes Registry" icon="🕳">
      {error && <ErrorBox message={error} />}
      <div className="flex items-center gap-4 flex-wrap mb-4">
        <input type="text" placeholder="🔍  Search by ID or location..." value={search} onChange={e=>setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#0b4f6c]" />
        <div className="flex gap-2">
          {["All","Safe","Caution","Danger"].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              className={"text-xs px-3 py-1.5 rounded-full border font-medium transition-colors "+(filter===s?"bg-[#0b4f6c] text-white border-[#0b4f6c]":"bg-white text-gray-600 border-gray-300 hover:border-[#0b4f6c]")}>
              {s}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-auto">{filtered.length} record(s)</span>
      </div>
      {loading ? <LoadingSpinner /> : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0b4f6c]">{cols.map(c=><th key={c.key} className="px-4 py-3 text-left font-bold text-white text-sm border-r border-white/10 last:border-r-0">{c.header}</th>)}</tr>
              <tr className="bg-[#e8f2f7]">{cols.map(c=><th key={c.key} className="px-4 py-1 text-left text-[11px] font-normal text-[#0b4f6c] tracking-wider uppercase border-r border-gray-200 last:border-r-0">{c.sub}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((m,i)=>(
                <tr key={m._id} className={"border-b last:border-0 hover:bg-blue-50 transition-colors "+(i%2===0?"bg-white":"bg-gray-50")}>
                  {cols.map(c=><td key={c.key} className="px-4 py-3 border-r border-gray-100 last:border-r-0">{c.render(m)}</td>)}
                </tr>
              ))}
              {filtered.length===0&&<tr><td colSpan={8} className="text-center text-gray-400 py-8 text-sm">No manholes found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Add Device ───────────────────────────────────────────────────────────────

function AddDevice({ showToast }) {
  const init = { deviceId:"", deviceType:"", firmwareVersion:"", linkedManholeId:"", zone:"", installationDate:"", batteryLevel:"", status:"Active" };
  const [form, setForm]       = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      // TODO: confirm POST endpoint and field names match your device schema
      await Api.post("/admin/devices", {
        ...form,
        batteryLevel: form.batteryLevel ? Number(form.batteryLevel) : null,
      });
      showToast("Device registered successfully!");
      setForm(init);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to register device.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionCard title="Add New Device" icon="📡">
      {error && <ErrorBox message={error} />}

      <FormSection title="Device Information">
        <InputField  label="Device ID"        placeholder="e.g. DEV-2024-091" value={form.deviceId}        onChange={set("deviceId")}        required />
        <SelectField label="Device Type"      options={["Gas Sensor","Water Level Sensor","Temperature Sensor","Camera","GPS Tracker"]} value={form.deviceType} onChange={set("deviceType")} required />
        <InputField  label="Firmware Version" placeholder="e.g. v2.3.1"       value={form.firmwareVersion} onChange={set("firmwareVersion")} />
      </FormSection>

      <FormSection title="Installation Details">
        <InputField  label="Linked Manhole ID" placeholder="e.g. MH-003" value={form.linkedManholeId} onChange={set("linkedManholeId")} required />
        <SelectField label="Zone"              options={["Zone A","Zone B","Zone C","Zone D","Zone E"]} value={form.zone} onChange={set("zone")} required />
        <InputField  label="Installation Date" type="date"                value={form.installationDate} onChange={set("installationDate")} required />
      </FormSection>

      <FormSection title="Battery & Status">
        <InputField label="Battery Level (%)" type="number" placeholder="e.g. 85" value={form.batteryLevel} onChange={set("batteryLevel")} />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Device Status</label>
          <div className="flex flex-col gap-2">
            {[
              { val:"Active",   dot:"bg-green-500", style:"bg-green-50 border-green-500 text-green-700 ring-green-400"  },
              { val:"Inactive", dot:"bg-gray-400",  style:"bg-gray-50 border-gray-400 text-gray-600 ring-gray-300"      },
              { val:"Faulty",   dot:"bg-red-500",   style:"bg-red-50 border-red-500 text-red-700 ring-red-400"          },
            ].map(s=>(
              <button key={s.val} type="button" onClick={()=>setForm(f=>({...f,status:s.val}))}
                className={"flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all w-full "+(
                  form.status===s.val ? s.style+" ring-2" : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                )}>
                <span className={"w-3 h-3 rounded-full flex-shrink-0 "+s.dot}></span>
                {s.val}
                {form.status===s.val&&<span className="ml-auto text-xs">✓ Selected</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end pb-1">
          <p className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-3 py-2 leading-relaxed">
            ℹ️ Ensure the device is physically installed and powered on before registration. The system will attempt an automatic ping after submission.
          </p>
        </div>
      </FormSection>

      <FormButtons onSubmit={handleSubmit} onReset={() => setForm(init)} loading={loading} />
    </SectionCard>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [active, setActive] = useState("dashboard");
  const [toast, setToast]   = useState(null);
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null), 3000); };

  const renderPage = () => {
    switch(active) {
      case "dashboard":        return <Dashboard />;
      case "add-supervisor":   return <AddSupervisor showToast={showToast} />;
      case "view-supervisors": return <ViewSupervisors />;
      case "add-worker":       return <AddWorker showToast={showToast} />;
      case "view-workers":     return <ViewWorkers />;
      case "add-manhole":      return <AddManhole showToast={showToast} />;
      case "view-manholes":    return <ViewManholes />;
      case "add-device":       return <AddDevice showToast={showToast} />;
      default:                 return <Dashboard />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {toast && <Toast message={toast} onClose={()=>setToast(null)} />}

      <div className="bg-[#0b4f6c] text-white text-xs flex justify-between px-6 py-2">
        <span>📞 1800-233-1234 | contact@solapurcorporation.gov.in</span>
        <span>Government of Maharashtra</span>
      </div>

      <div className="bg-[#0b4f6c] text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="SMC Logo" className="w-14 h-14 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">Solapur Municipal Corporation</h2>
            <p className="text-sm opacity-80">Admin Control Panel</p>
            <p className="text-xs opacity-60">Government of Maharashtra</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-xs opacity-70">
            {/* TODO: replace with actual logged-in admin name from auth context */}
            <p>Admin: Suresh Kumar</p>
            <p>Last login: Today, 09:42 AM</p>
          </div>
          <button className="bg-yellow-400 text-black font-semibold text-sm px-4 py-1.5 rounded">Logout →</button>
        </div>
      </div>

      <div className="bg-[#083d54] flex overflow-x-auto">
        {TABS.map(tab=>(
          <button key={tab.id} onClick={()=>setActive(tab.id)}
            className={"flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 "+(
              active===tab.id ? "border-yellow-400 text-yellow-400 bg-white/5" : "border-transparent text-white/70 hover:text-white hover:bg-white/10"
            )}>
            <span>{tab.icon}</span><span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="px-8 pt-5 pb-1 text-xs text-gray-500 flex items-center gap-1">
        <span>Admin</span><span>›</span>
        <span className="text-[#0b4f6c] font-medium">{TABS.find(t=>t.id===active)?.label}</span>
      </div>

      <main className="flex-1 px-8 py-4 pb-10">{renderPage()}</main>

      <div className="bg-[#083d54] text-white/50 text-xs text-center py-3">
        © 2026 Solapur Municipal Corporation | Sanitation Safety Monitoring Portal | Government of Maharashtra
      </div>
    </div>
  );
}
