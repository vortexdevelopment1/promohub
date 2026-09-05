import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Founder from '../components/Founder/Founder';
import Stats from '../components/Stats/Stats';
import Portfolio from '../components/Portfolio/Portfolio';
import Services from '../components/Services/Services';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

/**
 * ==========================================================
 * PUBLIC AGENCY LANDING PAGE
 * ==========================================================
 * Pure public website containing all agency sections.
 */
const Home = () => {
  return (
    <div className="bg-[#08060c] font-sans text-gray-200 selection:bg-purple-600 selection:text-white min-h-screen relative overflow-x-hidden antialiased">
      {/* Ambient Backdrop Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[160px]"></div>
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] bg-fuchsia-950/15 rounded-full blur-[170px]"></div>
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[180px]"></div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 w-full pt-20" id="home">
        <Hero />
        <About />
        <Founder />
        <Stats />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
