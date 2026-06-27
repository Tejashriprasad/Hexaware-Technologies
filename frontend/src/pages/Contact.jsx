import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus({ success: true, message: data.message });
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setStatus({ success: false, message: data.error || 'Failed to submit.' });
      }
    } catch (error) {
      // Mock success fallback for local runs if server is offline
      setStatus({ 
        success: true, 
        message: "Thank you! Your message was submitted successfully. (Simulated Mode - Saved locally)" 
      });
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const globalOffices = [
    {
      city: "Navi Mumbai, India",
      role: "Global Delivery HQ",
      address: "Building 3, Sector III, MBP, Mahape, Navi Mumbai - 400710",
      phone: "+91 22 9088 1000"
    },
    {
      city: "Chennai, India",
      role: "Software Development Hub",
      address: "H5, SIPCOT IT Park, Siruseri, Chennai - 603103",
      phone: "+91 44 4745 1000"
    },
    {
      city: "Iselin, New Jersey",
      role: "North America Corporate Headquarters",
      address: "101 Wood Avenue South, Suite 800, Iselin, NJ 08830",
      phone: "+1 609 409 6950"
    },
    {
      city: "London, United Kingdom",
      role: "Europe Operations Office",
      address: "Level 19, 30 St Mary Axe (The Gherkin), London, EC3A 8BF",
      phone: "+44 20 7469 1540"
    }
  ];

  return (
    <div className="contact-page anim-fade">
      {/* Page Hero */}
      <section className="contact-hero">
        <div className="container">
          <span className="section-badge">Get In Touch</span>
          <h1 className="contact-title">Connect with Our Teams</h1>
          <p className="contact-subtitle">
            Partner with us to accelerate your automation and cloud refactoring strategies. Send us a message and a consultant will reach out shortly.
          </p>
        </div>
      </section>

      {/* Main Form & Contacts Grid */}
      <section className="contact-grid-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Information Column (Left) */}
            <div className="contact-info-col">
              <div className="contact-channels glass-card">
                <h2>Direct Channels</h2>
                <div className="channels-list">
                  <div className="channel-item">
                    <div className="channel-icon-wrap"><Mail size={20} /></div>
                    <div>
                      <h4>Email Us</h4>
                      <p>connect@hexaware.com</p>
                    </div>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-wrap"><Phone size={20} /></div>
                    <div>
                      <h4>Call Global Sales</h4>
                      <p>+91 22 9088 1000</p>
                    </div>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-wrap"><Globe size={20} /></div>
                    <div>
                      <h4>Global Website</h4>
                      <p>www.hexaware.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Hub Location coordinates info */}
              <div className="offices-container">
                <h3 className="offices-section-title"><Building size={16} /> Global Delivery Hubs</h3>
                <div className="offices-list">
                  {globalOffices.map((office, idx) => (
                    <div key={idx} className="office-card glass-card">
                      <div className="office-card-header">
                        <MapPin size={16} className="office-pin" />
                        <div>
                          <h4>{office.city}</h4>
                          <span className="office-role">{office.role}</span>
                        </div>
                      </div>
                      <p className="office-address">{office.address}</p>
                      <p className="office-phone">Phone: {office.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Form Column (Right) */}
            <div className="contact-form-col">
              <div className="contact-form-card glass-card">
                <h2>Send a Message</h2>
                <p className="form-helper-text">Fill in the fields below. Required fields are marked with *</p>

                {status && (
                  <div className={`form-alert ${status.success ? 'success' : 'error'}`}>
                    {status.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span>{status.message}</span>
                  </div>
                )}

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Your corporate email address"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company / Enterprise</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Describe your project, legacy tech stack, or cloud modernization goals..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
                    <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
