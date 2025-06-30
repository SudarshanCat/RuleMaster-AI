import React, { useState } from 'react';
import './Tenants.css';

interface Tenant {
  id: string;
  name: string;
}

const TenantManagement: React.FC = () => {
  const [tenantName, setTenantName] = useState('');
  const [tenants, setTenants] = useState<Tenant[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTenantName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tenantName.trim()) {
      const newTenant: Tenant = {
        id: Date.now().toString(), // Simple unique ID
        name: tenantName.trim(),
      };
      setTenants([...tenants, newTenant]);
      setTenantName('');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tenants</h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3">Create New Tenant</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Tenant Name"
            value={tenantName}
            onChange={handleInputChange}
            className="flex-grow p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Create Tenant
          </button>
        </form>
      </div>

      <div className="tenant-list">
        <h3 className="text-xl font-semibold mb-3">Existing Tenants</h3>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <p className="text-gray-600">Tenant table will be displayed here.</p>
          {/* You would typically map over the 'tenants' state here to render table rows */}
          {/* Example of how you might structure it: */}
          {/*
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(tenant => (
                <tr key={tenant.id}>
                  <td>{tenant.id}</td>
                  <td>{tenant.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          */}
           {tenants.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tenant.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tenant.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantManagement;