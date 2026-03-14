// WorkerDashboard.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Worker() {
  const { t, i18n } = useTranslation();
  const [showHealthEdit, setShowHealthEdit] = useState(false);
  const [showQuery, setShowQuery] = useState(false);

  // Mock data - replace with actual data
  const worker = {
    name: "Ramesh Jadhav",
    id: "SMC-W-1042",
    photo: "/worker-photo.jpg",
    phone: "9876543210",
  };

  const healthCard = {
    bloodGroup: "O+",
    lastCheckup: "15 Jan 2025",
    conditions: "None",
    emergencyContact: "9123456789",
    fitness: "Fit for Duty",
  };

  const currentOperation = {
    id: "OP-2025-0892",
    location: "Sector 12, Main Road Manhole #47",
    date: "Today, 10:00 AM",
    supervisor: "Suresh Patil",
    supervisorPhone: "9988776655",
    status: "Assigned",
    equipment: ["Safety Harness", "Gas Detector", "Helmet", "Gloves"],
  };

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Simple Header */}
      <div className="bg-[#0b4f6c] text-white px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="SMC"
              className="w-10 h-10 rounded-full bg-white"
            />
            <span className="font-semibold">SMC Safety Portal</span>
          </div>
          <button
            onClick={toggleLanguage}
            className="bg-white text-black text-sm px-3 py-1.5 rounded"
          >
            {i18n.language === "en" ? "मराठी" : "English"}
          </button>
        </div>
      </div>

      {/* Worker Info Strip */}
      <div className="bg-[#083d54] text-white px-4 py-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <img src={worker.photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-semibold">{worker.name}</p>
          <p className="text-xs opacity-75">ID: {worker.id}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* HEALTH CARD */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="text-lg font-semibold">Health Card</span>
          </div>

          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Blood Group</p>
                <p className="font-bold text-lg text-red-600">{healthCard.bloodGroup}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Fitness Status</p>
                <p className="font-bold text-green-600">{healthCard.fitness}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Last Checkup</p>
                <p className="font-semibold">{healthCard.lastCheckup}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Emergency Contact</p>
                <p className="font-semibold">{healthCard.emergencyContact}</p>
              </div>
            </div>

            <button
              onClick={() => setShowHealthEdit(true)}
              className="w-full bg-[#0b4f6c] text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
            >
              ✏️ View / Edit Health Info
            </button>
          </div>
        </div>

        {/* CURRENT OPERATION */}
        {currentOperation ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-orange-500 text-white px-4 py-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <span className="text-lg font-semibold">Today's Assignment</span>
            </div>

            <div className="p-4 space-y-3">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg">
                <p className="text-xs text-orange-700">Location</p>
                <p className="font-semibold text-gray-800">{currentOperation.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Time</p>
                  <p className="font-semibold">{currentOperation.date}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Supervisor</p>
                  <p className="font-semibold">{currentOperation.supervisor}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs mb-2">Required Equipment</p>
                <div className="flex flex-wrap gap-2">
                  {currentOperation.equipment.map((item) => (
                    <span
                      key={item}
                      className="bg-[#0b4f6c] text-white text-xs px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call Supervisor */}
              <a
                href={`tel:${currentOperation.supervisorPhone}`}
                className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
              >
                📞 Call Supervisor
              </a>

              {/* Query Button */}
              <button
                onClick={() => setShowQuery(true)}
                className="w-full bg-yellow-500 text-black py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
              >
                ❓ Raise Query / Problem
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <span className="text-4xl">✅</span>
            <p className="text-gray-600 mt-2">No assignment today</p>
          </div>
        )}

        {/* Emergency Button */}
        <button className="w-full bg-red-600 text-white py-5 rounded-xl text-xl font-bold flex items-center justify-center gap-2 shadow-lg">
          🚨 EMERGENCY SOS
        </button>
      </div>

      {/* Health Edit Modal */}
      {showHealthEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Edit Health Info</h2>
              <button
                onClick={() => setShowHealthEdit(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Blood Group</label>
                <select className="w-full border rounded-lg p-3 text-lg">
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Medical Conditions</label>
                <textarea
                  className="w-full border rounded-lg p-3 text-lg"
                  rows={2}
                  placeholder="Any health conditions..."
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Emergency Contact</label>
                <input
                  type="tel"
                  className="w-full border rounded-lg p-3 text-lg"
                  placeholder="Phone number"
                  defaultValue={healthCard.emergencyContact}
                />
              </div>

              <button
                onClick={() => setShowHealthEdit(false)}
                className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold"
              >
                ✓ Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Query Modal */}
      {showQuery && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Raise Query</h2>
              <button onClick={() => setShowQuery(false)} className="text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Select Issue</label>
                <select className="w-full border rounded-lg p-3 text-lg">
                  <option>Equipment Problem</option>
                  <option>Safety Concern</option>
                  <option>Location Issue</option>
                  <option>Health Issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Describe Problem</label>
                <textarea
                  className="w-full border rounded-lg p-3 text-lg"
                  rows={3}
                  placeholder="What is the problem?"
                />
              </div>

              <button
                onClick={() => setShowQuery(false)}
                className="w-full bg-yellow-500 text-black py-4 rounded-xl text-lg font-semibold"
              >
                📤 Submit Query
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
