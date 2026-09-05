import React from 'react';
import { testimonials } from '../../data/testimonials';

const Testimonials = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 relative" id="testimonials">
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>WHAT OUR CLIENTS SAY</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Real Feedback, <span className="text-purple-400">Real Results</span>
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 text-xs font-semibold text-gray-300 hover:text-white hover:border-purple-400 transition-colors"
            href="#contact"
          >
            <span>View All Testimonials</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </a>
        </div>

        {/* 3 Testimonial Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#110e1c]/80 border border-purple-500/20 flex flex-col justify-between hover:border-purple-400/50 hover:bg-[#151224] transition-all"
            >
              <div className="flex flex-col gap-4">
                <span className="text-3xl font-serif text-purple-400 leading-none">“</span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {item.quote}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-purple-500/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-white font-bold text-xs">
                    {item.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-gray-400">{item.role}</span>
                  </div>
                </div>
                <div className="flex items-center text-amber-400 text-[14px]">
                  {'★'.repeat(item.rating || 5)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
