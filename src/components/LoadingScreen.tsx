import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 
      dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 p-8 rounded-2xl 
        bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 
        dark:border-gray-700/30 shadow-xl">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-100 dark:border-indigo-900 
            border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
          <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 absolute 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Loading Grammify.Pro
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-[200px]">
            Preparing your AI language experience...
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" 
            style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" 
            style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" 
            style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}