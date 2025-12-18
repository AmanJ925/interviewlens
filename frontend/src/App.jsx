import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="w-full max-w-5xl bg-neutral-900 rounded-2xl shadow-lg p-10 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-2 text-center tracking-tight">InterviewLens AI</h1>
        <h2 className="text-lg font-medium mb-10 text-center text-neutral-400">AI-powered interview readiness analysis</h2>
        {/* Input Areas */}
        <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
          {/* Resume Textarea */}
          <div className="flex-1 flex flex-col">
            <label className="text-neutral-300 mb-2 text-lg font-medium" htmlFor="resume">Resume Text</label>
            <textarea
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste or type your resume here..."
              className="bg-neutral-800 text-white placeholder-neutral-500 rounded-lg p-4 min-h-[220px] resize-none border border-neutral-700 focus:outline-none focus:border-sky-600"
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
              className="bg-neutral-800 text-white placeholder-neutral-500 rounded-lg p-4 min-h-[220px] resize-none border border-neutral-700 focus:outline-none focus:border-sky-600"
            />
          </div>
        </div>
        {/* Analyze Button */}
        <button
          className="bg-sky-600 hover:bg-sky-700 transition-colors px-8 py-3 rounded-lg font-semibold text-lg shadow-md mb-10 w-full md:w-auto"
          disabled
        >
          Analyze Fit
        </button>
        {/* Results Placeholder */}
        <div className="w-full min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 rounded-lg p-6 mt-2 bg-neutral-950/60">
          <span className="text-neutral-500 text-base">(Results will appear here after analysis)</span>
        </div>
      </div>
    </div>
  );
}

export default App
