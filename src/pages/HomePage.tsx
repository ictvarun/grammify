import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Languages, Mail, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { HomeHeader } from '../components/HomeHeader';

export function HomePage() {
  const services = [
    {
      icon: CheckCircle,
      title: 'Grammar Checker',
      description: 'Advanced AI-powered grammar and style correction with detailed explanations',
      link: '/sign-in',
      color: 'from-green-500 to-emerald-700'
    },
    {
      icon: Languages,
      title: 'Language Translator',
      description: 'Accurate translations across 100+ languages with context preservation',
      link: '/sign-in',
      color: 'from-blue-500 to-indigo-700'
    },
    {
      icon: Mail,
      title: 'Email Writer',
      description: 'Professional email composition with multiple tone options',
      link: '/sign-in',
      color: 'from-purple-500 to-violet-700'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Intelligence',
      description: 'Utilizing cutting-edge artificial intelligence for accurate results'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your content is processed securely and never stored'
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Get instant results with our high-performance infrastructure'
    }
  ];

  // Function to handle smooth scrolling with offset
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const headerOffset = 100; // Adjust this value based on your header height
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      <HomeHeader onScrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Transform Your Writing with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              AI-Powered Tools
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Professional grammar checking, translation, and email writing tools powered by advanced artificial intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sign-in"
              className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/learn-more"
              className="px-8 py-3 text-lg font-medium text-gray-700 dark:text-gray-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-24 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group p-6 bg-white/90 dark:bg-gray-800 rounded-2xl transition-all duration-200 relative overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-200"
                  style={{ backgroundImage: `linear-gradient(to right, ${service.color})` }}
                />
                <div className="flex justify-center md:justify-start">
                  <service.icon className="w-12 h-12 text-gray-700 dark:text-gray-200 mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center md:text-left">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center md:text-left">
                  {service.description}
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium justify-center md:justify-start">
                  Try Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-24 py-16 px-4 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent dark:via-indigo-950/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center md:justify-start">
                  <feature.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center md:text-left">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Improve Your Writing?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who trust our AI-powered tools for their writing needs.
          </p>
          <Link
            to="/sign-in"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg transition-all duration-200"
          >
            Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>© 2024 Grammify.Pro | All rights reserved.</div>
          <Link to="/feedback" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Provide Feedback
          </Link>
        </div>
      </footer>
    </div>
  );
}