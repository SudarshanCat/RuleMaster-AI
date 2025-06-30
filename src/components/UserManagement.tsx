import React, { useState } from 'react';
import './UserManagement.css'; // Assuming you'll create a CSS file for styling
import Tenants from './UserManagement/Tenants.tsx';
import Groups from './UserManagement/Groups';
import Users from './UserManagement/Users';
import AssignGroups from './UserManagement/AssignGroups';
import { useNavigate } from 'react-router-dom';

const CentralizedUserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tenants');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Tenants':
        return <Tenants />;
      case 'Groups':
        return <Groups />;
      case 'Users':
        return (
          <div>
            <h2>Create New User</h2>
            {/* User creation form will go here */}
            <Users />
          </div>
        );
      case 'Assign Groups':
        return <AssignGroups />;
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="centralized-user-management container mx-auto p-6">
      <button className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" onClick={handleBackToDashboard}>
        Back to Dashboard
      </button>
      <div className="tabs flex space-x-4 border-b border-gray-300 mb-6">
        <button
          className={`py-2 px-4 text-lg font-medium focus:outline-none ${activeTab === 'Tenants' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('Tenants')}
        >
          Tenants
        </button>
        <button
          className={`py-2 px-4 text-lg font-medium focus:outline-none ${activeTab === 'Groups' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('Groups')}
        >
          Groups
        </button>
        <button
          className={`py-2 px-4 text-lg font-medium focus:outline-none ${activeTab === 'Users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('Users')}
        >
          Users
        </button>
        <button
          className={`py-2 px-4 text-lg font-medium focus:outline-none ${activeTab === 'Assign Groups' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('Assign Groups')}
        >
          Assign Groups
        </button>
      </div>
      <div className="tab-content">
 {renderTabContent()}
      </div>
    </div>
  );
};

export default CentralizedUserManagement;