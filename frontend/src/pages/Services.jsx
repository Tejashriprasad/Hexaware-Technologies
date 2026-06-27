import React, { useState } from 'react';
import { Cloud, Cpu, Settings, Smartphone, Shield, Database, X, CheckCircle2 } from 'lucide-react';
import './Services.css';

const Services = () => {
  const [activeModal, setActiveModal] = useState(null);

  const servicesList = [
    {
      id: "srv-amaze",
      icon: <Cloud className="service-icon orange" size={32} />,
      title: "Cloud Modernization via Amaze®",
      shortDesc: "Automate migration and refactoring of legacy applications (Java, .NET) and databases to cloud native ecosystems in record time.",
      details: {
        tagline: "Accelerated Legacy Refactoring & Re-architecting",
        bullets: [
          "Automated code analysis & refactoring patterns",
          "Legacy monolithic-to-microservices containerization",
          "Target cloud databases modernization (SQL/NoSQL)",
          "50% reduction in cloud migration timescales and manual coding"
        ],
        stats: "Up to 40% reduction in cloud migration operational costs"
      }
    },
    {
      id: "srv-tensai",
      icon: <Cpu className="service-icon teal" size={32} />,
      title: "Hyper-Automation via Tensai®",
      shortDesc: "End-to-end cognitive automation platform integrating robot operations, IT service management (ITSM) pipelines, and predictive operations.",
      details: {
        tagline: "Autonomous Operations with Cognitive Insights",
        bullets: [
          "Predictive server remediation and event management",
          "Cognitive customer service bots and virtual IT agents",
          "Seamless ITSM integration (ServiceNow, Jira, etc.)",
          "60%+ drop in high-severity customer service ticket queues"
        ],
        stats: "SLAs improved by 70% with automatic ticket remediation"
      }
    },
    {
      id: "srv-digital",
      icon: <Smartphone className="service-icon purple" size={32} />,
      title: "Digital Products & Product Engineering",
      shortDesc: "Design and build customer-facing mobile applications, APIs, responsive portals, and data architectures with an agile approach.",
      details: {
        tagline: "Modernizing Customer Journeys & Software Products",
        bullets: [
          "User experience (UX) workshops and visual prototypes",
          "Native and cross-platform mobile apps (React Native, Flutter)",
          "API-first headless design architectures",
          "DevOps pipeline orchestration (GitHub Actions, Jenkins, Docker)"
        ],
        stats: "Used by 15M+ active users on consumer retail apps"
      }
    },
    {
      id: "srv-data",
      icon: <Database className="service-icon pink" size={32} />,
      title: "Data Modernization & Analytics",
      shortDesc: "Unlock the value of enterprise data. Design modern data warehouses, real-time analytics engines, and build AI/ML ingestion models.",
      details: {
        tagline: "Extracting Value via AI-infused Data Lakes",
        bullets: [
          "Migration from legacy data warehouse appliances to Snowflake/Databricks",
          "Generative AI model integrations and fine-tuning pipelines",
          "Real-time streaming ingestion patterns (Kafka, Spark)",
          "Data privacy compliance workflows (GDPR, HIPAA)"
        ],
        stats: "10x faster report querying speeds across financial lines"
      }
    },
    {
      id: "srv-enterprise",
      icon: <Settings className="service-icon blue" size={32} />,
      title: "Enterprise Application Consulting",
      shortDesc: "Optimize operations using next-generation software platforms. Implement, upgrade, and support SAP, Workday, and Salesforce environments.",
      details: {
        tagline: "SAP S/4HANA & Workday Core Integrations",
        bullets: [
          "S/4HANA transition roadmap designs & greenfield implementations",
          "Workday HCM deployment & global payroll automation",
          "Salesforce Customer 360 consulting & custom Apex engineering",
          "Continuous application maintenance services (AMS)"
        ],
        stats: "Certified consultants managing 100+ global ERP environments"
      }
    },
    {
      id: "srv-cyber",
      icon: <Shield className="service-icon green" size={32} />,
      title: "Cyber Security & Resiliency",
      shortDesc: "Protect your digital infrastructure against evolving threats. Access vulnerability scanning, 24/7 SOC monitors, and cloud compliance auditing.",
      details: {
        tagline: "Zero Trust Security & Managed SOC services",
        bullets: [
          "24/7 Security Operations Center (SOC) threat detection monitors",
          "Vulnerability Assessment and Penetration Testing (VAPT)",
          "Zero-Trust network architecture consultations",
          "Cloud Security Posture Management (CSPM)"
        ],
        stats: "Securing over 200,000 corporate devices globally"
      }
    }
  ];

  return (
    <div className="services-page anim-fade">
      {/* Page Header */}
      <section className="services-hero">
        <div className="container">
          <span className="section-badge">Capabilities</span>
          <h1 className="services-title">Services & Platforms</h1>
          <p className="services-subtitle">
            Deploying innovative technologies and IP solutions to automate operations, modernize cloud systems, and transform customer experiences.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {servicesList.map((service) => (
              <div key={service.id} className="service-card glass-card">
                <div className="service-icon-container">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.shortDesc}</p>
                <button className="btn btn-outline service-cta-btn" onClick={() => setActiveModal(service)}>
                  View Capabilities
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proprietary Tech Feature Spotlight */}
      <section className="tech-spotlight-section">
        <div className="container">
          <div className="spotlight-header text-center">
            <span className="section-badge">Proprietary IP</span>
            <h2 className="section-title">The Hexaware Edge</h2>
            <p className="section-desc">Our flagship software platforms automate complex transitions and save hours of manual development.</p>
          </div>

          <div className="spotlight-columns">
            <div className="spotlight-col glass-card">
              <div className="spotlight-title-wrap">
                <span className="spotlight-brand orange">amaze<sup>&reg;</sup></span>
                <h3>For Cloud Migration</h3>
              </div>
              <p className="spotlight-text">
                Amaze® is our cloud modernization platform designed to speed up the translation of monolithic systems into highly modern architecture. It analyzes legacy structures and refactors them automatically.
              </p>
              <div className="spotlight-perks">
                <div className="perk-item"><CheckCircle2 size={16} className="perk-icon orange" /> <span>Auto monolithic-to-microservices split</span></div>
                <div className="perk-item"><CheckCircle2 size={16} className="perk-icon orange" /> <span>Refactor code for Azure, AWS, and GCP</span></div>
                <div className="perk-item"><CheckCircle2 size={16} className="perk-icon orange" /> <span>Eliminate commercial licensing overhead</span></div>
              </div>
            </div>

            <div className="spotlight-col glass-card">
              <div className="spotlight-title-wrap">
                <span className="spotlight-brand teal">tensai<sup>&reg;</sup></span>
                <h3>For IT Operations</h3>
              </div>
              <p className="spotlight-text">
                Tensai® is our autonomous platform combining robots, software testing algorithms, and virtual agents to streamline customer and infrastructure operations without human intervention.
              </p>
              <div className="spotlight-perks">
                <div className="perk-item"><CheckCircle2 size={16} className="perk-icon teal" /> <span>Interactive self-healing systems</span></div>
                <div className="perk-item"><CheckCircle2 size={16} className="perk-icon teal" /> <span>Predictive incident auto-remediation</span></div>
                <div className="perk-item"><CheckCircle2 size={16} className="perk-icon teal" /> <span>End-to-end pipeline test coverage bots</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Detail Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-card anim-slide-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-icon-wrap">
                {activeModal.icon}
              </div>
              <div>
                <h2 className="modal-title">{activeModal.title}</h2>
                <p className="modal-tagline">{activeModal.details.tagline}</p>
              </div>
            </div>

            <div className="modal-body">
              <h3 className="modal-section-title">Core Deliverables</h3>
              <ul className="modal-bullets">
                {activeModal.details.bullets.map((bullet, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={18} className="bullet-check-icon" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="modal-stats-box">
                <span className="stats-box-title">Proven Result:</span>
                <p className="stats-box-content">{activeModal.details.stats}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setActiveModal(null)}>Close Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
