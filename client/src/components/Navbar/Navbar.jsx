import React, { useState } from 'react';
import logoImg from '../../assets/images/logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', active: true },
    { label: 'About Us', href: '#about' },
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
        <a className="flex items-center group" href="#home">
          <img
            src={logoImg}
            alt="Promo Hub Logo"
            className="h-16 sm:h-[72px] md:h-[86px] w-auto object-contain translate-y-1 sm:translate-y-1.5 transition-transform duration-300 group-hover:scale-105"
          />
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
