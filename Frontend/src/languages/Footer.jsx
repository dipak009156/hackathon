export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-gray-300 text-sm">

      {/* Stats */}
      <div className="grid grid-cols-3 border-y border-white/10">
        {[
          { num: "12,400+", label: "Panels Installed" },
          { num: "98.6%", label: "Customer Satisfaction" },
          { num: "4.2M kg", label: "CO₂ Offset" },
        ].map((s, i) => (
          <div key={i} className="py-5 text-center border-r border-white/10 last:border-r-0">
            <p className="text-xl font-medium text-amber-400">{s.num}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="grid grid-cols-4 gap-10 px-12 py-12 border-b border-white/10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-[#0a1628] font-bold text-sm">S</div>
            <span className="text-white font-medium text-lg">SMC Solar</span>
          </div>
          <p className="text-gray-500 leading-relaxed mb-4">
            Clean, reliable solar energy for homes and businesses.
          </p>
          <div className="flex gap-2">
            {["f", "in", "tw", "yt"].map((s) => (
              <button key={s} className="w-8 h-8 rounded-full border border-white/10 text-gray-500 hover:text-amber-400 hover:border-amber-400/40 transition">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="text-amber-400 text-xs uppercase tracking-widest mb-4">Solutions</h4>
          <ul className="space-y-2">
            {["Residential", "Commercial", "Battery Storage", "EV Chargers", "Maintenance"].map((item) => (
              <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-amber-400 text-xs uppercase tracking-widest mb-4">Company</h4>
          <ul className="space-y-2">
            {["About Us", "Our Team", "Projects", "Careers", "Contact"].map((item) => (
              <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-amber-400 text-xs uppercase tracking-widest mb-4">Newsletter</h4>
          <p className="text-gray-500 mb-3">Solar tips & rebates in your inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="you@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-xs text-white placeholder-gray-600 outline-none" />
            <button className="bg-amber-400 text-[#0a1628] text-xs font-medium px-3 py-2 rounded-md hover:bg-amber-300 transition">
              Join
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            {["NABCEP", "ISO 9001", "SEIA"].map((c) => (
              <span key={c} className="text-[10px] text-amber-400 border border-amber-400/30 rounded px-2 py-0.5">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center px-12 py-4 text-gray-600 text-xs">
        <span>© 2026 SMC Solar. All rights reserved.</span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies", "Sitemap"].map((l) => (
            <a key={l} href="#" className="hover:text-gray-400 transition">{l}</a>
          ))}
        </div>
      </div>

    </footer>
  );
}