import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/images/logo.png';

/**
 * ==========================================================
 * DEDICATED ADMIN LAYOUT
 * ==========================================================
 * Sidebar:
 * - Videos
 * - View Website (opens public website at localhost:5173)
 * - Logout
 */
const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const publicWebsiteUrl = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5173';

  return (
    <div className="min-h-screen bg-[#08060c] text-gray-200 flex flex-col md:flex-row antialiased selection:bg-purple-600 selection:text-white">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#0d0a17] border-b border-purple-500/20 z-40">
        <div className="flex items-center">
          <img
            src={logoImg}
            alt="QubecloudHub"
            className="h-9 w-auto object-contain"
          />
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Dedicated Admin Sidebar */}
      <aside
        className={`fixed md:static top-0 bottom-0 left-0 z-50 w-64 bg-[#0d0a17] border-r border-purple-500/20 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Admin Header */}
          <div className="flex items-center justify-center px-2 pt-2">
            <img
              src={logoImg}
              alt="QubecloudHub"
              className="h-[78px] w-auto max-w-full object-contain"
            />
          </div>

          {/* Navigation Links: Videos & Contact Enquiries */}
          <nav className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80 px-3 mb-1">
              Menu
            </span>
            <NavLink
              to="/admin/videos"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-[#151124] border border-transparent'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">movie</span>
              <span>Videos</span>
            </NavLink>

            <NavLink
              to="/admin/contact-enquiries"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-[#151124] border border-transparent'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
              <span>Contact Enquiries</span>
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer: View Website & Logout */}
        <div className="flex flex-col gap-2 pt-4 border-t border-purple-500/15">
          {/* View Website */}
          <a
            href={publicWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-gray-300 hover:text-purple-300 hover:bg-[#151124] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-purple-400">language</span>
              <span>View Website</span>
            </span>
            <span className="material-symbols-outlined text-[14px] text-gray-500">open_in_new</span>
          </a>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Logout</span>
          </button>

          {/* Admin Email */}
          <div className="px-3 pt-2">
            <span className="text-[10px] text-gray-500 truncate block">
              Logged in: {admin?.email || 'Admin'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#08060c]">
        <div className="flex-1 w-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
