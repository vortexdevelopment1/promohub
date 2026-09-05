import React from 'react';
import { services } from '../../data/services';

const Services = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 relative" id="services">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>OUR SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Do</span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-4 max-w-md">
            <p className="text-xs sm:text-sm text-gray-400 md:text-right">
              End-to-end digital marketing services designed to build your brand, engage your audience and deliver measurable results.
            </p>
            <a
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 text-xs font-semibold text-gray-300 hover:text-white hover:border-purple-400 transition-colors"
              href="#contact"
            >
              <span>View All Services</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 6 Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-[#110e1c]/80 border border-purple-500/20 hover:border-purple-400/50 hover:bg-[#151224] transition-all group flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4 group-hover:scale-110 group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                <span className="material-symbols-outlined text-[24px]">{service.icon}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
