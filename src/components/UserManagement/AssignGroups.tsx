import React, { useState, useMemo, useEffect } from 'react';
import './AssignGroups.css'
// Use the same consistent User and Group interfaces from other pages
interface User {
  id: number;
  firstName: string;
  lastName: string;
 
}

interface Group {
  id: number;
  name: string;
  memberCount: number;
}

// A map where the key is a userId and the value is an array of groupIds
type Assignments = Record<number, number[]>;

// --- DUMMY DATA ---
// (In a real app, this would come from your API)
const DUMMY_USERS: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe'},
  { id: 2, firstName: 'Jane', lastName: 'Smith'},
  { id: 3, firstName: 'Sam', lastName: 'Wilson' },
  { id: 4, firstName: 'Alice', lastName: 'Johnson' },
];

const DUMMY_GROUPS: Group[] = [
  { id: 101, name: 'Frontend Wizards', memberCount: 42 },
  { id: 102, name: 'Backend Titans', memberCount: 73 },
  { id: 103, name: 'UI/UX Enthusiasts', memberCount: 120 },
  { id: 104, name: 'DevOps & Cloud', memberCount: 55 },
];

const DUMMY_ASSIGNMENTS: Assignments = {
  1: [101, 104], // John Doe is in Frontend and DevOps
  2: [101, 103], // Jane Smith is in Frontend and UI/UX
};
// --- END DUMMY DATA ---

const AssignGroups = () => {
  // We don't need to store users/groups in state if they are static props or from a store
  const users = DUMMY_USERS;
  const groups = DUMMY_GROUPS;

  const [assignments, setAssignments] = useState<Assignments>(DUMMY_ASSIGNMENTS);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [groupToAssignId, setGroupToAssignId] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const selectedUser = useMemo(() => {
    return users.find(u => u.id === selectedUserId);
  }, [selectedUserId, users]);

  const assignedGroupIds = useMemo(() => {
    return selectedUserId ? assignments[selectedUserId] || [] : [];
  }, [selectedUserId, assignments]);

  const assignedGroups = useMemo(() => {
    return groups.filter(g => assignedGroupIds.includes(g.id));
  }, [assignedGroupIds, groups]);

  const availableGroups = useMemo(() => {
    return groups.filter(g => !assignedGroupIds.includes(g.id));
  }, [assignedGroupIds, groups]);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setGroupToAssignId(''); // Reset dropdown when user changes
  };

  const handleAssignGroup = () => {
    if (!selectedUserId || !groupToAssignId) return;

    const newAssignments = { ...assignments };
    const userAssignments = newAssignments[selectedUserId] || [];
    newAssignments[selectedUserId] = [...userAssignments, parseInt(groupToAssignId)];

    setAssignments(newAssignments);
    setNotification(`Assigned group to ${selectedUser?.firstName}.`);
    setGroupToAssignId('');
  };

  const handleUnassignGroup = (groupId: number) => {
    if (!selectedUserId) return;

    const newAssignments = { ...assignments };
    newAssignments[selectedUserId] = (newAssignments[selectedUserId] || []).filter(id => id !== groupId);

    setAssignments(newAssignments);
    setNotification(`Removed group from ${selectedUser?.firstName}.`);
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Assign User to Groups</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel: User List */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-lg font-semibold text-slate-700 p-2 mb-2">Select a User</h2>
            <ul className="space-y-1">
              {users.map(user => (
                <li key={user.id}>
                  <button
                    onClick={() => handleUserSelect(user.id)}
                    className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                      selectedUserId === user.id
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    
                    <span>{user.firstName} {user.lastName}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel: Assignment Details */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {selectedUser ? (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  Managing: <span className="text-sky-600">{selectedUser.firstName} {selectedUser.lastName}</span>
                </h2>
                <p className="text-slate-500 mb-6">Add or remove groups for this user.</p>

                {/* Assigned Groups Section */}
                <div className="mb-8">
                    <h3 className="text-md font-semibold text-slate-600 uppercase tracking-wider mb-3">Assigned Groups</h3>
                    <div className="flex flex-wrap gap-2">
                        {assignedGroups.length > 0 ? (
                            assignedGroups.map(group => (
                                <span key={group.id} className="flex items-center bg-sky-100 text-sky-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                                    {group.name}
                                    <button onClick={() => handleUnassignGroup(group.id)} className="ml-2 p-0.5 rounded-full hover:bg-sky-200 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </button>
                                </span>
                            ))
                        ) : (
                            <p className="text-slate-500 italic">This user is not in any groups.</p>
                        )}
                    </div>
                </div>

                {/* Add to Group Section */}
                <div>
                    <h3 className="text-md font-semibold text-slate-600 uppercase tracking-wider mb-3">Add to a New Group</h3>
                    {availableGroups.length > 0 ? (
                        <div className="flex items-center gap-3">
                            <select
                                value={groupToAssignId}
                                onChange={e => setGroupToAssignId(e.target.value)}
                                className="flex-grow w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                <option value="" disabled>-- Select a group to add --</option>
                                {availableGroups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                                ))}
                            </select>
                            <button
                                onClick={handleAssignGroup}
                                disabled={!groupToAssignId}
                                className="px-5 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                            >
                                Assign
                            </button>
                        </div>
                    ) : (
                         <p className="text-slate-500 italic">This user is already in all available groups.</p>
                    )}
                </div>
              </div>
            ) : (
              // Empty state when no user is selected
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <div className="inline-block bg-slate-100 p-5 rounded-full mb-4">
                    <svg className="w-16 h-16 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-700">Select a User</h3>
                <p className="text-slate-500 mt-1">Choose a user from the list on the left to manage their group assignments.</p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
            <div className="fixed bottom-5 right-5 bg-slate-800 text-white py-2 px-5 rounded-lg shadow-xl animate-pulse">
                {notification}
            </div>
        )}
      </div>
    </div>
  );
};

export default AssignGroups;