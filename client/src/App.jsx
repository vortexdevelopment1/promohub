import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';

/**
 * ==========================================================
 * PUBLIC WEBSITE ROUTER
 * ==========================================================
 * Dedicated router for the public agency website.
 * Zero admin components or routes.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio/:id" element={<Home />} />
        <Route path="/reel/:id" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
