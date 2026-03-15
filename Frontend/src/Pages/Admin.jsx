import { useState } from "react";

const TABS = [
  { id: "dashboard",         label: "Dashboard",        icon: "🏠" },
  { id: "add-supervisor",    label: "Add Supervisor",    icon: "➕" },
  { id: "view-supervisors",  label: "View Supervisors",  icon: "👷" },
  { id: "add-manhole",       label: "Add Manhole",       icon: "➕" },
  { id: "view-manholes",     label: "View Manholes",     icon: "🕳" },
  { id: "add-device",        label: "Add Device",        icon: "📡" },
];

const MOCK_SUPERVISORS = [
  { id: "SUP001", name: "Rajesh Patil",   zone: "Zone A", phone: "9876543210", workers: 12, status: "Active"   },
  { id: "SUP002", name: "Meena Deshmukh", zone: "Zone B", phone: "9823456789", workers: 9,  status: "Active"   },
  { id: "SUP003", name: "Suresh Kamble",  zone: "Zone C", phone: "9712345678", workers: 15, status: "On Leave" },
  { id: "SUP004", name: "Anita More",     zone: "Zone D", phone: "9988776655", workers: 7,  status: "Active"   },
];

const MOCK_MANHOLES = [
  { id: "MH-001", location: "Station Road",  zone: "Zone A", depth: "4.2m", status: "Safe",    lastInspected: "12 Mar 2026" },
  { id: "MH-002", location: "Market Yard",   zone: "Zone B", depth: "3.8m", status: "Caution", lastInspected: "10 Mar 2026" },
  { id: "MH-003", location: "Akkalkot Road", zone: "Zone C", depth: "5.1m", status: "Danger",  lastInspected: "08 Mar 2026" },
  { id: "MH-004", location: "Vijaypur Road", zone: "Zone D", depth: "3.2m", status: "Safe",    lastInspected: "13 Mar 2026" },
];

const statusColor = {
  Active:    "bg-green-100 text-green-700",
  "On Leave":"bg-yellow-100 text-yellow-700",
  Safe:      "bg-green-100 text-green-700",
  Caution:   "bg-yellow-100 text-yellow-700",
  Danger:    "bg-red-100 text-red-700",
};

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

function FormButtons({ onSubmit, onReset }) {
  return (
    <div className="flex gap-3 mt-2">
      <button onClick={onSubmit} className="bg-[#0b4f6c] hover:bg-[#083d54] text-white text-sm font-semibold px-6 py-2 rounded transition-colors">Submit</button>
      <button onClick={onReset}  className="border border-gray-300 text-gray-600 text-sm px-6 py-2 rounded hover:bg-gray-50 transition-colors">Reset</button>
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

function Dashboard() {
  const cards = [
    { label: "Total Supervisors", value: "24",  icon: "👷", accent: "border-t-4 border-[#0b4f6c]" },
    { label: "Total Manholes",    value: "138", icon: "🕳", accent: "border-t-4 border-yellow-400" },
    { label: "Active Devices",    value: "91",  icon: "📡", accent: "border-t-4 border-green-500"  },
    { label: "Danger Alerts",     value: "3",   icon: "⚠️", accent: "border-t-4 border-red-500"    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
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
              {MOCK_SUPERVISORS.slice(0,3).map(s=>(
                <tr key={s.id} className="border-b last:border-0">
                  <td className="py-2 font-medium">{s.name}</td>
                  <td className="py-2 text-gray-500">{s.zone}</td>
                  <td className="py-2"><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+statusColor[s.status]}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Manhole Alerts" icon="⚠️">
          <table className="w-full text-sm">
            <thead><tr className="text-gray-500 text-xs border-b">{["ID","Location","Status"].map(h=><th key={h} className="text-left pb-2">{h}</th>)}</tr></thead>
            <tbody>
              {MOCK_MANHOLES.filter(m=>m.status!=="Safe").map(m=>(
                <tr key={m.id} className="border-b last:border-0">
                  <td className="py-2 font-mono text-xs text-[#0b4f6c] font-semibold">{m.id}</td>
                  <td className="py-2 text-gray-500">{m.location}</td>
                  <td className="py-2"><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+statusColor[m.status]}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </div>
  );
}

function AddSupervisor({ showToast }) {

  const init = {
    name: "",
    empId: "",
    phone: "",
    email: "",
    zone: "",
    dept: "",
    aadhaar: "",
    address: ""
  };

  const [form, setForm] = useState(init);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const categories = [
    "Cleaning Supervisor",
    "Sewer Supervisor",
    "Drainage / Nala Supervisor",
    "Garbage Collection Supervisor",
    "Public Toilet Supervisor",
    "Solid Waste Management Supervisor"
  ];

  return (
    <SectionCard title="Add New Supervisor" icon="👷">

      {/* Personal Info */}
      <FormSection title="Personal Information">
        <InputField
          label="Full Name"
          placeholder="e.g. Rajesh Patil"
          value={form.name}
          onChange={set("name")}
          required
        />

        <InputField
          label="Employee ID"
          placeholder="e.g. EMP-2024-001"
          value={form.empId}
          onChange={set("empId")}
          required
        />

        <InputField
          label="Aadhaar Number"
          placeholder="XXXX-XXXX-XXXX"
          value={form.aadhaar}
          onChange={set("aadhaar")}
          required
        />
      </FormSection>

      {/* Contact */}
      <FormSection title="Contact Details">
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="10-digit mobile"
          value={form.phone}
          onChange={set("phone")}
          required
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="name@smc.gov.in"
          value={form.email}
          onChange={set("email")}
        />

        <div />
      </FormSection>

      {/* Assignment */}
      <FormSection title="Assignment & Address">

        <SelectField
          label="Assigned Zone"
          options={["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"]}
          value={form.zone}
          onChange={set("zone")}
          required
        />

        {/* CATEGORY BUTTONS */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Supervisor Category <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setForm(f => ({ ...f, dept: cat }))}
                className={
                  "px-3 py-2 text-sm rounded border font-medium transition " +
                  (form.dept === cat
                    ? "bg-[#0b4f6c] text-white border-[#0b4f6c]"
                    : "bg-white text-gray-600 border-gray-300 hover:border-[#0b4f6c]")
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <InputField
          label="Residential Address"
          placeholder="Full residential address"
          value={form.address}
          onChange={set("address")}
        />

      </FormSection>

      <FormButtons
        onSubmit={() => {
          showToast("Supervisor added successfully!");
          setForm(init);
        }}
        onReset={() => setForm(init)}
      />

    </SectionCard>
  );
}
function ViewSupervisors() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_SUPERVISORS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.zone.toLowerCase().includes(search.toLowerCase())
  );
  const cols = [
    { key:"id",      header:"Supervisor ID",   sub:"Unique ID",      render: s=><span className="font-mono text-xs text-gray-400">{s.id}</span> },
    { key:"name",    header:"Name",             sub:"Full Name",      render: s=><span className="font-semibold text-gray-800">{s.name}</span> },
    { key:"zone",    header:"Zone",             sub:"Assigned Area",  render: s=><span className="text-gray-600">{s.zone}</span> },
    { key:"phone",   header:"Phone Number",     sub:"Contact No.",    render: s=><span className="text-gray-600">{s.phone}</span> },
    { key:"workers", header:"Workers Assigned", sub:"No. of Workers", render: s=><span className="font-bold text-[#0b4f6c]">{s.workers}</span>, center:true },
    { key:"status",  header:"Status",           sub:"Current Status", render: s=><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+statusColor[s.status]}>{s.status}</span> },
    { key:"action",  header:"Action",           sub:"Manage",         render: ()=><div className="flex gap-3"><button className="text-xs text-blue-600 hover:underline">Edit</button><button className="text-xs text-red-500 hover:underline">Remove</button></div> },
  ];
  return (
    <SectionCard title="Supervisors List" icon="👷">
      <div className="flex items-center justify-between mb-4">
        <input type="text" placeholder="🔍  Search by name or zone..." value={search} onChange={e=>setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#0b4f6c]" />
        <span className="text-xs text-gray-500">{filtered.length} record(s)</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#0b4f6c]">
              {cols.map(c=><th key={c.key} className={"px-4 py-3 text-left font-bold text-white text-sm border-r border-white/10 last:border-r-0"+(c.center?" text-center":"")}>{c.header}</th>)}
            </tr>
            <tr className="bg-[#e8f2f7]">
              {cols.map(c=><th key={c.key} className={"px-4 py-1 text-left text-[11px] font-normal text-[#0b4f6c] tracking-wider uppercase border-r border-gray-200 last:border-r-0"+(c.center?" text-center":"")}>{c.sub}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s,i)=>(
              <tr key={s.id} className={"border-b last:border-0 hover:bg-blue-50 transition-colors "+(i%2===0?"bg-white":"bg-gray-50")}>
                {cols.map(c=><td key={c.key} className={"px-4 py-3 border-r border-gray-100 last:border-r-0"+(c.center?" text-center":"")}>{c.render(s)}</td>)}
              </tr>
            ))}
            {filtered.length===0&&<tr><td colSpan={7} className="text-center text-gray-400 py-8 text-sm">No supervisors found.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">* Workers Assigned = total sanitation workers under this supervisor</p>
    </SectionCard>
  );
}

function AddManhole({ showToast }) {
  const init = { mhId:"", zone:"", location:"", depth:"", lat:"", lng:"", type:"", status:"", inspected:"" };
  const [form, setForm] = useState(init);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <SectionCard title="Add New Manhole" icon="🕳">
      <FormSection title="Identification">
        <InputField label="Manhole ID"    placeholder="e.g. MH-005" value={form.mhId} onChange={set("mhId")} required />
        <SelectField label="Zone"         options={["Zone A","Zone B","Zone C","Zone D","Zone E"]} value={form.zone} onChange={set("zone")} required />
        <SelectField label="Manhole Type" options={["Sewer","Stormwater","Combined","Telecom"]}   value={form.type} onChange={set("type")} required />
      </FormSection>
      <FormSection title="Location Details">
        <div className="col-span-3">
          <InputField label="Location / Landmark" placeholder="e.g. Near Bus Stand, Station Road" value={form.location} onChange={set("location")} required />
        </div>
        <InputField label="Latitude"        placeholder="e.g. 17.6868" value={form.lat}   onChange={set("lat")}   />
        <InputField label="Longitude"       placeholder="e.g. 75.9010" value={form.lng}   onChange={set("lng")}   />
        <InputField label="Depth (meters)" type="number" placeholder="e.g. 4.5" value={form.depth} onChange={set("depth")} required />
      </FormSection>
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
          <InputField label="Last Inspected Date" type="date" value={form.inspected} onChange={set("inspected")} />
          <div />
        </div>
      </div>
      <FormButtons onSubmit={()=>{showToast("Manhole registered successfully!");setForm(init);}} onReset={()=>setForm(init)} />
    </SectionCard>
  );
}

function ViewManholes() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = MOCK_MANHOLES.filter(m=>
    (filter==="All"||m.status===filter)&&
    (m.location.toLowerCase().includes(search.toLowerCase())||m.id.includes(search))
  );
  const cols = [
    { key:"id",       header:"Manhole ID",    sub:"Unique ID",       render: m=><span className="font-mono text-xs font-bold text-[#0b4f6c]">{m.id}</span> },
    { key:"location", header:"Location",       sub:"Landmark / Area", render: m=><span>{m.location}</span> },
    { key:"zone",     header:"Zone",           sub:"Assigned Area",   render: m=><span className="text-gray-600">{m.zone}</span> },
    { key:"depth",    header:"Depth",          sub:"In Meters",       render: m=><span className="text-gray-600">{m.depth}</span> },
    { key:"insp",     header:"Last Inspected", sub:"Inspection Date", render: m=><span className="text-gray-500 text-xs">{m.lastInspected}</span> },
    { key:"status",   header:"Safety Status",  sub:"Current State",   render: m=><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+statusColor[m.status]}>{m.status}</span> },
    { key:"action",   header:"Action",         sub:"Manage",          render: ()=><div className="flex gap-3"><button className="text-xs text-blue-600 hover:underline">Edit</button><button className="text-xs text-red-500 hover:underline">Delete</button></div> },
  ];
  return (
    <SectionCard title="Manholes Registry" icon="🕳">
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
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#0b4f6c]">
              {cols.map(c=><th key={c.key} className="px-4 py-3 text-left font-bold text-white text-sm border-r border-white/10 last:border-r-0">{c.header}</th>)}
            </tr>
            <tr className="bg-[#e8f2f7]">
              {cols.map(c=><th key={c.key} className="px-4 py-1 text-left text-[11px] font-normal text-[#0b4f6c] tracking-wider uppercase border-r border-gray-200 last:border-r-0">{c.sub}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m,i)=>(
              <tr key={m.id} className={"border-b last:border-0 hover:bg-blue-50 transition-colors "+(i%2===0?"bg-white":"bg-gray-50")}>
                {cols.map(c=><td key={c.key} className="px-4 py-3 border-r border-gray-100 last:border-r-0">{c.render(m)}</td>)}
              </tr>
            ))}
            {filtered.length===0&&<tr><td colSpan={7} className="text-center text-gray-400 py-8 text-sm">No manholes found.</td></tr>}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function AddDevice({ showToast }) {
  const init = { deviceId:"", type:"", manholeId:"", zone:"", installed:"", battery:"", firmware:"" };
  const [form, setForm] = useState(init);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <SectionCard title="Add New Device" icon="📡">
      <FormSection title="Device Information">
        <InputField label="Device ID"        placeholder="e.g. DEV-2024-091" value={form.deviceId} onChange={set("deviceId")} required />
        <SelectField label="Device Type"     options={["Gas Sensor","Water Level Sensor","Temperature Sensor","Camera","GPS Tracker"]} value={form.type} onChange={set("type")} required />
        <InputField label="Firmware Version" placeholder="e.g. v2.3.1"       value={form.firmware} onChange={set("firmware")} />
      </FormSection>
      <FormSection title="Installation Details">
        <InputField label="Linked Manhole ID" placeholder="e.g. MH-003"  value={form.manholeId} onChange={set("manholeId")} required />
        <SelectField label="Zone"             options={["Zone A","Zone B","Zone C","Zone D","Zone E"]} value={form.zone} onChange={set("zone")} required />
        <InputField label="Installation Date" type="date"                 value={form.installed} onChange={set("installed")} required />
      </FormSection>
      <FormSection title="Battery & Health">
        <InputField label="Battery Level (%)" type="number" placeholder="e.g. 85" value={form.battery} onChange={set("battery")} />
        <div className="col-span-2 flex items-end pb-1">
          <p className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-3 py-2 leading-relaxed">
            ℹ️ Ensure the device is physically installed and powered on before registration. The system will attempt an automatic ping after submission.
          </p>
        </div>
      </FormSection>
      <FormButtons onSubmit={()=>{showToast("Device registered successfully!");setForm(init);}} onReset={()=>setForm(init)} />
    </SectionCard>
  );
}

export default function AdminPage() {
  const [active, setActive] = useState("dashboard");
  const [toast, setToast]   = useState(null);
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };
  const renderPage = () => {
    switch(active) {
      case "dashboard":        return <Dashboard />;
      case "add-supervisor":   return <AddSupervisor showToast={showToast} />;
      case "view-supervisors": return <ViewSupervisors />;
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