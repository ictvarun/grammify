import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Feedback & Issue Reporting
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
            Help us improve Grammify.Pro by sharing your feedback or reporting any issues you've encountered.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 md:p-4 mb-8">
            <iframe
              src="https://tally.so/embed/wMr9Ek"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Grammify.Pro Feedback Form"
              className="rounded-lg"
            />
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}