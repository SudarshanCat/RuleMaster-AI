import React, { useState, useEffect } from 'react';
import { Home, Settings, Users, ClipboardList, TrendingUp, Bot, Lightbulb, Zap, BarChart2, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KeycloakContext } from '../contexts/KeycloakContext';
import { useContext } from 'react';

// This component now holds the entire dashboard UI
const DashboardPage: React.FC = () => {
  const [aiInsight, setAiInsight] = useState("AI is analyzing your rule performance trends...");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [numberOfRules, setNumberOfRules] = useState(0); // State for number of rules
  const [numberOfUsers, setNumberOfUsers] = useState(0); // State for number of users
  const navigate = useNavigate(); // Initialize navigate hook
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);


  // Simulate fetching AI insights
  useEffect(() => {
    if (loadingInsight) {
      const insights = [
        "Identified 3 rules with potential for optimization. Click 'Analyze Now' for details.",
        "Your rule 'Fraud Detection V2' is performing with 98.5% accuracy.",
        "New AI-driven rule suggestions available based on recent data patterns.",
        "System health: All rule engines operating at optimal capacity."
      ];
      const randomIndex = Math.floor(Math.random() * insights.length);
      const timer = setTimeout(() => {
        setAiInsight(insights[randomIndex]);
        setLoadingInsight(false);
      }, 2000); // Simulate network delay

      // Simulate fetching numbers for the cards
      const numbersTimer = setTimeout(() => {
        setNumberOfRules(15); // Placeholder number
        setNumberOfUsers(50); // Placeholder number
      }, 1000); // Simulate a slight delay after insights

      // return () => clearTimeout(timer);
      return () => { clearTimeout(timer); clearTimeout(numbersTimer); };
    }
  }, [loadingInsight]);

  const { keycloak, initialized } = useContext(KeycloakContext);
  const refreshAiInsight = async () => {
    setLoadingInsight(true);
    // The useEffect hook will handle setting the new insight after loading is false
  };


  const handleCreateUserSuccess = () => {
    console.log("User creation process completed!");
  };

  const handleManageUsersClick = () => {
    navigate('/user-management'); // Navigate to the new centralized user management screen
  };

  const handleAIPoweredRuleCreationClick = () => {
    navigate('/ai-rule-creation'); // Navigate to the new chatbot page
  };
  const handlRulesListClick = () => {
    navigate('/rule-list'); // Navigate to the rule list page
  };
  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col font-inter text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10 rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Home className="text-indigo-600 h-9 w-9" />
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">RuleMaster AI</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              {/* Profile Section */}
              <li className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium focus:outline-none"
                >
                  <UserCircle className="h-6 w-6 mr-1" />
                  Profile
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-semibold">Logged in as:</p>
                      {initialized && keycloak.authenticated && keycloak.tokenParsed && (
                        <p>{keycloak.tokenParsed.preferred_username || keycloak.tokenParsed.name || 'User'}</p>
                      )}
                    </div>
                    {/* Add more user details here if available */}
                    {/* You can access more details from keycloak.tokenParsed or keycloak.loadUserInfo() */}

                    {/* Add more user details here if available */}
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
              {/* Add a basic Home link that goes to the root */}
              <li>
                <a href="/" className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium">Dashboard</a>
              </li>
              <li>
                {/* Updated navigation link for AI Studio */}
                <a
                  href="/ai-rule-creation"
                  onClick={(e) => { e.preventDefault(); handleAIPoweredRuleCreationClick(); }}
                  className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium"
                >
                  AI Studio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium">Automation</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium">Reports</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out font-medium">Settings</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-6 md:p-8">
        {/* Welcome Section */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 text-center border-t-4 border-indigo-500 transform hover:scale-[1.005] transition-transform duration-300">
          <h2 className="text-5xl font-extrabold text-indigo-800 mb-4 animate-fade-in-down">
            Unleash the Power of RuleMaster AI!
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto animate-fade-in">
            Leverage cutting-edge AI to automate decisions, predict outcomes, and optimize your business rules like never before.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Start Building Rules <Zap className="inline-block ml-2 w-5 h-5" />
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300">
              Watch Demo <Lightbulb className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>
        </section>

        {/* AI Insights and Quick Actions */}
        <section className="bg-purple-600 text-white rounded-xl shadow-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between border-b-4 border-purple-800">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {loadingInsight ? (
              <div className="spinner-border h-8 w-8 animate-spin text-white-500" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <Bot className="h-10 w-10 text-white" />
            )}
            <div>
              <h3 className="text-2xl font-bold">AI Insights:</h3>
              <p className="text-lg opacity-90">{aiInsight}</p>
            </div>
          </div>
          <button
            onClick={refreshAiInsight}
            disabled={loadingInsight}
            className="bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingInsight ? "Loading..." : "Refresh Insights"}
          </button>
        </section>


        {/* Feature Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: AI-Powered Rule Creation */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-cyan-400 hover:shadow-xl transition-shadow duration-300">
            <ClipboardList className="text-cyan-500 h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Rule Creation</h3>
            <p className="text-gray-600 mb-4">
              Intelligently suggest and auto-generate rules based on historical data and desired outcomes.
            </p>
            <button
              onClick={handleAIPoweredRuleCreationClick} // Updated onClick to navigate
              className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center space-x-1"
            >
              <span>Go to AI Studio</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Card 2: Predictive Analytics */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-emerald-400 hover:shadow-xl transition-shadow duration-300 relative">
            <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-bl-lg">Rules</div>
            <ClipboardList className="text-emerald-500 h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Available Rules</h3>
            <p className="text-gray-600 text-sm mb-4">
              Total number of rules configured in the system.
            </p>
            <div className="text-4xl font-extrabold text-emerald-600 mb-4">{numberOfRules}</div> {/* Display number of rules */}
            <p className="text-gray-600 mb-4">
              View and manage the list of available rules.
            </p>
            <button className="text-emerald-600 hover:text-emerald-800 font-semibold flex items-center space-x-1">
              
              <span onClick={handlRulesListClick}>View Rule List</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Card 3: Intelligent Automation */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-pink-400 hover:shadow-xl transition-shadow duration-300">
            <Zap className="text-pink-500 h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Intelligent Automation</h3>
            <p className="text-gray-600 mb-4">
              Automate complex workflows and decision paths with self-optimizing AI logic.
            </p>
            <button className="text-pink-600 hover:text-pink-800 font-semibold flex items-center space-x-1">
              <span>Configure Automation</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Card 4: Seamless Integration */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-orange-400 hover:shadow-xl transition-shadow duration-300">
            <Settings className="text-orange-500 h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Seamless Integration</h3>
            <p className="text-gray-600 mb-4">
              Connect effortlessly with your existing systems and data sources to unify operations.
            </p>
            <button className="text-orange-600 hover:text-orange-800 font-semibold flex items-center space-x-1">
              <span>Setup Integrations</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Card 5: Centralized User Management */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-blue-400 hover:shadow-xl transition-shadow duration-300">
            <Users className="text-blue-500 h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Centralized User Management</h3>
            <p className="text-gray-600 text-sm mb-4">
              Manage team access and permissions securely with granular control over AI features.
            </p>
            <div className="text-4xl font-extrabold text-blue-600 mb-4">1{numberOfUsers}</div> {/* Display number of users */}
            <p className="text-gray-600 mb-4">
              Total number of users in the system.
            </p>
            <button
              onClick={handleManageUsersClick}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1"
            >
              <span>Manage Users</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>

            </button>
          </div>

          {/* Card 6: Scalable Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-lime-400 hover:shadow-xl transition-shadow duration-300">
            <TrendingUp className="text-lime-500 h-16 w-16 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Scalable Performance</h3>
            <p className="text-gray-600 mb-4">
              Handle millions of rule evaluations with a robust and scalable AI-powered infrastructure.
            </p>
            <button className="text-lime-600 hover:text-lime-800 font-semibold flex items-center space-x-1">
              <span>View Performance</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white shadow-inner p-6 mt-12 rounded-t-xl">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} RuleMaster AI. All rights reserved. | <a href="#" className="underline hover:text-indigo-400">Privacy Policy</a> | <a href="#" className="underline hover:text-indigo-400">Terms of Service</a>
        </div>
      </footer>

    </div>
  );
};

export default DashboardPage; // Export as DashboardPage
