import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Zap, Bot, Users, BarChart2, Settings, ArrowRight, TrendingUp } from 'lucide-react';
import './LandingPage.css'; // Global styles (for animations, font)

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col font-inter text-gray-800">
      {/* Header for Landing Page */}
      <header className="bg-white shadow-lg p-6 sticky top-0 z-10 rounded-b-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Home className="text-indigo-600 h-10 w-10" />
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">RuleMaster AI</h1>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <button
                  onClick={() => handleNavigate('/dashboard')}
                  className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium text-lg px-3 py-2 rounded-md hover:bg-indigo-50"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('/ai-rule-creation')}
                  className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium text-lg px-3 py-2 rounded-md hover:bg-indigo-50"
                >
                  AI Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Future feature: Contact Us!')} // Placeholder for other sections
                  className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium text-lg px-3 py-2 rounded-md hover:bg-indigo-50"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-100 opacity-60 z-0"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-6xl font-extrabold text-indigo-800 mb-6 leading-tight animate-fade-in-down">
            Intelligent Automation for <span className="text-purple-600">Complex Decisions</span>
          </h2>
          <p className="text-2xl text-gray-700 mb-10 max-w-2xl mx-auto animate-fade-in delay-200">
            RuleMaster AI empowers your business with cutting-edge artificial intelligence to automate, optimize, and secure your operations.
          </p>
          <button
            onClick={() => handleNavigate('/ai-rule-creation')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-xl flex items-center justify-center mx-auto animate-fade-in delay-400"
          >
            Start Your AI Journey <ArrowRight className="ml-3 h-6 w-6" />
          </button>
        </div>
        {/* Animated background elements (simple shapes) */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-2"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-3"></div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-6 bg-white shadow-inner">
        <div className="container mx-auto">
          <h3 className="text-5xl font-extrabold text-center text-gray-900 mb-16 animate-fade-in-down">
            What RuleMaster AI Offers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-cyan-500 hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-5px]">
              <Bot className="text-cyan-600 h-20 w-20 mx-auto mb-6" />
              <h4 className="text-3xl font-bold text-gray-900 mb-4">AI Studio</h4>
              <p className="text-lg text-gray-700">
                Craft intelligent rules with natural language, powered by advanced AI for rapid development.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-5px]">
              <BarChart2 className="text-emerald-600 h-20 w-20 mx-auto mb-6" />
              <h4 className="text-3xl font-bold text-gray-900 mb-4">Predictive Analytics</h4>
              <p className="text-lg text-gray-700">
                Gain foresight into trends and make proactive decisions with AI-driven insights.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-5px]">
              <Zap className="text-purple-600 h-20 w-20 mx-auto mb-6" />
              <h4 className="text-3xl font-bold text-gray-900 mb-4">Intelligent Automation</h4>
              <p className="text-lg text-gray-700">
                Automate complex workflows and self-optimize decision paths for peak efficiency.
              </p>
            </div>
            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-5px]">
              <Settings className="text-orange-600 h-20 w-20 mx-auto mb-6" />
              <h4 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h4>
              <p className="text-lg text-gray-700">
                Connect RuleMaster AI with your existing systems and data sources effortlessly.
              </p>
            </div>
            {/* Feature Card 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-5px]">
              <Users className="text-blue-600 h-20 w-20 mx-auto mb-6" />
              <h4 className="text-3xl font-bold text-gray-900 mb-4">Centralized User Management</h4>
              <p className="text-lg text-gray-700">
                Securely manage access and permissions for your team with granular control.
              </p>
            </div>
            {/* Feature Card 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-5px]">
              <TrendingUp className="text-yellow-600 h-20 w-20 mx-auto mb-6" />
              <h4 className="text-3xl font-bold text-gray-900 mb-4">Scalable Performance</h4>
              <p className="text-lg text-gray-700">
                Process millions of rule evaluations with a robust, high-performance infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action / Footer */}
      <footer className="bg-gray-900 text-white p-10 mt-auto rounded-t-2xl">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-extrabold mb-6">Ready to Transform Your Workflow?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join the future of intelligent automation. RuleMaster AI is designed to grow with your business needs.
          </p>
          <button
            onClick={() => handleNavigate('/ai-rule-creation')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 text-xl"
          >
            Get Started Free
          </button>
          <div className="mt-12 text-sm opacity-75">
            &copy; {new Date().getFullYear()} RuleMaster AI. All rights reserved. |
            <a href="#" className="underline hover:text-purple-400 ml-2">Privacy Policy</a> |
            <a href="#" className="underline hover:text-purple-400 ml-2">Terms of Service</a>
          </div>
        </div>
      </footer>
       {/* Custom CSS for LandingPage animations */}
       <style>
        {`
        @keyframes float1 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
          50% { transform: translate(20px, 30px) rotate(15deg); opacity: 0.8; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
          50% { transform: translate(-30px, -20px) rotate(-10deg); opacity: 0.8; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
        }
        @keyframes float3 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
          50% { transform: translate(15px, -25px) rotate(5deg); opacity: 0.8; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 0.7; }
        }
        .animate-float-1 { animation: float1 15s ease-in-out infinite; }
        .animate-float-2 { animation: float2 18s ease-in-out infinite; }
        .animate-float-3 { animation: float3 12s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
