const data = [
    { id: 1, user: "Alice", rule: "CPU Spike", triggered: "2 times" },
    { id: 2, user: "Bob", rule: "Login Failure", triggered: "1 time" },
  ];
  
  const ChatTable = () => (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4 max-w-lg">
      <h3 className="text-lg font-bold mb-4">Recent Rule Matches</h3>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Rule</th>
            <th className="px-4 py-2 border">Times Triggered</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.user}</td>
              <td className="border px-4 py-2">{row.rule}</td>
              <td className="border px-4 py-2">{row.triggered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default ChatTable;
  