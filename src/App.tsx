import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LearnMore } from './pages/LearnMore';
import { GrammarChecker } from './pages/GrammarChecker';
import { Translator } from './pages/Translator';
import { EmailWriter } from './pages/EmailWriter';
import { AuthPage } from './pages/AuthPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { LoadingScreen } from './components/LoadingScreen';
import { trackPageView } from './utils/analytics';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function AppRoutes() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <RouteTracker />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          isSignedIn ? <Navigate to="/dashboard" replace /> : <HomePage />
        } />
        
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/feedback" element={<FeedbackPage />} />

        <Route path="/sign-in" element={
          isSignedIn ? <Navigate to="/dashboard" replace /> : <AuthPage />
        } />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
              <Header />
              <main className="container mx-auto px-4 py-8 mt-16">
                <GrammarChecker />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/translate" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
              <Header />
              <main className="container mx-auto px-4 py-8 mt-16">
                <Translator />
              </main>
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/email" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
              <Header />
              <main className="container mx-auto px-4 py-8 mt-16">
                <EmailWriter />
              </main>
            </div>
          </ProtectedRoute>
        } />

        {/* Catch-all route */}
        <Route path="*" element={
          isSignedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
        } />
      </Routes>
    </>
  );
}

export function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  );
}