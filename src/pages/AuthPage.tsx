import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useTheme } from '../context/ThemeContext';
import { AuthThemeToggle } from '../components/AuthThemeToggle';
import { Link } from 'react-router-dom';

export function AuthPage() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900">
      <AuthThemeToggle />
      
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/30">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full max-w-full flex justify-center",
                  card: `bg-transparent shadow-none ${theme === 'dark' ? 'clerk-dark' : ''}`,
                  headerTitle: "text-xl font-bold text-center text-gray-900 dark:text-white mb-2",
                  headerSubtitle: "text-sm text-center text-gray-600 dark:text-gray-300 mb-4",
                  formButtonPrimary: "w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium h-10 rounded-lg transition-colors",
                  formFieldInput: "w-full h-10 px-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent",
                  formFieldLabel: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",
                  footerActionLink: "text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline",
                  dividerLine: "bg-gray-200 dark:bg-gray-700",
                  dividerText: "text-sm text-gray-500 dark:text-gray-400 px-3 bg-transparent",
                  socialButtonsBlockButton: "w-full h-10 px-3 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors mb-2",
                  socialButtonsBlockButtonText: "text-sm text-gray-700 dark:text-gray-300",
                  socialButtonsBlockButtonArrow: "text-gray-400 dark:text-gray-500",
                  formFieldSuccessText: "text-xs text-green-600 dark:text-green-400 mt-1",
                  formFieldErrorText: "text-xs text-red-600 dark:text-red-400 mt-1",
                  alert: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4",
                  alertText: "text-sm text-red-600 dark:text-red-400",
                  card__main: "space-y-3 flex flex-col items-center",
                  footerAction: "mt-3 text-center w-full",
                  formField: "space-y-1 mb-3 w-full",
                  form: "space-y-3 w-full",
                  identityPreview: "w-full mb-3",
                  identityPreviewText: "text-sm text-gray-700 dark:text-gray-300",
                  identityPreviewEditButton: "text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
                },
                variables: {
                  colorPrimary: theme === 'dark' ? '#818cf8' : '#4f46e5',
                  colorText: theme === 'dark' ? '#f3f4f6' : '#111827',
                  colorTextSecondary: theme === 'dark' ? '#d1d5db' : '#4b5563',
                  colorBackground: 'transparent',
                  colorInputBackground: theme === 'dark' ? '#374151' : '#ffffff',
                  colorInputText: theme === 'dark' ? '#f3f4f6' : '#111827',
                  borderRadius: '0.5rem',
                  spacingUnit: '0.75rem'
                }
              }}
            />
            <div className="mt-3 text-center">
              <Link 
                to="/" 
                className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}