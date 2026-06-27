import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import './CaseStudies.css';

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCase, setSelectedCase] = useState(null);

  // Fallback case studies if api fails
  const fallbackCaseStudies = [
    {
      id: "case-001",
      title: "Legacy Modernization via Amaze® for a Global Retail Bank",
      category: "Cloud & Infrastructure",
      client: "Fortune 500 Bank",
      challenge: "A major retail banking client was struggling with high hosting costs and operational delays due to an outdated monolithic legacy framework running on-premise.",
      solution: "Leveraged Hexaware's Amaze® platform to automatically refactor, re-architect, and migrate the bank's core customer portal to Microsoft Azure, containerizing the workload using AKS.",
      impact: [
        "40% reduction in infrastructure operating costs",
        "Accelerated migration timeline by 50% compared to manual rewrites",
        "Improved platform scalability to support 10M+ daily active sessions"
      ]
    },
    {
      id: "case-002",
      title: "Autonomous IT Operations powered by Tensai® for Healthcare Leader",
      category: "Automation",
      client: "Leading Health Insurance Provider",
      challenge: "The client had over 15,000 monthly incident tickets leading to server downtime, slow response times, and highly manual operational overhead.",
      solution: "Deployed Hexaware's Tensai® platform to orchestrate auto-remediation workflows, integrating machine learning modules to predict potential server alerts and automatically resolve high-volume alerts.",
      impact: [
        "65% reduction in high-priority IT incident ticket count",
        "Mean Time to Resolve (MTTR) slashed from 4 hours to under 6 minutes",
        "Over $1.2M saved annually in operational support costs"
      ]
    },
    {
      id: "case-003",
      title: "Omnichannel CX Transformation for an International Airlines Group",
      category: "Digital IT Services",
      client: "Global Airline Alliance",
      challenge: "Fliers experienced long queue times on support lines and disjointed web/app experiences during service disruption events.",
      solution: "Re-engineered the flight support experience using generative AI conversational agents, unified customer profiles, and modernized web UI channels.",
      impact: [
        "Customer Satisfaction (CSAT) rating boosted by 30%",
        "70% of routine inquiries resolved without human agent intervention",
        "Seamless customer profiles accessible in real-time across agents globally"
      ]
    }
  ];

  useEffect(() => {
    fetch('/api/case-studies')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setCaseStudies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Backend offline or error. Using fallback case studies data.");
        setCaseStudies(fallbackCaseStudies);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Cloud & Infrastructure', 'Automation', 'Digital IT Services'];

  // Filtering
  const filteredCaseStudies = caseStudies.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.challenge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="case-studies-page anim-fade">
      {/* Page Hero */}
      <section className="case-hero">
        <div className="container">
          <span className="section-badge">Success Stories</span>
          <h1 className="case-title">Case Studies</h1>
          <p className="case-subtitle">
            Explore how we partnered with global enterprises to drive business outcomes, cloud refactoring, and cognitive automation.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar Controls */}
      <section className="controls-section">
        <div className="container">
          <div className="controls-bar glass-card">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search case studies, clients, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filters-wrapper">
              <SlidersHorizontal size={16} className="filter-bar-icon" />
              <div className="category-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="cases-grid-section">
        <div className="container">
          {loading ? (
            <div className="cases-loading">
              <div className="spinner"></div>
              <span>Fetching case studies...</span>
            </div>
          ) : filteredCaseStudies.length === 0 ? (
            <div className="cases-empty">
              <h3>No Case Studies Found</h3>
              <p>Try adjusting your search filters or keyword query.</p>
            </div>
          ) : (
            <div className="cases-grid">
              {filteredCaseStudies.map((study) => (
                <div key={study.id} className="case-card glass-card" onClick={() => setSelectedCase(study)}>
                  <div className="case-card-header">
                    <span className="case-category-badge">{study.category}</span>
                    <span className="case-client-name">{study.client}</span>
                  </div>
                  <h3 className="case-card-title">{study.title}</h3>
                  <p className="case-card-challenge-preview">
                    <strong>Challenge:</strong> {study.challenge.substring(0, 120)}...
                  </p>
                  <div className="case-card-footer">
                    <button className="case-read-btn">
                      <span>Read Full Study</span>
                      <BookOpen size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detailed Case Overlay Drawer */}
      {selectedCase && (
        <div className="modal-overlay" onClick={() => setSelectedCase(null)}>
          <div className="modal-content case-drawer glass-card anim-slide-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCase(null)} aria-label="Close modal">
              &times;
            </button>

            <div className="drawer-header">
              <span className="case-category-badge">{selectedCase.category}</span>
              <h2 className="drawer-title">{selectedCase.title}</h2>
              <p className="drawer-client">Client Profile: <strong>{selectedCase.client}</strong></p>
            </div>

            <div className="drawer-body">
              <div className="drawer-section">
                <h3 className="drawer-subtitle"><Layers size={16} className="subtitle-icon orange" /> The Challenge</h3>
                <p className="drawer-text">{selectedCase.challenge}</p>
              </div>

              <div className="drawer-section">
                <h3 className="drawer-subtitle"><Layers size={16} className="subtitle-icon teal" /> Our Solution</h3>
                <p className="drawer-text">{selectedCase.solution}</p>
              </div>

              <div className="drawer-section">
                <h3 className="drawer-subtitle"><CheckCircle2 size={18} className="subtitle-icon purple" /> Business Impact & Deliverables</h3>
                <ul className="impact-bullets">
                  {selectedCase.impact.map((imp, idx) => (
                    <li key={idx}>
                      <span className="bullet-number">{idx + 1}</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedCase(null)}>Close Case Study</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudies;
