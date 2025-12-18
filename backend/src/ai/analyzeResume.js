/**
 * Analyzes a resume against a job description using OpenAI's Chat API.
 * @param {string} resume - Candidate's resume text
 * @param {string} jobDescription - Job description text
 * @returns {Promise<Object>} Analysis result as an object
 */
async function analyzeResume(resume, jobDescription) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key in environment variables.');
  }
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  
  // Try gpt-4o-mini first, else fallback to gpt-3.5-turbo
  const models = ['gpt-4o-mini', 'gpt-3.5-turbo'];
  const prompt = [
    {
      role: 'system',
      content:
        "You are a senior technical interviewer in a top tech company. Analyze the provided candidate's resume and job description thoroughly. Respond ONLY with a VALID JSON object with the following keys and format, no markdown, no explanations outside JSON. The JSON must have: matchScore (number 0-100), strengths (array of strings), missingSkills (array of strings), interviewFocus (array of strings), and resumeSuggestions (array of strings). Be objective, honest, critical, and specific."
    },
    {
      role: 'user',
      content: `Candidate Resume:\n${resume}\n\nJob Description:\n${jobDescription}`
    }
  ];

  let lastError;
  for (const model of models) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: prompt,
          max_tokens: 512,
          temperature: 0.3,
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenAI API error (${model}): ${err}`);
      }
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error('No content in OpenAI response');
      // Ensure only JSON is returned
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      const jsonText = firstBrace !== -1 ? content.slice(firstBrace, lastBrace + 1) : content;
      return JSON.parse(jsonText);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Unknown error during OpenAI resume analysis');
}

module.exports = analyzeResume;



