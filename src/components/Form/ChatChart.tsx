import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const sampleData = [
  { name: "Rule A", triggers: 30 },
  { name: "Rule B", triggers: 20 },
  { name: "Rule C", triggers: 50 },
];

const ChatChart = () => (
  <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-lg">
    <h3 className="text-lg font-bold mb-4">Rule Trigger Frequency</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={sampleData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="triggers" fill="#6366F1" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ChatChart;
