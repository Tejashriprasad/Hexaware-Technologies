const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read JSON data safely
const readData = (fileName) => {
  const filePath = path.join(__dirname, 'data', fileName);
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
};

// Helper function to write JSON data safely
const writeData = (fileName, data) => {
  const filePath = path.join(__dirname, 'data', fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
};

// API Endpoints

// 1. Get Corporate Stats
app.get('/api/stats', (req, res) => {
  res.json({
    employees: "30,000+",
    offices: "35+",
    customerSatisfaction: "98%",
    revenueGrowth: "20.1% YoY",
    retentionRate: "90%",
    globalPresence: "30+ Countries"
  });
});

// 2. Get Case Studies
app.get('/api/case-studies', (req, res) => {
  const caseStudies = readData('case_studies.json');
  res.json(caseStudies);
});

// 3. Get Job Openings
app.get('/api/jobs', (req, res) => {
  const jobs = readData('jobs.json');
  res.json(jobs);
});

// 4. Submit Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, company } = req.body;

  // Simple validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const submissions = readData('submissions.json');
  const newSubmission = {
    id: `sub-${Date.now()}`,
    name,
    email,
    subject,
    message,
    company: company || 'N/A',
    submittedAt: new Date().toISOString()
  };

  submissions.push(newSubmission);
  
  if (writeData('submissions.json', submissions)) {
    res.status(201).json({ 
      success: true, 
      message: "Thank you for reaching out! Your message has been received.",
      submissionId: newSubmission.id
    });
  } else {
    res.status(500).json({ error: "Failed to submit message. Please try again later." });
  }
});

// 5. Submit Career Application
app.post('/api/apply', (req, res) => {
  const { jobId, jobTitle, name, email, phone, experience, coverLetter, resumeUrl } = req.body;

  // Simple validation
  if (!jobId || !jobTitle || !name || !email || !phone || !experience) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const applications = readData('applications.json');
  const newApplication = {
    id: `app-${Date.now()}`,
    jobId,
    jobTitle,
    name,
    email,
    phone,
    experience,
    coverLetter: coverLetter || 'None provided',
    resumeUrl: resumeUrl || 'Mock resume uploaded successfully',
    appliedAt: new Date().toISOString()
  };

  applications.push(newApplication);

  if (writeData('applications.json', applications)) {
    res.status(201).json({
      success: true,
      message: "Application submitted successfully! Our HR team will contact you soon.",
      applicationId: newApplication.id
    });
  } else {
    res.status(500).json({ error: "Failed to submit application. Please try again later." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
