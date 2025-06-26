import React from 'react';
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Import your page-level components
import DashboardPage from './components/Dashboard'; // Contains the full dashboard UI and logic
import ChatbotPage from './components/Chatbot/Chatbot';   // Contains the AI Rule Creation chatbot UI and logic
import CreateUser from './components/Users/CreateUser'
// Main App component responsible for overall application structure and routing
const App: React.FC = () => {
  return (
    <Router> {/* BrowserRouter sets up client-side routing */}
      <Routes> {/* Routes defines the different paths in your application */}
        {/* Route for the Dashboard - rendered at the root path "/" */}
        <Route path="/" element={<DashboardPage />} />
        {/* Route for the AI Rule Creation Chatbot - rendered at "/ai-rule-creation" */}
        <Route path="/ai-rule-creation" element={<ChatbotPage />} />
        <Route path="/user-creation" element={<CreateUser onClose={function (): void {
          throw new Error('Function not implemented.');
        } } onCreateUser={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        {/* You can add more routes here for other pages */}
        {/* Example: <Route path="/reports" element={<ReportsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
