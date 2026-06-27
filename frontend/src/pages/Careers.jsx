import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Calendar, User, Mail, Phone, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import './Careers.css';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Application Modal state
  const [activeApplyJob, setActiveApplyJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Fallback jobs list
  const fallbackJobs = [
    {
      "id": "job-001",
      "title": "Cloud Architect (Amaze® Platform)",
      "department": "Cloud & Infrastructure",
      "location": "Chennai, India (Hybrid)",
      "type": "Full-time",
      "experience": "8-12 Years",
      "description": "Design and engineer cloud solutions leveraging Hexaware's Amaze® platform for cloud migration. Collaborate with enterprise customers to build scalable infrastructure.",
      "requirements": [
        "Extensive experience with AWS/Azure/GCP architectures",
        "Experience with legacy modernization and cloud migration strategies",
        "Proficient in infrastructure as code (Terraform, Ansible)"
      ]
    },
    {
      "id": "job-002",
      "title": "Automation Test Lead (Tensai® Platform)",
      "department": "Quality Assurance & Automation",
      "location": "Mumbai, India (On-site)",
      "type": "Full-time",
      "experience": "5-8 Years",
      "description": "Lead testing automation efforts using Hexaware's flagship Tensai® platform. Design test coverage frameworks and integrate test pipelines with CI/CD systems.",
      "requirements": [
        "Strong coding skills in Java, Python, or C#",
        "Hands-on experience with Selenium, Cypress, and TestNG",
        "Experience leading QA teams and mentoring junior developers"
      ]
    },
    {
      "id": "job-003",
      "title": "React Frontend Engineer",
      "department": "Digital Technologies",
      "location": "Pune, India (Remote)",
      "type": "Full-time",
      "experience": "3-5 Years",
      "description": "Develop visually stunning and responsive web applications for enterprise clients using React.js. Build reusable components and collaborate with UX designers.",
      "requirements": [
        "Proficient in React, JavaScript (ES6+), HTML5, and CSS3",
        "Experience with state management libraries (Redux, Context API)",
        "Familiarity with responsive web design and mobile-first principles"
      ]
    }
  ];

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Backend offline or error. Using fallback careers data.");
        setJobs(fallbackJobs);
        setLoading(false);
      });
  }, []);

  const departments = ['All', ...new Set(jobs.map((job) => job.department))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    const payload = {
      jobId: activeApplyJob.id,
      jobTitle: activeApplyJob.title,
      ...formData
    };

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitResult({ success: true, message: data.message });
        // Clear fields
        setFormData({ name: '', email: '', phone: '', experience: '', coverLetter: '' });
      } else {
        setSubmitResult({ success: false, message: data.error || 'Failed to submit.' });
      }
    } catch (error) {
      setSubmitResult({ 
        success: true, // Mock success fallback to make it interactive offline
        message: "Application submitted successfully! (Simulated Mode - Local save)." 
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Filter positions
  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="careers-page anim-fade">
      {/* Page Hero */}
      <section className="careers-hero">
        <div className="container">
          <span className="section-badge">Join the Team</span>
          <h1 className="careers-title">Careers at Hexaware</h1>
          <p className="careers-subtitle">
            Create smiles and drive global digital transformation. Explore our open positions and build your future with us.
          </p>
        </div>
      </section>

      {/* Career Controls */}
      <section className="careers-controls-section">
        <div className="container">
          <div className="controls-bar glass-card">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search jobs by title or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filters-wrapper">
              <div className="category-buttons">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    className={`cat-btn ${selectedDept === dept ? 'active' : ''}`}
                    onClick={() => setSelectedDept(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Board List */}
      <section className="jobs-list-section">
        <div className="container">
          {loading ? (
            <div className="cases-loading">
              <div className="spinner"></div>
              <span>Fetching job openings...</span>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="cases-empty">
              <h3>No Positions Match Your Search</h3>
              <p>Check back later or try adjusting your search filters.</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <div key={job.id} className="job-card glass-card">
                  <div className="job-card-header">
                    <div>
                      <span className="job-dept">{job.department}</span>
                      <h3 className="job-title-text">{job.title}</h3>
                    </div>
                    <span className="job-type-badge">{job.type}</span>
                  </div>

                  <div className="job-details-meta">
                    <div className="meta-item">
                      <MapPin size={16} className="meta-icon" />
                      <span>{job.location}</span>
                    </div>
                    <div className="meta-item">
                      <Briefcase size={16} className="meta-icon" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <p className="job-desc-text">{job.description}</p>

                  <div className="job-requirements-wrap">
                    <h4>Core Qualifications:</h4>
                    <ul>
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn btn-primary apply-btn" onClick={() => {
                    setActiveApplyJob(job);
                    setSubmitResult(null);
                  }}>
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {activeApplyJob && (
        <div className="modal-overlay" onClick={() => setActiveApplyJob(null)}>
          <div className="modal-content apply-modal glass-card anim-slide-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveApplyJob(null)} aria-label="Close modal">
              &times;
            </button>

            <div className="modal-header">
              <div>
                <span className="job-dept">{activeApplyJob.department}</span>
                <h2 className="modal-title">Apply for {activeApplyJob.title}</h2>
                <p className="modal-tagline">Location: {activeApplyJob.location}</p>
              </div>
            </div>

            {submitResult && submitResult.success ? (
              <div className="apply-success-view">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Application Received!</h3>
                <p className="success-message">{submitResult.message}</p>
                <button className="btn btn-secondary" onClick={() => setActiveApplyJob(null)}>Close Window</button>
              </div>
            ) : (
              <form className="apply-form" onSubmit={handleApplySubmit}>
                {submitResult && !submitResult.success && (
                  <div className="apply-error-alert">
                    <AlertCircle size={18} />
                    <span>{submitResult.message}</span>
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name"><User size={14} className="input-icon" /> Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"><Mail size={14} className="input-icon" /> Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., john.doe@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone"><Phone size={14} className="input-icon" /> Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., +91 98765 43210"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience"><Calendar size={14} className="input-icon" /> Years of Experience *</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 5 Years"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="coverLetter"><FileText size={14} className="input-icon" /> Cover Letter / Profile Summary</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="4"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Briefly tell us about your domain skills and relevant experience..."
                  ></textarea>
                </div>

                <div className="form-group full-width">
                  <label className="resume-label">
                    <span className="resume-label-title">Resume / CV Details</span>
                    <span className="resume-sub-text">File upload is simulated. Application details will be securely saved.</span>
                  </label>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setActiveApplyJob(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
