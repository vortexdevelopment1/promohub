import React from 'react';

const Hero = () => {
  const clientAvatars = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCq0a0VF3fDXmGmllN1NuFzeD4dw2bmKBnG_zbz2IN_f7z-oV9ck5xNDqmm3egb9UbON2UIfiIIEfOs_td0VXTbLQw56IIZg8XgR9QWLXgoTQl1Ou12jbF2Nqm82eeq0x_KL8f-IMgTctH3mDE7x8NXU-bVabOYYtKMA3BiyhcXMZRTvdZPhWBS3xMZ4QIAYHJcvC7plrzeXtOnNYMC-bVyl1WhhrS0RfRsYzmc4UfLX9tqXXlumXozvg",
      alt: "Client Avatar 1",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpK3KbNwybC43iNlC-yW0xAtt2Co5oNzOP6N0Y-HnZszQbOfuI8Ja9GMZqvCKUPMTcGapqnjh0xNWgkcwnOCsPoHG2GGE_0YUhMaVZtnkYipQbuoDle2pk0fKhCcNoBuLdlwRTEDl2xaLO0UraZ1bpaazPhQ2w4PUAQ4Nt6pkOw96l-D3xo7cTxMkkqDtWqMDz_GoqO7EwDb8RGrYqXaBJb5788_1XeXBFLEhxNCeZthaYWlZ1zpNOHQ",
      alt: "Client Avatar 2",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGVVYFx9i_Z8BCQ0wpi4UHuOKjRjk0K70MANGKD1eILhEuabGJKspzJblF-x_K1B5G2ktI0Nm6uBIq16uHy08ugSriz1myVPdSzC7GmeLL5FceXl6zcssX7jRNEJmRW2BC4onfr27YPNU6Qjjotv4AavtlAqhQVd5GJ8L-KiypYZpWz3Y8OrbC5vED-EhfOVRQkOrFqPfn6mNaySg7i3qPjEmFXEVCtrVrHHewNLCNMn4cUKIfy6iB4Q",
      alt: "Client Avatar 3",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-ZJrmUp_9wG-4PhGxDLqpyWjhWk4G8hma06XrY4QYUuI4e7xshbOf3_F8XqEpwQEWnn_6dCjx49lsiYaTIx8ADvBr5do56CGywjDXzfstlC6zK41ILsk0PDv1wOoAy0Pxid9DRQ-idZsIBs-TNjt8KJei90xwpjzRI6sg9KWwUZAH8Ke_jdH8rKradRo-nt2KpjgfN4mnD-IUp_fFjDneLt7w0ttvYMJeLOWXfpoZot6dkfL_WeHYvg",
      alt: "Client Avatar 4",
    },
  ];

  const orbitalBadges = [
    {
      id: 1,
      positionClass: "top-2 right-12",
      icon: "track_changes",
      title: "Strategy",
      subtitle: "Data-driven strategy for real growth",
    },
    {
      id: 2,
      positionClass: "top-1/3 -left-4",
      icon: "edit_note",
      title: "Content",
      subtitle: "Engaging content that connects",
    },
    {
      id: 3,
      positionClass: "top-1/2 -right-4",
      icon: "campaign",
      title: "Ads",
      subtitle: "High converting ads that scale",
    },
    {
      id: 4,
      positionClass: "bottom-2 left-1/4",
      icon: "trending_up",
      title: "Growth",
      subtitle: "Measurable growth that matters",
    },
  ];

  const clientLogos = ["APEX", "VELOCE", "HYPERION", "SOLARIX", "QUANTICO", "SYNTHETIX"];

  return (
    <section className="relative pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[70vh]">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start gap-5 sm:gap-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-300">
                Independent Creative Growth Studio
              </span>
            </div>

            {/* Distinctive Punchy Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.12]">
              WE ENGINEER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300">CULTURAL MOMENTUMS</span> &amp; HIGH-CONVERTING BRAND EXPERIENCES.
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-sm sm:text-base text-gray-300/90 max-w-xl font-normal leading-relaxed">
              We fuse cinematic viral storytelling with algorithmic paid media engineering, immersive web design, and full-funnel predictive growth architecture to scale market leaders into dominant category icons.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-bold text-xs tracking-wide shadow-[0_0_30px_rgba(168,85,247,0.55)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] hover:scale-[1.02] transition-all"
                href="#portfolio"
              >
                <span>Explore Selected Works / Reel</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
              <a
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#151224] border border-purple-500/30 text-white font-semibold text-xs hover:border-purple-400 hover:bg-purple-950/40 transition-all"
                href="#contact"
              >
                <span>Book Agency Discovery</span>
                <span className="material-symbols-outlined text-[16px] text-purple-400 material-symbols-fill">play_arrow</span>
              </a>
            </div>

            {/* Trust Badge Cluster */}
            <div className="pt-3 sm:pt-4 flex items-center gap-4">
              {/* Avatar Cluster */}
              <div className="flex -space-x-2.5 overflow-hidden">
                {clientAvatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    alt={avatar.alt}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#08060c] object-cover"
                    src={avatar.src}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">15+ Video Call Consultations Done</span>
                  <span className="material-symbols-outlined text-purple-400 text-[16px] material-symbols-fill">verified</span>
                </div>
                <span className="text-[11px] text-gray-400">Over $250M+ Verified Client Revenue • Top Performance Partner Meta &amp; Google</span>
              </div>
            </div>
          </div>

          {/* Right Column: Glowing 3D Pedestal with Surrounding Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Center Radial Purple Aura */}
            <div className="absolute w-[420px] h-[420px] bg-purple-600/30 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              {/* 3D Centerpiece Visual */}
              <div className="relative z-10 w-[340px] h-[340px] rounded-full overflow-hidden flex items-center justify-center">
                <img
                  alt="Nexa Digital 3D Holographic Core"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1X0aBzhSnwt7gjVJCYZvEfxs7x_aigoky1YHAjK8VtVOtVb5c5FvUYHoX5PULHBAMk1HCjZOYXAuPl2-sDINIRWWo3zIwBYsc8p6vmBUtVrCRImvRIN86h3xi69VR47lOwZ4FU_q-88C1imyyUovQTkNZFKWOCHbSXiQaWeqQSjNL-GYzM8QpRPB56wv3KG717S_edTKZci3CIgeEKykB3_0i1mle82NIfQiJAFVTmbWhHslqME6ngZ15bA"
                />
              </div>

              {/* Futuristic Glowing Pedestal Base */}
              <div className="absolute bottom-4 inset-x-8 h-12 bg-gradient-to-r from-purple-900/0 via-purple-600/30 to-purple-900/0 rounded-[100%] blur-sm pointer-events-none border-b-2 border-purple-400/50"></div>

              {/* Surrounding Orbital Pills */}
              {orbitalBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`absolute ${badge.positionClass} z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#110e1c]/90 border border-purple-500/30 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)]`}
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-900/50 border border-purple-400/40 flex items-center justify-center text-purple-300">
                    <span className="material-symbols-outlined text-[18px]">{badge.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{badge.title}</span>
                    <span className="text-[10px] text-gray-400">{badge.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CLIENT LOGOS TICKER / TRUST BAR */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-purple-500/15">
          <p className="text-center text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase mb-5">
            TRUSTED BY BUSINESSES ACROSS INDUSTRIES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20 opacity-70">
            {clientLogos.map((logo, index) => (
              <span
                key={index}
                className="text-lg md:text-xl font-black tracking-widest text-gray-300 hover:text-purple-400 transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
