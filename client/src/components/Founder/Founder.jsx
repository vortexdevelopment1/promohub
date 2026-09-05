import React from 'react';
import founderImage from "@/assets/images/founder.jpg";

const Founder = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 relative" id="founder">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#110e1c] to-[#151224] border border-purple-500/25 p-8 sm:p-12 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Founder Cutout/Framed Portrait with Circular Neon Halo */}
            <div className="md:col-span-5 relative flex justify-center items-center">
              {/* Radiant Purple Ring Halo */}
              <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-purple-500/40 bg-purple-600/10 blur-md pointer-events-none"></div>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl">
                <img
                  alt="Varun Soni — Founder of Promo Hub"
                  className="w-full h-full object-cover"
                  src={founderImage}
                />
              </div>
            </div>

            {/* Right: Founder Details */}
            <div className="md:col-span-7 flex flex-col items-start gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-purple-400">FOUNDER</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Varun <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Soni</span>
              </h2>
              <div className="flex flex-col gap-2 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                <p>
                  I’m a Video Editor, Social Media Manager &amp; AI Video Creator helping brands grow through creative content and smart digital strategies.
                </p>
                <p>
                  I turn ideas into content that connects, engages &amp; grows.
                </p>
                <p className="text-sm sm:text-base font-semibold text-purple-300">
                  2+ Years Experience | Creative &amp; Digital Marketing
                </p>
              </div>

              {/* Founder Contact Pills with Purple Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08060c] border border-purple-500/30 text-xs text-gray-300 hover:text-white hover:border-purple-400 transition-colors"
                  href="tel:+919977978575"
                >
                  <span className="material-symbols-outlined text-[16px] text-purple-400">phone</span>
                  <span>+91 99779 78575</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08060c] border border-purple-500/30 text-xs text-gray-300 hover:text-white hover:border-purple-400 transition-colors"
                  href="mailto:promo.hub9977@gmail.com"
                >
                  <span className="material-symbols-outlined text-[16px] text-purple-400">mail</span>
                  <span>promo.hub9977@gmail.com</span>
                </a>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08060c] border border-purple-500/30 text-xs text-gray-300">
                  <span className="material-symbols-outlined text-[16px] text-purple-400">location_on</span>
                  <span>Mahalaxmi Nagar, Indore, Madhya Pradesh</span>
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
