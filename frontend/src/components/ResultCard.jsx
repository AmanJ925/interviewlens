import React from 'react';

const ResultCard = ({ matchScore, strengths, missingSkills, interviewFocus, resumeSuggestions }) => {
  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl shadow-lg p-8 max-w-lg mx-auto flex flex-col items-center space-y-6 border border-gray-700">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-gray-800 border-4 border-indigo-500 w-28 h-28 flex items-center justify-center mb-2">
          <span className="text-4xl font-extrabold text-indigo-400">
            {matchScore}%
          </span>
        </div>
        <p className="font-semibold text-lg tracking-wide text-gray-300 mb-2">Match Score</p>
      </div>
      <div className="w-full">
        <h3 className="font-semibold text-green-400 mb-1">Strengths</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {strengths.map((item, idx) => (
            <span key={idx} className="bg-green-900 text-green-300 rounded-full px-3 py-1 text-sm font-medium border border-green-700">
              {item}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-red-400 mb-1">Missing Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {missingSkills.map((item, idx) => (
            <span key={idx} className="bg-red-900 text-red-300 rounded-full px-3 py-1 text-sm font-medium border border-red-700">
              {item}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-blue-400 mb-1">Interview Focus</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 pl-2">
          {interviewFocus.map((item, idx) => (
            <li key={idx} className="text-gray-200">{item}</li>
          ))}
        </ul>
        <h3 className="font-semibold text-yellow-400 mb-1">Resume Suggestions</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {resumeSuggestions.map((item, idx) => (
            <li key={idx} className="text-gray-200">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;

