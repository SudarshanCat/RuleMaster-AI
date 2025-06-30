import React, { useState } from 'react';
import './RuleList.css';
import { useNavigate } from 'react-router-dom';

interface Rule {
  id: number;
  name: string;
  description: string;
}

const RuleList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);
  const [ruleToDeleteId, setRuleToDeleteId] = useState<number | null>(null);

  const rules: Rule[] = [
    { id: 1, name: 'Rule 1: User Login Attempt', description: 'Triggered on failed user login attempts.' },
    { id: 2, name: 'Rule 2: High Network Traffic', description: 'Alerts on unusual patterns of network activity.' },
    { id: 3, name: 'Rule 3: File Access Violation', description: 'Identifies unauthorized access to sensitive files.' },
    { id: 4, name: 'Rule 4: Unusual Geographic Access', description: 'Flags logins from unexpected locations.' },
    { id: 5, name: 'Rule 5: Repeated Policy Violations', description: 'Tracks and flags users with multiple policy breaches.' },
    { id: 6, name: 'Rule 6: Service Downtime Alert', description: 'Notifies on critical system service failures.' },
  ];

  const handleEditRule = (rule: Rule): void => {
    console.log("Edit Rule:", rule);
  };

  const handleDeleteRule = (ruleId: number): void => {
    console.log("Deleting Rule with ID:", ruleId);
    // Delete logic goes here
  };

  return (
    <div className="rule-list-container min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Available Rules</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
        >
          Back to Dashboard
        </button>
      </div>
      {rules.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
 No rules found
 </h3>
          <p className="mt-1 text-sm text-gray-500">
 Get started by creating a new rule.
 </p>
        </div>
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rules.map((rule: Rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRule(rule);
                          setShowDetails(true);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setRuleToDeleteId(rule.id);
                          setShowDeleteConfirmModal(true);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedRule && (
        <div className={`modal-overlay ${showDetails ? 'show' : ''}`} onClick={() => setShowDetails(false)} tabIndex={-1} role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Rule Details: {selectedRule.name}</h3>
            <p className="text-gray-700 text-base">{selectedRule.description}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && ruleToDeleteId !== null && (
        <div className={`modal-overlay ${showDeleteConfirmModal ? 'show' : ''}`} onClick={() => setShowDeleteConfirmModal(false)} tabIndex={-1} role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this rule?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteRule(ruleToDeleteId);
                  setShowDeleteConfirmModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleList;
