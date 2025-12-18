import React from "react";

/**
 * ErrorMessage: centered, red-accented error alert using Tailwind CSS.
 * Props:
 * - message (string)
 * Exported as default.
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center justify-center w-full my-4" data-testid="error-message">
      <div className="bg-red-900/90 border-l-4 border-red-500 text-red-200 px-6 py-4 rounded-lg shadow max-w-xl w-full text-center">
        <span className="font-semibold text-lg tracking-wide">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;



