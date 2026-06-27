import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
  const [activePage, setActivePage] = useState('home');

  // Render page views based on active nav selection
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'services':
        return <Services />;
      case 'case-studies':
        return <CaseStudies />;
      case 'careers':
        return <Careers />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      {/* Background Ambient Glow Orbs */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Navigation Header */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Area */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Page Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;
