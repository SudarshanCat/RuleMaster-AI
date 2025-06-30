import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CopilotKit } from "@copilotkit/react-core";
import ChatSidebar from "./components/Chatsidebar";

import DashboardPage from './components/Dashboard';
import ChatbotPage from './components/Chatbot/ChatbotPage';
import CreateUser from './components/Users/CreateUser';
import UserManagement from './components/UserManagement';
import LandingPage from './components/LandingPage';
import './index.css';
import RuleList from './components/RuleList';

const App: React.FC = () => {
  return (
    <CopilotKit publicApiKey='ck_pub_d1edf1755e69761ed66de296b0d252a1'> {/* ✅ CopilotKit wraps Router, not inside Routes */}
      <Router>
        <div className="flex min-h-screen">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ai-rule-creation" element={<ChatbotPage />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/rule-list" element={<RuleList />} />

              <Route
                path="/user-creation"
                element={
                  <CreateUser
                    onClose={() => {}}
                    onCreateUser={() => {}}
                  />
                }
              />
            </Routes>
          </div>
          <ChatSidebar /> 
        </div>
      </Router>
    </CopilotKit>
  );
};

export default App;
