import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Videos from './pages/Videos';
import ContactEnquiries from './pages/ContactEnquiries';

/**
 * ==========================================================
 * ADMIN APP ROUTER (Standalone Admin Application)
 * ==========================================================
 * Dedicated React Router for the Admin Studio:
 * - /admin/login              -> Admin Login Page
 * - /admin/videos             -> Video Studio (Protected in AdminLayout)
 * - /admin/contact-enquiries   -> Contact Enquiries Page (Protected in AdminLayout)
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/videos" replace />} />
              <Route path="videos" element={<Videos />} />
              <Route path="contact-enquiries" element={<ContactEnquiries />} />
              <Route path="contacts" element={<Navigate to="/admin/contact-enquiries" replace />} />
              <Route path="enquiries" element={<Navigate to="/admin/contact-enquiries" replace />} />
            </Route>
          </Route>

          {/* Root redirect to Admin */}
          <Route path="/" element={<Navigate to="/admin/videos" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/admin/videos" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
