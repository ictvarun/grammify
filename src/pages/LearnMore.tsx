import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Languages, Mail, ArrowRight, Brain, Wand2, Sparkles } from 'lucide-react';
import { LearnMoreHeader } from '../components/LearnMoreHeader';

export function LearnMore() {
  const services = [
    {
      icon: CheckCircle,
      title: 'Grammar Checker',
      description: [
        'Real-time grammar and style corrections',
        'Advanced error detection and suggestions',
        'Context-aware improvements',
        'British and American English variants',
        'Detailed explanations for each correction',
        'Style enhancement recommendations'
      ]
    },
    {
      icon: Languages,
      title: 'Language Translator',
      description: [
        'Support for 100+ languages',
        'Context-preserving translations',
        'Automatic language detection',
        'Technical and casual content translation',
        'Maintains original formatting',
        'Real-time translation updates'
      ]
    },
    {
      icon: Mail,
      title: 'Email Writer',
      description: [
        'Professional email composition',
        'Multiple tone options (formal, casual, friendly)',
        'Context-appropriate suggestions',
        'Business correspondence templates',
        'Customizable writing styles',
        'Quick draft generation'
      ]
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Technology',
      description: 'Powered by state-of-the-art language models that understand context, nuance, and intent behind your writing.'
    },
    {
      icon: Wand2,
      title: 'Smart Suggestions',
      description: 'Receive intelligent recommendations that help improve clarity, tone, and impact of your content.'
    },
    {
      icon: Sparkles,
      title: 'Real-Time Processing',
      description: 'Get instant feedback and corrections as you type, making the writing process smooth and efficient.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      <LearnMoreHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services in Detail
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how our AI-powered tools can transform your writing and communication
          </p>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-12">
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-900/50 dark:to-blue-900/30 mb-4">
                    <service.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h2>
                  <Link
                    to="/sign-in"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    Try Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.description.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="p-4 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent dark:via-indigo-950/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <feature.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of satisfied users who have improved their writing with our tools.
          </p>
          <Link
            to="/sign-in"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg transition-all duration-200"
          >
            Start Free Now <ArrowRight className="w-5 h-5 ml-2" />
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