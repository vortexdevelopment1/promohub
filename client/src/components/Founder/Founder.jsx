import React from 'react';
import founderImage from "@/assets/images/founder.jpg";

const Founder = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 relative" id="founder">
      <div id="about" className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#110e1c] to-[#151224] border border-purple-500/25 p-8 sm:p-12 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Founder Cutout/Framed Portrait with Circular Neon Halo */}
            <div className="md:col-span-5 relative flex justify-center items-center">
              {/* Radiant Purple Ring Halo */}
              <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-purple-500/40 bg-purple-600/10 blur-md pointer-events-none"></div>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl">
                <img
                  alt="Julian Vance — Founder & Creative Director of Nexa Digital"
                  className="w-full h-full object-cover"
                  src={founderImage}
                />
              </div>
            </div>

            {/* Right: Founder Manifesto & Details */}
            <div className="md:col-span-7 flex flex-col items-start gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-purple-400">FOUNDER</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Julian Vance</span>
              </h2>
              <p className="text-sm font-semibold text-purple-300">
                Founder &amp; Creative Director of Nexa Digital
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                For over 12 years, Julian Vance has stood at the intersection of high-velocity algorithmic acquisition and cinematic brand prestige. Having directed hyper-scale creative growth labs in Silicon Valley that steered 14 ventures through Series A to multi-billion dollar public offerings, Julian founded Nexa Digital to eradicate bureaucratic agency mediocrity.
              </p>

              {/* Founder Contact Pills with Purple Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08060c] border border-purple-500/30 text-xs text-gray-300 hover:text-white hover:border-purple-400 transition-colors"
                  href="tel:+14158903420"
                >
                  <span className="material-symbols-outlined text-[16px] text-purple-400">phone</span>
                  <span>+1 (415) 890-3420</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08060c] border border-purple-500/30 text-xs text-gray-300 hover:text-white hover:border-purple-400 transition-colors"
                  href="mailto:julian@nexadigital.agency"
                >
                  <span className="material-symbols-outlined text-[16px] text-purple-400">mail</span>
                  <span>julian@nexadigital.agency</span>
                </a>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08060c] border border-purple-500/30 text-xs text-gray-300">
                  <span className="material-symbols-outlined text-[16px] text-purple-400">location_on</span>
                  <span>San Francisco, CA / New York, NY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
