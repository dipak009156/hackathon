import React from "react";
import { useTranslation } from "react-i18next";

function Start() {

  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Top Bar */}
      <div className="bg-[#0b4f6c] text-white text-sm flex justify-between px-6 py-2">
        <span>📞 1800-233-1234 | contact@solapurcorporation.gov.in</span>
        <span>Government of Maharashtra</span>
      </div>

      {/* Header */}
      <div className="bg-[#0b4f6c] text-white flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="w-14" />

          <div>
            <h2 className="text-lg font-semibold">
              Solapur Municipal Corporation
            </h2>
            <p className="text-sm">{t("portal")}</p>
            <p className="text-xs opacity-80">
              Government of Maharashtra
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={toggleLanguage}
            className="bg-white text-black px-4 py-1 rounded"
          >
            Language
          </button>

          <button className="bg-yellow-400 text-black px-4 py-1 rounded">
            Login
          </button>
        </div>

      </div>

      {/* Hero Section */}
      <div className="bg-gray-200 flex justify-between items-center px-10 py-12">

        <div className="max-w-xl">

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {t("heroTitle")}
          </h1>

          <p className="text-gray-700 mb-4">
            {t("heroDesc")}
          </p>

          <div className="flex gap-6 text-[#0b4f6c] font-semibold text-sm">
            <span>🛡 {t("safety")}</span>
            <span>⚠ {t("alert")}</span>
            <span>📍 {t("zone")}</span>
          </div>

        </div>

        <img
          src="/worker.jpg"
          alt="worker"
          className="w-[420px] rounded-lg"
        />

      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 px-10 py-10">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">
            {t("guidelines")}
          </h3>

          <ul className="list-disc pl-5 text-gray-700">
            <li>Mandatory use of PPE</li>
            <li>Environmental condition checks</li>
            <li>Supervisor approval before entry</li>
            <li>Immediate hazard reporting</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">
            {t("objectives")}
          </h3>

          <ul className="list-disc pl-5 text-gray-700">
            <li>Reduce manual exposure to hazards</li>
            <li>Improve real-time monitoring</li>
            <li>Enhance worker dignity</li>
            <li>Faster emergency response</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">
            {t("initiative")}
          </h3>

          <ul className="list-disc pl-5 text-gray-700">
            <li>Smart Cities Mission</li>
            <li>Digital India Programme</li>
            <li>Urban Sanitation Safety</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6 px-10 pb-10">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">
            {t("about")}
          </h3>

          <p className="text-gray-700">
            Solapur Municipal Corporation is responsible for
            maintaining urban infrastructure and sanitation
            services in the city.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">
            {t("mission")}
          </h3>

          <p className="text-gray-700">
            To ensure safety, dignity, and efficiency in sanitation
            operations using modern monitoring systems and smart
            city technologies.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Start;