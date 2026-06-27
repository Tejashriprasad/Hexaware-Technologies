import React, { useState, useEffect } from 'react';
import { Cpu, Cloud, Smile, Award, ArrowRight, ShieldCheck, Zap, Users, Globe2 } from 'lucide-react';
import './Home.css';

const Home = ({ setActivePage }) => {
  const [stats, setStats] = useState({
    employees: "30,000+",
    offices: "35+",
    customerSatisfaction: "98%",
    revenueGrowth: "20%+",
    globalPresence: "30+ Countries",
    retentionRate: "90%"
  });

  const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);
  const headlines = [
    "AUTOMATE EVERYTHING.",
    "CLOUDIFY EVERYTHING.",
    "TRANSFORM CUSTOMER EXPERIENCE."
  ];

  // Rotate hero headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch stats from backend
  useEffect(() => {
    fetch('/api/stats')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => console.log("Backend stats offline. Using client defaults."));
  }, []);

  const coreFocus = [
    {
      icon: <Cpu className="focus-icon teal" size={36} />,
      title: "Automate Everything",
      description: "Harness artificial intelligence, robotics, and machine learning to optimize enterprise tasks. Powered by our proprietary Tensai® platform.",
      badge: "Automation"
    },
    {
      icon: <Cloud className="focus-icon orange" size={36} />,
      title: "Cloudify Everything",
      description: "Transition your legacy workloads to high-speed cloud infrastructure seamlessly. Powered by our automated migration platform Amaze®.",
      badge: "Cloud Modernization"
    },
    {
      icon: <Smile className="focus-icon purple" size={36} />,
      title: "Transform Experiences",
      description: "Revamp customer touchpoints and workflows to increase engagement, loyalty, and brand smiles through user-centric interface design.",
      badge: "Digital CX"
    }
  ];

  const industries = [
    { name: "Banking & Financial Services", icon: "🏦" },
    { name: "Healthcare & Life Sciences", icon: "🏥" },
    { name: "Insurance & Actuarial", icon: "🛡️" },
    { name: "Travel, Transportation & Logistics", icon: "✈️" },
    { name: "Retail & Consumer Goods", icon: "🛒" },
    { name: "Manufacturing & High Tech", icon: "🏭" }
  ];

  return (
    <div className="home-page anim-fade">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-text-content">
            <span className="hero-badge">Creating Smiles Through Technology</span>
            <h1 className="hero-title">
              We design IT services that <br />
              <span className="headline-rotator">
                {headlines[activeHeadlineIndex]}
              </span>
            </h1>
            <p className="hero-description">
              Hexaware is a global technology leader empowering enterprises to achieve digital resilience, operational agility, and industry-leading growth through smart automation and cloud modernization.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => setActivePage('services')}>
                Explore Platforms <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary" onClick={() => setActivePage('contact')}>
                Book Consult
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="visual-circle circle-1"></div>
            <div className="visual-circle circle-2"></div>
            <div className="visual-circle circle-3"></div>
            <div className="hero-hex-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`hex-card hex-${i+1}`}>
                  <div className="hex-card-inner">
                    {i === 0 && <Zap size={24} className="hex-icon" />}
                    {i === 1 && <span className="hex-text">Amaze®</span>}
                    {i === 2 && <Cloud size={24} className="hex-icon" />}
                    {i === 3 && <span className="hex-text">Tensai®</span>}
                    {i === 4 && <Cpu size={24} className="hex-icon" />}
                    {i === 5 && <Smile size={24} className="hex-icon" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <Users size={32} className="stat-icon orange" />
              <h3 className="stat-val">{stats.employees}</h3>
              <p className="stat-lbl">Global Employees</p>
            </div>
            <div className="stat-card glass-card">
              <Globe2 size={32} className="stat-icon teal" />
              <h3 className="stat-val">{stats.globalPresence || stats.offices}</h3>
              <p className="stat-lbl">Global Delivery Footprint</p>
            </div>
            <div className="stat-card glass-card">
              <Award size={32} className="stat-icon purple" />
              <h3 className="stat-val">{stats.customerSatisfaction}</h3>
              <p className="stat-lbl">Client Retention & Smile Index</p>
            </div>
            <div className="stat-card glass-card">
              <ShieldCheck size={32} className="stat-icon pink" />
              <h3 className="stat-val">{stats.revenueGrowth}</h3>
              <p className="stat-lbl">Annual Growth Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies / Pillars */}
      <section className="section focus-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Strategic Pillars</span>
            <h2 className="section-title">Our Digital Focus Areas</h2>
            <p className="section-desc">
              We focus on three technological core competencies to help enterprises transform, automate operations, and scale with minimal friction.
            </p>
          </div>

          <div className="focus-grid">
            {coreFocus.map((item, idx) => (
              <div key={idx} className="focus-card glass-card">
                <div className="focus-badge">{item.badge}</div>
                <div className="focus-icon-wrap">{item.icon}</div>
                <h3 className="focus-card-title">{item.title}</h3>
                <p className="focus-card-desc">{item.description}</p>
                <button className="focus-learn-more" onClick={() => setActivePage('services')}>
                  <span>Learn more</span> <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section industries-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Industries We Serve</span>
            <h2 className="section-title">Driving Value Across Verticals</h2>
            <p className="section-desc">
              Tailoring custom solutions using cloud refactoring and smart automation framework pipelines for diverse global industry groups.
            </p>
          </div>

          <div className="industries-grid">
            {industries.map((ind, index) => (
              <div key={index} className="industry-card glass-card">
                <span className="industry-emoji">{ind.icon}</span>
                <h3 className="industry-name">{ind.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner glass-card">
            <div className="cta-banner-content">
              <h2>Ready to cloudify and automate your operations?</h2>
              <p>Consult with our lead architects to deploy Amaze® and Tensai® platforms in your workspace.</p>
            </div>
            <button className="btn btn-primary cta-btn" onClick={() => setActivePage('contact')}>
              Let's Collaborate <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
