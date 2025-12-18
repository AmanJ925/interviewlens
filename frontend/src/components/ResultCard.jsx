import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const getScoreColor = (score) => {
  if (score >= 75) return {
    ring: 'stroke-green-400',
    text: 'text-green-400 drop-shadow',
    glow: 'shadow-green-500/40'
  };
  if (score >= 50) return {
    ring: 'stroke-yellow-400',
    text: 'text-yellow-400 drop-shadow',
    glow: 'shadow-yellow-500/30'
  };
  return {
    ring: 'stroke-red-400',
    text: 'text-red-400 drop-shadow',
    glow: 'shadow-red-500/30'
  };
};

const ANIMATE_DURATION = 1100; // ms

const ResultCard = ({ matchScore, strengths, missingSkills, interviewFocus, resumeSuggestions }) => {
  // Animate the ring progress
  const circleRef = useRef(null);
  const scoreRef = useRef(null);
  const dashArray = 260;
  const score = Math.max(0, Math.min(100, matchScore));

  // Animate score number
  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = ANIMATE_DURATION;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.round(progress * (end - start) + start);
      if (scoreRef.current) scoreRef.current.textContent = `${currentValue}%`;
      if (circleRef.current) {
        const dashOffset = dashArray * (1 - currentValue / 100);
        circleRef.current.style.strokeDashoffset = dashOffset;
      }
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [score]);

  const color = getScoreColor(score);

  return (
    <div
      className={`relative shadow-2xl rounded-2xl p-8 max-w-xl w-full mx-auto backdrop-blur-lg border border-white/10\n      bg-gradient-to-br from-slate-900/90 via-blue-950/70 to-blue-900/50 bg-clip-padding\n      transition-all duration-400 hover:scale-[1.025] hover:bg-blue-950/90\n      ring-1 ring-white/10 ${color.glow} animate-fade-in-slide`}
      style={{ animation: 'fadeInSlide 0.8s cubic-bezier(.33,.8,.62,1.07)' }}
    >
      {/* Animated Score */}
      <div className="flex flex-col items-center mb-7">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute w-full h-full rotate-[-90deg]" width="144" height="144" viewBox="0 0 90 90">
            <circle
              cx="45" cy="45" r="41"
              className="stroke-white/10"
              strokeWidth="8"
              fill="none"
            />
            <circle
              ref={circleRef}
              cx="45" cy="45" r="41"
              className={`transition-stroke duration-200 ${color.ring}`}
              strokeWidth="8"
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={dashArray}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }}
            />
          </svg>
          <span
            ref={scoreRef}
            className={`text-5xl font-extrabold ${color.text} select-none transition-colors duration-300`}
            style={{ textShadow: '0 0 15px #0005' }}
          >
            0%
          </span>
        </div>
        <p className="font-semibold text-lg tracking-widest text-white/60 mt-3">Match Score</p>
      </div>

      {/* Sections */}
      <div className="w-full flex flex-col gap-5">
        {/* Strengths */}
        <SectionDivider>
          <h3 className="font-semibold text-green-300 text-base mb-2 tracking-wide">Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(strengths) && strengths.length > 0 ? strengths : []).map((item, idx) => (
              <span key={`strengths-${item}-${idx}`} className="bg-green-700/30 text-green-200 rounded-full px-3 py-1 text-sm font-semibold border border-green-500/40 drop-shadow">
                {item}
              </span>
            ))}
          </div>
        </SectionDivider>

        {/* Missing Skills */}
        <SectionDivider>
          <h3 className="font-semibold text-red-300 text-base mb-2 tracking-wide">Missing Skills</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(missingSkills) && missingSkills.length > 0 ? missingSkills : []).map((item, idx) => (
              <span key={`missingskills-${item}-${idx}`} className="bg-red-800/30 text-red-200 rounded-full px-3 py-1 text-sm font-semibold border border-red-500/40 drop-shadow">
                {item}
              </span>
            ))}
          </div>
        </SectionDivider>

        {/* Interview Focus */}
        <SectionDivider>
          <h3 className="font-semibold text-blue-300 text-base mb-2 tracking-wide">Interview Focus</h3>
          <ul className="list-disc list-inside space-y-1 pl-3">
            {(Array.isArray(interviewFocus) && interviewFocus.length > 0 ? interviewFocus : []).map((item, idx) => (
              <li key={`interviewfocus-${item}-${idx}`} className="text-white/80 text-sm leading-relaxed">{item}</li>
            ))}
          </ul>
        </SectionDivider>

        {/* Resume Suggestions */}
        <SectionDivider isLast={true}>
          <h3 className="font-semibold text-yellow-300 text-base mb-2 tracking-wide">Resume Suggestions</h3>
          <ul className="list-disc list-inside space-y-1 pl-3">
            {(Array.isArray(resumeSuggestions) && resumeSuggestions.length > 0 ? resumeSuggestions : []).map((item, idx) => (
              <li key={`resumesuggestions-${item}-${idx}`} className="text-white/80 text-sm leading-relaxed">{item}</li>
            ))}
          </ul>
        </SectionDivider>
      </div>
      {/* Keyframes for entrance animation */}
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(30px) scale(.96); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

// Subtle divider wrapper for each section
function SectionDivider({ children, isLast }) {
  return (
    <div className={`w-full pb-3 ${!isLast ? 'border-b border-white/10 mb-2' : ''}`}>{children}</div>
  );
}

export default ResultCard;

