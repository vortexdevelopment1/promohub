import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const About = () => {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section className="py-8 sm:py-10 md:py-12 relative" id="about">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full">
        <div
          ref={sectionRef}
          className={`reveal-section ${isVisible ? 'is-revealed' : ''} relative rounded-3xl bg-gradient-to-r from-[#110e1c] to-[#151224] border border-purple-500/25 p-8 sm:p-12 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]`}
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-6 max-w-4xl">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>ABOUT US</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Us</span>
            </h2>

            {/* Content */}
            <div className="flex flex-col gap-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              <p>
                QubecloudHub is a creative digital marketing agency based in Indore, helping businesses grow with strategy, creativity, and powerful content. Founded by Varun Soni, QubecloudHub combines expertise in video editing, content creation, and digital marketing to help brands stand out and achieve real results in the digital world.
              </p>
              <p>
                With over 2 years of hands-on experience, we have worked with clients across multiple industries — delivering result-oriented, creative, and professional solutions that focus on long-term growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
