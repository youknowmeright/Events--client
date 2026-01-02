import React from "react";
import { useNavigate } from "react-router";

const ErrorElement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 text-center">
        {/* Illustration */}
        <svg
          viewBox="0 0 512 512"
          className="w-40 h-40 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <circle cx="256" cy="256" r="256" fill="#FDF2F8" />
            <g transform="translate(112 112)">
              <rect
                width="288"
                height="192"
                rx="24"
                fill="#fff"
                stroke="#F0ABFC"
                strokeWidth="6"
              />
              <rect
                x="32"
                y="32"
                width="64"
                height="64"
                rx="8"
                fill="#F9A8D4"
              />
              <rect
                x="192"
                y="32"
                width="64"
                height="64"
                rx="8"
                fill="#F9A8D4"
              />
              <path
                d="M48 128h208"
                stroke="#F472B6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <text
                x="24"
                y="170"
                fill="#9F1239"
                fontSize="48"
                fontWeight="700"
              >
                404
              </text>
            </g>
          </g>
        </svg>

        {/* Text */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorElement;
