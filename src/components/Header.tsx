import React from 'react';
import { Menu, Languages, CheckCircle, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserButton, useClerk } from '@clerk/clerk-react';
import { ThemeToggle } from './ThemeToggle';
import { useHeader } from '../hooks/useHeader';

export function Header() {
  const { isMenuOpen, toggleMenu } = useHeader();
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const navigation = [
    { name: 'Grammar', href: '/', icon: CheckCircle },
    { name: 'Translate', href: '/translate', icon: Languages },
    { name: 'Email', href: '/email', icon: Mail }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                Grammify.Pro
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                The AI Language Solution
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <ThemeToggle />
            <UserButton 
              afterSignOutUrl="/sign-in"
              signInUrl="/sign-in"
              afterMultiSessionSingleSignOutUrl="/sign-in"
            />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="py-4 space-y-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 ${
                      location.pathname === item.href
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={toggleMenu}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="flex justify-between items-center px-4 py-2">
                <ThemeToggle />
                <UserButton 
                  afterSignOutUrl="/sign-in"
                  signInUrl="/sign-in"
                  afterMultiSessionSingleSignOutUrl="/sign-in"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}