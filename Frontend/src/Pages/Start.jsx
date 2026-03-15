import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import {Link } from 'react-router-dom'


const stats = [
  { num: "1,240+", label: "Workers Registered" },
  { num: "98%", label: "PPE Compliance" },
  { num: "24/7", label: "Monitoring Active" },
  { num: "0", label: "Incidents This Month" },
];

export default function Start() {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");

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
          <img src="/logo.png" alt="SMC Logo" className="w-14 h-14 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">Solapur Municipal Corporation</h2>
            <p className="text-sm">{t("portal")}</p>
            <p className="text-xs opacity-75">Government of Maharashtra</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={toggleLanguage} className="bg-white text-black text-sm px-4 py-1.5 rounded">
            🌐 {i18n.language === "en" ? "मराठी" : "English"}
          </button>
          <Link to='/login' className="bg-yellow-400 text-black font-semibold text-sm px-4 py-1.5 rounded">
            Login →
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 bg-[#083d54]">
        {stats.map((s, i) => (
          <div key={i} className="py-3 text-center border-r border-white/10 last:border-r-0">
            <p className="text-yellow-400 text-lg font-bold">{s.num}</p>
            <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Hero */}
      <div className="bg-gray-200 flex justify-between items-center px-10 py-12 gap-8">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{t("heroTitle")}</h1>
          <p className="text-gray-600 mb-5 leading-relaxed">{t("heroDesc")}</p>
          <div className="flex gap-3">
            {["🛡 " + t("safety"), "⚠ " + t("alert"), "📍 " + t("zone")].map((b) => (
              <span key={b} className="bg-[#0b4f6c] text-white text-xs px-4 py-2 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
        <img src="/worker.jpg" alt="Sanitation worker" className="w-96 rounded-lg object-cover" />
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-6 px-10 py-10">
        {[
          {
            title: t("guidelines"),
            items: ["Mandatory use of PPE", "Environmental condition checks", "Supervisor approval before entry", "Immediate hazard reporting"],
          },
          {
            title: t("objectives"),
            items: ["Reduce manual hazard exposure", "Improve real-time monitoring", "Enhance worker dignity", "Faster emergency response"],
          },
          {
            title: t("initiative"),
            items: ["Smart Cities Mission", "Digital India Programme", "Urban Sanitation Safety"],
          },
        ].map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">
              {card.title}
            </h3>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              {card.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* About & Mission */}
      <div className="grid grid-cols-2 gap-6 px-10 pb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">{t("about")}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Solapur Municipal Corporation is responsible for maintaining urban infrastructure
            and sanitation services in the city of Solapur, Maharashtra.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-base mb-3 pl-2 border-l-4 border-[#0b4f6c]">{t("mission")}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            To ensure safety, dignity, and efficiency in sanitation operations using modern
            monitoring systems and smart city technologies.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}