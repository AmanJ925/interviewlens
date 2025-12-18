import { useState } from "react";
import ResultCard from "./components/ResultCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { motion } from 'framer-motion';
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!resume.trim() || !jobDesc.trim()) {
      setError("Both Resume and Job Description are required.");
      return;
    }
    setLoading(true);
    try {
      // Determine API base URL using environment var logic
      let apiBaseUrl = import.meta.env.VITE_API_URL;
      if (!apiBaseUrl) {
        // Try detecting Docker: if the window host is not localhost or 127.*, we're likely in Docker
        if (
          window.location.hostname === "backend" ||
          window.location.hostname === "backend" // sometimes Docker cmds name the service this
        ) {
          apiBaseUrl = "http://backend:5000";
        } else {
          apiBaseUrl = "http://localhost:5000";
        }
      }
      const response = await fetch(`${apiBaseUrl}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume,
          jobDescription: jobDesc,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to analyze. Please try again.");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-bl from-[#101b3c] via-[#231651] to-[#43156b] text-white relative overflow-x-hidden">
      {/* Glassmorphic Card Container */}
      <div className="relative w-full max-w-3xl mx-4 sm:mx-auto backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 bg-white/10 bg-clip-padding px-8 py-10 flex flex-col items-center" style={{boxShadow:'0 6px 48px 0 rgba(68, 44, 139, 0.14), 0 1.5px 8px 0 rgba(56,38,90,0.20)'}}>
        {/* Gradient Title */}
        <h1 className="text-4xl sm:text-5xl font-black mb-2 text-center tracking-tight bg-gradient-to-r from-sky-400 via-blue-500 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          InterviewLens AI
        </h1>
        {/* Subtitle */}
        <h2 className="text-base sm:text-lg font-medium mb-8 text-center text-neutral-300/80">
          AI-powered interview readiness analysis
        </h2>

        <form onSubmit={handleAnalyze} className="w-full flex flex-col gap-7">
          {/* Input Areas */}
          <div className="flex flex-col md:flex-row gap-7 w-full">
            {/* Resume Textarea */}
            <div className="flex-1 flex flex-col">
              <label className="text-neutral-200 mb-2 text-base sm:text-lg font-semibold" htmlFor="resume">Resume Text</label>
              <textarea
                id="resume"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste or type your resume here..."
                className="bg-white/10 text-white placeholder-neutral-400 rounded-xl p-4 min-h-[140px] sm:min-h-[160px] resize-none border border-white/20 focus:outline-none focus:border-sky-500/90 shadow-inner backdrop-blur-sm"
                autoComplete="off"
              />
            </div>
            {/* Job Description Textarea */}
            <div className="flex-1 flex flex-col">
              <label className="text-neutral-200 mb-2 text-base sm:text-lg font-semibold" htmlFor="jobDesc">Job Description</label>
              <textarea
                id="jobDesc"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                className="bg-white/10 text-white placeholder-neutral-400 rounded-xl p-4 min-h-[140px] sm:min-h-[160px] resize-none border border-white/20 focus:outline-none focus:border-sky-500/90 shadow-inner backdrop-blur-sm"
                autoComplete="off"
              />
            </div>
          </div>
          {/* Error Message */}
          <ErrorMessage message={error} />
          {/* Analyze Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={
              `bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 
              hover:from-sky-400 hover:to-purple-400 hover:shadow-xl hover:shadow-sky-400/40 
              transition-all px-8 py-3 rounded-xl font-bold text-lg tracking-tight w-full md:w-auto mx-auto disabled:opacity-65 disabled:cursor-not-allowed mb-1 focus:outline-none ring-2 ring-transparent focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-neutral-900`
            }
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Fit"}
          </motion.button>
        </form>

        {/* Results or Loader */}
        <div className="w-full min-h-[120px] flex flex-col items-center justify-center mt-3">
          {loading && <Loader />}
          {!loading && result && (
            <ResultCard {...result} />
          )}
          {!loading && !result && (
            <span className="text-neutral-400/80 text-base">(Results will appear here after analysis)</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
