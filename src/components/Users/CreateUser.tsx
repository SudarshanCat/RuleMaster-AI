import React, { useState } from 'react';
import { XCircle } from 'lucide-react'; // Import XCircle icon

interface CreateUserModalProps {
  onClose: () => void;
  onCreateUser: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onClose, onCreateUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    try {
      // --- IMPORTANT: This is a placeholder for your backend API call ---
      // In a real application, you would send this data to your secure backend.
      // Your backend would then use a Keycloak Admin client to create the user.
      console.log('Attempting to create user with:', { username, email, password, firstName, lastName });

      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate success or failure
      if (Math.random() > 0.2) { // 80% chance of success
        setMessage('User created successfully! (Simulated)');
        // Clear form fields on success
        setUsername('');
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setTimeout(() => {
          onCreateUser(); // Call parent's success handler
          onClose(); // Close modal on success
        }, 1000);
      } else { // 20% chance of failure
        setIsError(true);
        setMessage('Failed to create user. Please try again. (Simulated)');
      }

    } catch (error) {
      setIsError(true);
      setMessage('An error occurred. Please check console. (Simulated)');
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle className="h-8 w-8" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {message && (
            <div className={`p-3 mb-4 rounded-lg text-white ${isError ? 'bg-red-500' : 'bg-green-500'}`}>
              {message}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Creating User...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
