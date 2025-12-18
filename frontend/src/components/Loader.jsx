import React from "react";

/**
 * Loader: Centered dark-theme spinner using Tailwind CSS.
 * Responsive, accessible. Exported as default.
 */
const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[140px]" data-testid="loader">
      <span className="relative flex h-12 w-12">
        <span className="animate-spin absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-sky-500 via-sky-300 to-blue-400 opacity-40"></span>
        <span className="relative inline-flex rounded-full h-12 w-12 bg-neutral-800 border-4 border-neutral-700"></span>
      </span>
      <span className="ml-4 text-sky-300 text-lg font-semibold animate-pulse">Loading...</span>
    </div>
  );
};

export default Loader;

