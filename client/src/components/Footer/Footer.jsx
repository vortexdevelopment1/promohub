import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-[#06050a] border-t border-purple-500/15 py-6">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 w-full">
        <div className="flex items-center gap-2">
          <img
            alt="Promo Hub Logo"
            className="w-5 h-5 object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1W2miHYw4WQQHw4yaKj1OyxAodPGe-CJhKIU7atKX2phLDUmoHYJI4hxeOOgd8E5u0ecuPDHN7eHMHXuQCxACoJEj250DFX6AO3FLWk6McIN-nceDH1KGV8_9HHoKPk0PVm6y81q7c4--FJWuqc4Hkuh5KFyteggOG03iekWbYy-gdHW_-1c7WXaPufV_idmVVHT8kuJ-CKt8P1MkwuBOHZdudGNcGw6qPTr9-p9r_pUMl_tmHj_71iOnMq"
          />
          <span className="font-bold text-gray-300">PROMO HUB</span>
          <span>© 2025 Promo Hub. All Rights Reserved.</span>
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
