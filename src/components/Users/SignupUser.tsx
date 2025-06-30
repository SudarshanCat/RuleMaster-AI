import React, { useState } from 'react';
import './SignupUser.css';

// You will need to have access to the Keycloak instance here.
const SignupUser: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [workPosition, setWorkPosition] = useState('');
  const [industry, setIndustry] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // You will integrate Keycloak registration here later
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Placeholder Header - Replace with your actual header component */}
      <div className="w-full max-w-md mx-auto flex justify-between items-center mb-8">
        <div className="text-2xl font-bold text-gray-800">DecisionRules</div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Global Cloud</span>
          <select className="text-sm text-gray-600 border rounded-md p-1">
            <option>En</option>
          </select>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>

        {/* Social Login Options */}
        <div className="flex justify-center space-x-4">
          <button className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Google
          </button>
          <button className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Microsoft
          </button>
          <button className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            SSO
          </button>
        </div>

        <div className="relative flex justify-center text-sm leading-5">
          <span className="px-2 bg-white text-gray-500">OR</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="first-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="e.g. Samantha"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="e.g. Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="company" className="sr-only">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="e.g. ABC Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="work-position" className="block text-sm font-medium text-gray-700">
                  Work Position*
                </label>
                <select
                  id="work-position"
                  name="work-position"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={workPosition}
                  onChange={(e) => setWorkPosition(e.target.value)}
                >
                  <option value="">Select Position</option>
                  {/* Add more options here */}
                </select>
              </div>
              <div className="w-1/2">
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                  Industry*
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="">Select Industry</option>
                  {/* Add more options here */}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700">
                Promo Code
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="promo-code"
                  name="promo-code"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="PROMOEXAMPLE"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                {/* Placeholder Icon - Replace with your actual icon */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>

           
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              I agree with the{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Terms and Conditions
              </a>
            </label>
          </div>

          <div className="text-xs text-gray-500">
            This site protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Next
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Already a user?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupUser;
