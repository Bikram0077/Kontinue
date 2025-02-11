import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PodcastHub from './components/PodcastHub';
import Clients from './components/Clients';
import Contact from './components/Contact';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Head from 'next/head';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route path="/" element={
          <div className="relative bg-black">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <PodcastHub />
            <Clients />
            <Contact />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
