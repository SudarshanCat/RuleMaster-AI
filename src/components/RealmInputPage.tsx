import React, { useState } from 'react';

interface RealmInputPageProps {
  onSubmit: (realm: string) => void;
}

const RealmInputPage: React.FC<RealmInputPageProps> = ({ onSubmit }) => {
  const [realmInput, setRealmInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (realmInput.trim()) {
      setError('');
      onSubmit(realmInput);
    } else {
      setError('Please enter a realm name.');
    }
  };

  return (
    <div>
      <h1>Enter Keycloak Realm</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={realmInput}
          onChange={(e) => setRealmInput(e.target.value)}
          placeholder="Enter realm name"
        />
        <button type="submit">Verify Realm</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* You can add a place to display verification errors here */}
    </div>
  );
};

export default RealmInputPage;
