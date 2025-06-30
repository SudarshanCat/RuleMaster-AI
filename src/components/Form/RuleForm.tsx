import React, { useState } from "react";

interface RuleFormProps {
  initialName: string;
  initialDescription: string;
  onSubmit: (data: { name: string; description: string }) => void;
}

const RuleForm: React.FC<RuleFormProps> = ({ initialName, initialDescription, onSubmit }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "" || description.trim().length < 10) {
      setError("Name is required and description must be at least 10 characters.");
      return;
    }
    setError("");
    onSubmit({ name, description });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border max-w-md w-full">
      <h3 className="text-lg font-bold mb-2">Create New Rule</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rule Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit Rule
      </button>
    </div>
  );
};

export default RuleForm;
