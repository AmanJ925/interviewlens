import { useState } from "react";
import ResultCard from "./components/ResultCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
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
      const response = await fetch("http://localhost:5000/api/analyze", {
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
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="w-full max-w-3xl bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-center mx-4">
        <h1 className="text-4xl font-bold mb-2 text-center tracking-tight">InterviewLens AI</h1>
        <h2 className="text-lg font-medium mb-8 text-center text-neutral-400">AI-powered interview readiness analysis</h2>
        <form onSubmit={handleAnalyze} className="w-full flex flex-col gap-8">
          {/* Input Areas */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Resume Textarea */}
            <div className="flex-1 flex flex-col">
              <label className="text-neutral-300 mb-2 text-lg font-medium" htmlFor="resume">Resume Text</label>
              <textarea
                id="resume"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste or type your resume here..."
                className="bg-neutral-800 text-white placeholder-neutral-500 rounded-lg p-4 min-h-[160px] resize-none border border-neutral-700 focus:outline-none focus:border-sky-600"
                autoComplete="off"
              />
            </div>
            {/* Job Description Textarea */}
            <div className="flex-1 flex flex-col">
              <label className="text-neutral-300 mb-2 text-lg font-medium" htmlFor="jobDesc">Job Description</label>
              <textarea
                id="jobDesc"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                className="bg-neutral-800 text-white placeholder-neutral-500 rounded-lg p-4 min-h-[160px] resize-none border border-neutral-700 focus:outline-none focus:border-sky-600"
                autoComplete="off"
              />
            </div>
          </div>
          {/* Error Message */}
          <ErrorMessage message={error} />
          {/* Analyze Button */}
          <button
            type="submit"
            className={`bg-sky-600 hover:bg-sky-700 transition-colors px-8 py-3 rounded-lg font-semibold text-lg shadow-md w-full md:w-auto mx-auto disabled:opacity-60 disabled:cursor-not-allowed mb-2`}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Fit"}
          </button>
        </form>
        {/* Results or Loader */}
        <div className="w-full min-h-[140px] flex flex-col items-center justify-center mt-3">
          {loading && <Loader />}
          {!loading && result && (
            <ResultCard {...result} />
          )}
          {!loading && !result && (
            <span className="text-neutral-500 text-base">(Results will appear here after analysis)</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
