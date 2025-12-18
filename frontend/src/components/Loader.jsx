import React from "react";
import { motion } from 'framer-motion';

/**
 * Loader: Centered dark-theme spinner using Tailwind CSS.
 * Responsive, accessible. Exported as default.
 */
const Loader = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full min-h-[180px] bg-transparent"
      data-testid="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Ring Loader */}
      <motion.span
        className="relative flex items-center justify-center h-16 w-16 mb-4"
        animate={{ scale: [0.95, 1.1, 0.95] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        {/* Glowing Gradient Ring */}
        <span className="absolute h-full w-full rounded-full bg-gradient-to-tr from-sky-500 via-blue-500 to-fuchsia-600 opacity-80 animate-spin-slow" />
        {/* Inner Dark Circle */}
        <span className="relative z-10 rounded-full h-12 w-12 bg-neutral-900 border-4 border-neutral-800 shadow-lg" />
      </motion.span>
      {/* Text with subtle pulse and gradient */}
      <motion.span
        className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500 animate-pulse px-2"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        Analyzing your profile...
      </motion.span>
    </motion.div>
  );
};

export default Loader;

