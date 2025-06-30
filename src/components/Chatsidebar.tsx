import React, { useEffect, useState } from "react";
import {
  useCopilotAction,
  useCopilotReadable,
  useCopilotChat,
} from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

// Custom UI components
import CustomCard from "./CustomCard";
import RuleForm from "./Form/RuleForm";
import ChatTable from "./Form/ChatTable";
import ChatChart from "./Form/ChatChart";
import RulePage from './RuleList'

// Define spreadsheet data type
interface SpreadsheetRow {
  id: number;
  name: string;
  amount: number;
}

const ChatSidebar: React.FC = () => {
  const { appendMessage } = useCopilotChat();
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetRow[]>([]);

  // Mock fetch – replace with real backend call if needed
  const fetchSpreadsheetData = async (): Promise<SpreadsheetRow[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Alice", amount: 500 },
          { id: 2, name: "Bob", amount: 300 },
          { id: 3, name: "Charlie", amount: 700 },
        ]);
      }, 1000);
    });
  };

  // Load spreadsheet data on mount
  useEffect(() => {
    fetchSpreadsheetData().then(setSpreadsheetData);
  }, []);

  // Share spreadsheet data with the assistant
  useCopilotReadable({
    description:
      "This is the latest spreadsheet data containing user names and amounts.",
    value: spreadsheetData,
  });

  // ✅ Greet User Action
  useCopilotAction({
    name: "greetUser",
    description: "Greet the user by name",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "Name of the user to greet",
        required: true,
      },
    ],
    handler: async ({ name }) => {
      alert(`👋 Hello, ${name}! Welcome to our app.`);
    },
  });

  // ✅ Custom Card Renderer
 

  // ✅ Rule Creation Form
  // useCopilotAction({
  //   name: "createRuleForm",
  //   description: "Show a form to create a new rule",
  //   parameters: [
  //     {
  //       name: "name",
  //       type: "string",
  //       description: "Rule name",
  //       required: true,
  //     },
  //     {
  //       name: "description",
  //       type: "string",
  //       description: "Rule description",
  //       required: true,
  //     },
  //   ],
  //   handler: async ({ name, description }) => {
  //     appendMessage({
  //       role: "app",
  //       contentComponent: (
  //         <RuleForm
  //           initialName={name}
  //           initialDescription={description}
  //           onSubmit={(data) => {
  //             alert(`✅ Rule submitted:\n${data.name}\n${data.description}`);
  //             // TODO: Send to backend
  //           }}
  //         />
  //       ),
  //     });
  //   },
  // });

  // // ✅ Show Chart
  // useCopilotAction({
  //   name: "showRuleChart",
  //   description: "Display a chart of rule trigger stats",
  //   handler: async () => {
  //     appendMessage({
  //       role: "app",
  //       contentComponent: <ChatChart />,
  //     });
  //   },
  // });

  // // ✅ Show Table
  // useCopilotAction({
  //   name: "showRecentTriggers",
  //   description: "Show a table of recent rule triggers",
  //   handler: async () => {
  //     appendMessage({
  //       role: "app",
  //       contentComponent: <ChatTable />,
  //     });
  //   },
  // });

  // ✅ Sidebar Render
  return (
    <CopilotSidebar
      instructions="You are a helpful assistant. Use the spreadsheet data to answer questions about users and their amounts. You can also show forms, tables, and charts when needed."
      className="w-96 border-l border-gray-200"
    />
  );
};

export default ChatSidebar;
