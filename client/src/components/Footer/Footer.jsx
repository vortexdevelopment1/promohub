import React from 'react';
import logoImg from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-[#06050a] border-t border-purple-500/15 py-6">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 w-full">
        <div className="flex items-center gap-2.5">
          <img
            alt="Promo Hub Logo"
            className="w-7 h-7 object-contain rounded-md"
            src={logoImg}
          />
          <span className="font-bold text-gray-300 tracking-wide">PROMO HUB</span>
          <span>© 2026 Promo Hub. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a className="hover:text-purple-300 transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-purple-300 transition-colors" href="#">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
