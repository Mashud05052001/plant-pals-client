"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold text-red-600 mb-4 dark:text-red-400">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-6 dark:text-gray-300">
          We are sorry, but an error has occurred. Please try again later.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 text-white bg-common-500 rounded-md hover:bg-common-600 transition-colors dark:bg-blue-800 dark:hover:bg-blue-900 font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
