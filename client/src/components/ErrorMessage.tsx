import React from "react";

interface ErrorMessageProps {
  message?: string;
  details?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "An error occurred",
  details,
  onRetry,
  showRetry = true,
  className = "",
}) => {
  return (
    <div
      role="alert"
      className={`w-full rounded-2xl border border-red-800 bg-[#2b0f11]/80 p-4 text-left ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <svg
            className="h-8 w-8 text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M12 9v4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17h.01"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.29 3.86L2.82 18.14a2 2 0 0 0 1.74 2.98h14.88a2 2 0 0 0 1.74-2.98L13.71 3.86a2 2 0 0 0-3.42 0z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{message}</p>
          {details ? (
            <p className="mt-1 text-xs text-slate-300">{details}</p>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2">
            {showRetry && onRetry ? (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500"
              >
                Retry
              </button>
            ) : null}

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
