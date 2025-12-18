const express = require('express');
const router = express.Router();
const analyzeResume = require('../ai/analyzeResume');

// POST /api/analyze
router.post('/', async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    // Validate inputs
    if (!resume || !jobDescription) {
      return res.status(400).json({ error: 'Missing resume or jobDescription' });
    }

    // Call the analysis logic (all business logic moved to analyzeResume)
    const result = await analyzeResume(resume, jobDescription);
    return res.status(200).json(result);
  } catch (err) {
    // Handle unexpected errors safely
    console.error('Error analyzing resume:', err.message || err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

