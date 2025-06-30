import React, { useState, useMemo, useEffect } from 'react';
import './Groups.css'
// A simple SVG icon component for a better UI
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

interface Group {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
}

// Dummy data to showcase the component's features from the start
const DUMMY_GROUPS: Group[] = [
  { id: 1, name: 'Frontend Wizards', description: 'All things related to modern frontend development.', memberCount: 42, createdAt: '2023-04-10' },
  { id: 2, name: 'Backend Titans', description: 'Discussing databases, APIs, and server-side logic.', memberCount: 73, createdAt: '2023-03-22' },
  { id: 3, name: 'UI/UX Enthusiasts', description: 'Sharing design principles and user research.', memberCount: 120, createdAt: '2023-02-15' },
  { id: 4, name: 'DevOps & Cloud', description: 'CI/CD pipelines, Docker, Kubernetes, and cloud infrastructure.', memberCount: 55, createdAt: '2023-04-01' },
  { id: 5, name: 'Project Managers', description: 'Agile, Scrum, and Kanban methodologies.', memberCount: 15, createdAt: '2023-01-30' },
  { id: 6, name: 'QA Testers', description: 'For all the quality assurance professionals.', memberCount: 25, createdAt: '2023-04-12' },
];

const ITEMS_PER_PAGE = 10;

const Group = () => {
  const [groups, setGroups] = useState<Group[]>(DUMMY_GROUPS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [groupFormData, setGroupFormData] = useState({ name: '', description: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [newlyCreatedId, setNewlyCreatedId] = useState<number | null>(null);

  // Memoize paginated data for performance
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return groups.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [groups, currentPage]);

  const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (newlyCreatedId) {
      const timer = setTimeout(() => setNewlyCreatedId(null), 1500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [newlyCreatedId]);

  const handleOpenModal = (group: Group | null = null) => {
    if (group) {
      setEditingGroup(group);
      setGroupFormData({ name: group.name, description: group.description });
    } else {
      setEditingGroup(null);
      setGroupFormData({ name: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
    setGroupFormData({ name: '', description: '' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGroupFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupFormData.name.trim()) return;

    if (editingGroup) {
      // Update existing group
      setGroups(groups.map(g => g.id === editingGroup.id ? { ...editingGroup, ...groupFormData } : g));
    } else {
      // Create new group
      const newGroup: Group = {
        id: Date.now(),
        name: groupFormData.name.trim(),
        description: groupFormData.description.trim(),
        memberCount: 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setGroups([newGroup, ...groups]);
      setNewlyCreatedId(newGroup.id);
    }
    handleCloseModal();
  };

  const handleDeleteGroup = (id: number) => {
    if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      setGroups(groups.filter(group => group.id !== id));
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Group Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-sky-600 transition-all duration-300"
          >
            <PlusIcon />
            Add New Group
          </button>
        </div>

        {/* Groups Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {groups.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Group Name</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Description</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-center">Members</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Created At</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {paginatedGroups.map(group => (
                      <tr key={group.id} className={`hover:bg-slate-50 transition-colors duration-200 ${group.id === newlyCreatedId ? 'new-item-fade-in' : ''}`}>
                        <td className="p-4 whitespace-nowrap">
                          <div className="font-medium text-slate-900">{group.name}</div>
                        </td>
                        <td className="p-4 text-slate-500 max-w-xs truncate">{group.description || '-'}</td>
                        <td className="p-4 text-slate-500 text-center">{group.memberCount}</td>
                        <td className="p-4 text-slate-500">{group.createdAt}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => handleOpenModal(group)} className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-100 rounded-full transition-all duration-200">
                              <EditIcon />
                            </button>
                            <button onClick={() => handleDeleteGroup(group.id)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-200">
                              <DeleteIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center bg-white border-t border-slate-200">
                  <span className="text-sm text-slate-600">
                    Showing <span className="font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, groups.length)}</span> of <span className="font-semibold">{groups.length}</span> results
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-600">Page {currentPage} of {totalPages}</span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="text-center p-12">
               <div className="inline-block bg-slate-100 p-4 rounded-full mb-4">
                    <svg className="w-12 h-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
              <h3 className="text-xl font-semibold text-slate-700">No Groups Found</h3>
              <p className="text-slate-500 mt-2">Get started by creating a new group.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Group */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 modal-backdrop" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg modal-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{editingGroup ? 'Edit Group' : 'Create New Group'}</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Group Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={groupFormData.name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                      Description <span className="text-slate-400">(Optional)</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={groupFormData.description}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 flex justify-end items-center space-x-3 rounded-b-lg">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-all"
                >
                  {editingGroup ? 'Save Changes' : 'Create Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;