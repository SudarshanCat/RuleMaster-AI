import React, { useState, useMemo, useEffect } from 'react';
import './Users.css'
// Reusable Icons for a clean UI
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  );

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// Enriched User interface for a more realistic scenario
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Member';
  status: 'Active' | 'Inactive' | 'Pending';
}

// More realistic dummy data
const DUMMY_USERS: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Active' },
  { id: 3, firstName: 'Sam', lastName: 'Wilson', email: 'sam.wilson@example.com', role: 'Member', status: 'Inactive' },
  { id: 4, firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@example.com', role: 'Member', status: 'Active' },
  { id: 5, firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', role: 'Member', status: 'Pending' },
  { id: 6, firstName: 'Charlie', lastName: 'Davis', email: 'charlie.d@example.com', role: 'Editor', status: 'Active' },
];

const ITEMS_PER_PAGE = 5;

const Users = () => {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Member' as User['role'],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [newlyCreatedId, setNewlyCreatedId] = useState<number | null>(null);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return users.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [users, currentPage]);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (newlyCreatedId) {
      const timer = setTimeout(() => setNewlyCreatedId(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [newlyCreatedId]);

  const handleOpenModal = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);
      setUserFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setUserFormData({ firstName: '', lastName: '', email: '', role: 'Member' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.firstName.trim() || !userFormData.lastName.trim() || !userFormData.email.trim()) return;

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...userFormData } : u));
    } else {
      const newUser: User = {
        id: Date.now(),
        ...userFormData,
        status: 'Pending',
      };
      setUsers([newUser, ...users]);
      setNewlyCreatedId(newUser.id);
    }
    handleCloseModal();
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const StatusBadge = ({ status }: { status: User['status'] }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full inline-block";
    const statusClasses = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-slate-200 text-slate-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-sky-600 transition-all duration-300"
          >
            <PlusIcon />
            Add New User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {users.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">User</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {paginatedUsers.map(user => (
                      <tr key={user.id} className={`hover:bg-slate-50 transition-colors duration-200 ${user.id === newlyCreatedId ? 'new-item-fade-in' : ''}`}>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center">
                
                            <div className="ml-4">
                              <div className="font-medium text-slate-900">{user.firstName} {user.lastName}</div>
                              <div className="text-sm text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-slate-500">{user.role}</td>
                        <td className="p-4 whitespace-nowrap"><StatusBadge status={user.status} /></td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => handleOpenModal(user)} className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-100 rounded-full transition-all duration-200">
                              <EditIcon />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-200">
                              <DeleteIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center bg-white border-t border-slate-200">
                   <span className="text-sm text-slate-600">
                    Showing <span className="font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, users.length)}</span> of <span className="font-semibold">{users.length}</span> results
                  </span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Previous</button>
                    <span className="text-sm text-slate-600">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Next</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-12">
               <div className="inline-block bg-slate-100 p-4 rounded-full mb-4">
                    <svg className="w-12 h-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
                    </svg>
                </div>
              <h3 className="text-xl font-semibold text-slate-700">No Users Found</h3>
              <p className="text-slate-500 mt-2">Get started by adding a new user.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 modal-backdrop" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg modal-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingUser ? 'Edit User' : 'Create New User'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={userFormData.firstName} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={userFormData.lastName} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" id="email" name="email" value={userFormData.email} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <select id="role" name="role" value={userFormData.role} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option>Member</option>
                        <option>Editor</option>
                        <option>Admin</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 flex justify-end items-center space-x-3 rounded-b-lg">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-all">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-all">{editingUser ? 'Save Changes' : 'Create User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;