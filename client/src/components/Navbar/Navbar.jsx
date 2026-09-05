import React, { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', active: true },
    { label: 'About Us', href: '#founder' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#metrics' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#08060c]/85 backdrop-blur-xl border-b border-purple-500/15">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 h-20 flex items-center justify-between gap-4 w-full">
        {/* Brand Logo */}
        <a className="flex items-center gap-3 group" href="#home">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-purple-950/40 p-1 flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:border-purple-400 transition-all">
            <img
              alt="Nexa Digital Logo"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W2miHYw4WQQHw4yaKj1OyxAodPGe-CJhKIU7atKX2phLDUmoHYJI4hxeOOgd8E5u0ecuPDHN7eHMHXuQCxACoJEj250DFX6AO3FLWk6McIN-nceDH1KGV8_9HHoKPk0PVm6y81q7c4--FJWuqc4Hkuh5KFyteggOG03iekWbYy-gdHW_-1c7WXaPufV_idmVVHT8kuJ-CKt8P1MkwuBOHZdudGNcGw6qPTr9-p9r_pUMl_tmHj_71iOnMq"
            />
          </div>
          <span className="font-extrabold tracking-wider text-white text-lg">
            NEXA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">DIGITAL</span>
          </span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide text-gray-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={
                link.active
                  ? 'text-white hover:text-purple-300 transition-colors relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-purple-500 after:rounded-full'
                  : 'hover:text-purple-300 transition-colors'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Header CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            href="#contact"
          >
            <span>Let's Work Together</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08060c]/95 border-b border-purple-500/20 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-gray-300 hover:text-purple-300 py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
